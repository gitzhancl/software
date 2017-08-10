/**
 * Created by xuxl on 2016/7/14.
 */

define([
        'ulife.cms.module.myApp',
        'ulife.framework.services',
        'ulife.cms.business.config',
        'ulife.cms.menu.config',

        'ulife.api.channel.cms.allChannelConfig',
        'ulife.api.common.paymentMeth',
        'ulife.api.channel.cms.allType',
        'ulife.api.channel.cms.updateChannelConfig',
        "ulife.cms.service.authority"
    ],


function(app, services, BizConfig, MenuConfig, channelCmsAllChannelConfigService,commonPaymentMethService,channelCmsAllTypeService,channelCmsUpdateChannelConfigService) {

        channelCmsAllChannelConfigService.injectTo(app);
        commonPaymentMethService.injectTo(app);
        channelCmsAllTypeService.injectTo(app);
        channelCmsUpdateChannelConfigService.injectTo(app);


        app.controller('ChannelListCtrl', ['$scope', '$location', '$route',
            'channelCmsAllChannelConfigService','commonPaymentMethService','channelCmsAllTypeService','channelCmsUpdateChannelConfigService',
            'authorityService',

        function($scope, $location, $route, channelCmsAllChannelConfigService,commonPaymentMethService,channelCmsAllTypeService,channelCmsUpdateChannelConfigService) {

            $scope.menuConfig = MenuConfig.menu;

            $scope.renderObj = {};

            $scope.searchPage = {
                "pageSize": 20,  //页大小
                "pageNum": 1,   //当前页码
                "pageTotal": 1,  //页面数量
                "params": {
                    "pageSize": 20,
                    "pageNum": 1,
                },
                "search": function() {
                    this.params.pageSize = this.pageSize;
                    this.params.pageNum = this.pageNum;
                    this.getData();
                },
                "getData": function() {
                    var tmpParams = {};
                    _.each(this.params, function(value, key, list) {
                        if(!!value) {
                            tmpParams[key] = value;
                        }
                    });
                    var that = this;
                    //获取页面列表
                    $.when(channelCmsAllChannelConfigService.sendRequest(tmpParams))
                        .done(function(result) {
                            $scope.renderObj = result.content;
                            that.pageTotal = Math.ceil(result.total / that.pageSize);
                            $scope.$apply();
                        })
                        .fail(function() {
                        })
                },
                "goto": function(pageNum) {
                    this.pageNum = pageNum;
                    this.getData();
                },
                "pre": function() {
                    if (this.pageNum != 1) {
                        this.params.pageNum--;
                        this.pageNum = this.params.pageNum;
                        this.getData();
                    }
                },
                "next": function() {
                    if (this.pageNum != this.pageTotal) {
                        this.params.pageNum++;
                        this.pageNum = this.params.pageNum;
                        this.getData();
                    }
                }
            }
            $scope.searchPage.search();

            $scope.payType = {};
            $scope.getPayType = function(){
                $.when(commonPaymentMethService.sendRequest())
                    .done(function(result) {
                        console.log(result);
                        $scope.payType = result.value;
                        _.each($scope.payType,function(pay) {
                            if(pay.childPayment != undefined && pay.childPayment != null && pay.childPayment.length > 0) {
                                pay.hasChildPay = true;
                            } else {
                                pay.hasChildPay = false;
                            }}
                        )
                        $scope.$apply();
                    })
                    .fail(function() {
                    })
            }
            $scope.getPayType();
            
            $scope.orderType = {};
            $scope.getAllType = function(){
                $.when(channelCmsAllTypeService.sendRequest())
                    .done(function(result) {
                        $scope.orderType = result.orderVoList;
                        $scope.$apply();
                    })
                    .fail(function() {
                    })
            }
            $scope.getAllType();

            $scope.addChannelModal = {
                'isEdit':'',
                "params":{
                    "id":'',
                    'order':'',
                    'pay':'',
                },
                "modal": $("#addChannelModal"),
                "open": function (channel,isEdit) {
                    this.modal.modal({});
                    this.params.id = channel.id;
                    this.isEdit = isEdit;
                    if(!isEdit) {
                        $('input[type="checkbox"]').attr("disabled",true);
                    } else {
                        $('input[type="checkbox"]').attr("disabled",false);
                    }

                    //对支付方式的解析
                    if(channel.payConfig == undefined || channel.payConfig == null || channel.payConfig == "") {
                        _.each($scope.payType, function(parent) {
                            parent.isChecked = false;
                            if (parent.hasChildPay) {
                                _.each(parent.childPayment, function (child) {
                                    child.isChecked = false;
                                });
                            }
                        });
                    } else {
                        _.each($scope.payType, function(parent) {
                            parent.isChecked = false;
                            if (parent.hasChildPay) {
                                _.each(parent.childPayment, function (child) {
                                    child.isChecked = false;
                                });
                            }
                        });
                        var payment = JSON.parse(channel.payConfig);
                        _.each(payment, function (selectItem) {
                            _.each($scope.payType, function (item) {
                                if(item.hasChildPay) {
                                    _.each(item.childPayment, function (childItem) {
                                        if(childItem.code == selectItem.code) {
                                            childItem.isChecked = true;
                                        }
                                    })
                                } else {
                                    if(item.code == selectItem.code) {
                                        item.isChecked = true;
                                    }
                                }
                            });
                        });
                    }

                    //对订单方式的解析
                    if(channel.orderTypeList == undefined || channel.orderTypeList == null || channel.orderTypeList == "") {
                        _.each($scope.orderType, function(dValue) {
                            dValue.isChecked = false;
                        });
                    } else {
                        _.each($scope.orderType, function(dValue) {
                            dValue.isChecked = false;
                        });
                        _.each(channel.orderTypeList, function (value) {
                            _.each($scope.orderType, function(dValue) {
                                if (value == dValue.index) {
                                    dValue.isChecked = true;
                                }
                            })
                        });
                    }
                },

                "save": function() {
                    //订单方式：eg [{"3":"电商业务板块"}]
                    var order = "";
                    _.each($scope.orderType, function(dValue) {
                        if (dValue.isChecked ) {
                            order += "{\"" + dValue.index + "\":\"" + dValue.label + "\"},";
                        }
                    });
                    if(order != "") {
                        order = order.substring(0,order.length - 1);
                        order = "[" + order + "]";
                        this.params.order = order;
                    }
                    //支付方式 eg：[{"paymentType":"ONLINE_PAY","channelNo":"10"},{"paymentType":"ONLINE_PAY","channelNo":"15"},{"paymentType":"ONLINE_PAY","channelNo":"16"},{"paymentType":"ONLINE_PAY","channelNo":"17"}]
                    var configContext = "";
                    _.each($scope.payType, function (item) {
                        if (item.isChecked != undefined && item.isChecked) {
                            configContext += "{\"code\":\"" + item.code + "\"},";
                        }
                        _.each(item.childPayment, function (child) {
                            if (child.isChecked != undefined && child.isChecked) {
                                configContext += "{\"code\":\"" + child.code + "\"},";
                            }
                        });
                    });
                    if (configContext != "") {
                        configContext = configContext.substring(0, configContext.length - 1);
                        configContext = "[" + configContext + "]";
                        this.params.pay = configContext;
                    }

                    var tmpParams = {};
                    _.each(this.params, function(value, key, list) {
                            tmpParams[key] = value;
                    });

                    $.when(channelCmsUpdateChannelConfigService.sendRequest(tmpParams))
                        .done(function(result) {
                            console.log(result);
                            if(result.value) {
                                _.each($scope.renderObj, function (item) {
                                    if (item.id == $scope.addChannelModal.params.id) {
                                        item.payConfig =  $scope.addChannelModal.params.pay;
                                        item.orderTypeList =  $scope.addChannelModal.params.order;
                                    }
                                });
                                $scope.$apply();
                                $("#addChannelModal").modal('hide');
                                $scope.addChannelModal.params.id = '';
                                $scope.addChannelModal.params.order = '';
                                $scope.addChannelModal.params.pay = '';
                            } 
                        })
                        .fail(function(code,message) {
                            alert("code:" + code + ",msg:" + message);
                        })
                }
            }
        }
        ]);

    });

