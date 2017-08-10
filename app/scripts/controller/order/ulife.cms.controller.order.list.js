/**
 * Created by Ulife on 2016/1/22.
 * @author zhangke
 * @date 2016-03-06（星期日 - -！）
 */

define([
        'ulife.cms.module.myApp',
        'ulife.framework.services',
        'ulife.cms.business.config',
        'ulife.cms.menu.config',

        'ulife.api.order.cms.list',
        'ulife.api.common.paymentMeth',

        'ulife.cms.directive.datepicker',
        'ulife.cms.directive.datetimepicker',
        'ulife.cms.directive.tooltip',
        'ulife.cms.directive.dateformat',
        "ulife.cms.service.authority"

    ],
    function (app, services, BizConfig, MenuConfig, orderMemtList,commonPaymentMeth) {

        orderMemtList.injectTo(app);
        commonPaymentMeth.injectTo(app);

        app.filter('orderStatusValue', function () {
            return function (val) {
                switch (val) {
                    case 1:
                        return '已创建';
                    case 2:
                        return '已确认';
                    case 3:
                        return '已拆单';
                    case 4:
                        return '已同步到OM';
                    case 5:
                        return '配送中';
                    case 6:
                        return '客户拒收';
                    case 7:
                        return '已取消';
                    case 8:
                        return '部分取消';
                    case 9:
                        return '已挂起';
                    case 10:
                        return '已完成';
                    case 11:
                        return '待处理';
                }
            }
        });

        app.filter('groupStatus', function () {
            return function (val) {
                switch (val) {
                    case -1:
                        return '团数据删除';
                    case 0:
                        return '正常';
                    case 1:
                        return '团购成功';
                    case 2:
                        return '超时关团';
                    case 3:
                        return '活动结束';
                    default:
                        return '未知状态';
                }
            }
        });
        app.filter('orderPayStatus', function () {
            return function (val) {
                if (val == 1) {
                    return '等待支付';
                } else if (val == 2) {
                    return '部分支付';
                } else if (val == 3) {
                    return '已支付';
                }
            }
        });
        app.controller('OrderListCtrl', ['$scope', '$location', '$route',
            'orderCmsListService','commonPaymentMethService', 'authorityService',

            function ($scope, $location, $route, orderCmsListService,commonPaymentMethService) {

                $scope.menuConfig = MenuConfig.menu;

                //$scope.gotoPageEdit = function(index) {
                //    $location.path('page/edit/' + index);
                //}
                $scope.renderObj = {};

                //$scope.groupType = [
                //    {'key': '不限', 'value': ''},
                //    {'key': '常规团', 'value': '1'},
                //    {'key': '新人团', 'value': '2'},
                //    {'key': '预售团', 'value': '3'}
                //];
                //
                //
                //$scope.groupStatus = [
                //    {'key': '不限', 'value': '8888'},
                //    {'key': '进行中', 'value': '0'},
                //    {'key': '已结束', 'value': '1'},
                //    {'key': '未开始', 'value': '-1'},
                //    {'key': '售罄', 'value': '2'}
                //];

                //$scope.addPage = {
                //    "save": function() {
                //        this.modal.modal('hide');
                //
                //        this.addPage();
                //        this.page = this.oriPage;
                //    },
                //    addPage: function() {
                //        $.when(cmsPageAddService.sendRequest(this.page))
                //            .done(function(result) {
                //                $location.path('page/edit/' + result.pageId);
                //                $scope.$apply();
                //            })
                //            .fail(function() {
                //            })
                //    }
                //}

                $scope.statusSelect = [

                    {'key': 1, 'value': '已创建'},
                    {'key': 2, 'value': '已确认'},
                    {'key': 3, 'value': '已拆单'},
                    {'key': 4, 'value': '已同步到OM'},
                    {'key': 5, 'value': '配送中'},
                    {'key': 6, 'value': '客户拒收'},
                    {'key': 7, 'value': '已取消'},
                    {'key': 8, 'value': '部分取消'},
                    {'key': 9, 'value': '已挂起'},
                    {'key': 10, 'value': '已完成'},
                    {'key': 11, 'value': '待处理'}
                ];
                $scope.payStatus = [

                    {'key': 1, 'value': '待支付'},
                    {'key': 2, 'value': '部分支付'},
                    {'key': 3, 'value': '已支付'}
                ];

                $scope.categories = [
                    {'key': '普通订单', 'value': '普通订单'},
                    {'key': '团购订单', 'value': '团购订单'},
                    {'key': '市场部拉新订单', 'value': '市场部拉新订单'},
                    {'key': '虚拟商品订单', 'value': '虚拟商品订单'},
                    {'key': '兑换订单', 'value': '兑换订单'}
                ];

                $scope.payChannels = [];

                $scope.applyStores = '';
                $.when(commonPaymentMethService.sendRequest())
                    .done(function (result) {
                        $scope.applyStores = result.value;

                        for (var i = 0; $scope.applyStores.length > i; i++){
                            if($scope.applyStores[i].childPayment) {
                                for(var j=0;j < $scope.applyStores[i].childPayment.length;j++)

                                    $scope.payChannels.push($scope.applyStores[i].childPayment[j]);
                                //  payChannels_map[$scope.applyStores[i].childPayment[j].code] = $scope.applyStores[i].childPayment[j].name;
                            } else {
                                $scope.payChannels.push($scope.applyStores[i]);
                            }
                        }

                        //payChannels_map[$scope.applyStores[i].code] = $scope.applyStores[i].jointName;
                    })


                $scope.statusValue = "";

                $scope.searchPage = {
                    "pageSize": 10,  //页大小
                    "pageNum": 1,   //当前页码
                    "pageTotal": 1,  //页面数量
                    "pageCount": 1, //数据个数
                    "pageShow": [],
                    "params": {
                        "start_date": new Date().setDate(new Date().getDate() - 7),
                        "end_date": new Date().getTime(),
                        "sale_no": null,
                        "ship_no": null,
                        "consignee_name": null,
                        "consignee_mobile_no": null,
                        "login_name": null,
                        "page_index": null,
                        "pay_status": null,
                        "pay_channel": null,
                        "category": null,
                        "isGroup": 0
                    },
                    "search": function () {
                        this.params.page = 1;
                        this.pageNum = 1;
                        this.params.rows = this.pageSize;
                        this.getData();
                    },
                    "getData": function () {
                        var statusVal = $scope.statusValue;
                        if (statusVal != null && statusVal != "") {
                            var key = statusVal.key;
                            if (key != undefined) {
                                $scope.searchPage.params.status = key;
                            }
                        }

                        var tmpParams = {};
                        _.each(this.params, function (value, key, list) {
                            if (!!value) {
                                tmpParams[key] = value;
                            }
                        });
                        tmpParams.size = this.pageSize;
                        tmpParams.from = (this.pageNum - 1) * this.pageSize;

                        var that = this;
                        //获取页面列表

                        $.when(orderCmsListService.sendRequest(tmpParams))
                            .done(function (result) {
                                //debugger
                                $scope.renderObj = result;
                                //$scope.renderObj.groupId
                              /*  _.each($scope.renderObj.orders, function(value, key, list) {
                                    if(!!value&&value.groupId!=0) {
                                        $.when(groupInfoService.sendRequest({"id":value.groupId}))
                                        .done(function(res) {
                                            value.isGroup=res.status;
                                            $scope.$apply();
                                        })
                                    }else {
                                        value.isGroup=4;
                                    }
                                });*/
                                $scope.searchPage.params.status = null;
                                //处理分页信息
                                that.pageCount = result.count;
                                that.pageTotal = Math.ceil(result.count / that.pageSize);

                                $scope.$apply();
                            })
                            .fail(function () {
                            })
                    },
                    "goto": function (pageNum) {
                        this.pageNum = pageNum;
                        if (!!pageNum && _.isNumber(pageNum) && pageNum > 0) {
                            this.params.from = this.pageSize * (pageNum - 1);
                        }
                        this.getData()

                    },
                    "pre": function () {
                        if (this.pageNum == 1) {
                            this.params.page = this.pageTotal;
                        } else {
                            this.params.page--;
                        }
                        this.pageNum = this.params.page;
                        this.getData();
                    },
                    "next": function () {
                        if (this.pageNum == this.pageTotal) {
                            this.params.page = 1;
                        } else {
                            this.params.page++;
                        }
                        this.pageNum = this.params.page;
                        this.getData();
                    },

                    //"modal": $("#addMJModal"),
                    //"open": function (activityId) {
                    //    this.modal.modal({});
                    //    $.when(groupActivityGroupCountService.sendRequest({"activityId": activityId}))
                    //        .done(function (result) {
                    //            $scope.groupCount = result;
                    //            $scope.$apply();
                    //        })
                    //        .fail(function (code, msg) {
                    //            alert(msg);
                    //        })
                    //
                    //}
                }

                $scope.searchPage.search();


            }
        ]);

    });