/**
 * Created by Ulife on 2016/1/15.
 */
/**
 * Created by Zhangke on 2015/12/15.
 */

define([
        'ulife.cms.module.myApp',
        'ulife.framework.services',
        'ulife.cms.business.config',
        'ulife.cms.menu.config',

        'ulife.api.channel.cms.allChannelConfig',
        'ulife.api.channel.cms.childChannel',
        'ulife.api.channel.cms.allType',
        'ulife.api.channel.cms.updateChannelConfig',
        'ulife.api.channel.cms.parentChannel',
        'ulife.api.common.omChannel',
        'ulife.api.role.dept.list',
        'ulife.api.channel.cms.insertChannelConfig',
        "ulife.cms.service.authority"
    ],
    function(app, services, BizConfig, MenuConfig, channelCmsAllChannelConfigService,channelCmsAllTypeService,channelCmsUpdateChannelConfigService,channelCmsParentChannelService,channelCmsChildChannelService,commonOmChannelService,roleDeptListService,channelCmsInsertChannelConfigService) {

        channelCmsAllChannelConfigService.injectTo(app);
        channelCmsAllTypeService.injectTo(app);
        channelCmsUpdateChannelConfigService.injectTo(app);
        channelCmsParentChannelService.injectTo(app);
        channelCmsChildChannelService.injectTo(app);
        commonOmChannelService.injectTo(app);
        roleDeptListService.injectTo(app);
        channelCmsInsertChannelConfigService.injectTo(app);


        app.controller('ChannelOMListCtrl', ['$scope', '$location', '$route',
            'channelCmsAllChannelConfigService','channelCmsAllTypeService','channelCmsUpdateChannelConfigService','channelCmsParentChannelService','channelCmsChildChannelService','commonOmChannelService','roleDeptListService','channelCmsInsertChannelConfigService',
            'authorityService',

        function($scope, $location, $route, channelCmsAllChannelConfigService,channelCmsAllTypeService,channelCmsUpdateChannelConfigService,channelCmsParentChannelService,channelCmsChildChannelService,commonOmChannelService,roleDeptListService,channelCmsInsertChannelConfigService) {

            $scope.menuConfig = MenuConfig.menu;

            $scope.renderObj = {};

            $scope.parentChannels = {};
            $scope.parentChannelSelected = {};
            $scope.getParentChannel = function() {
                $.when(channelCmsParentChannelService.sendRequest())
                    .done(function(result) {
                        $scope.parentChannels = result.value;
                        $scope.$apply();
                    })
                    .fail(function() {
                    })
            };
            $scope.getParentChannel();

            $scope.childChannels = {};
            $scope.childChannelSelected = {};
            $scope.getChildChannel = function() {
                    var parentChannelSelected = $scope.parentChannelSelected;
                    if(parentChannelSelected != null) {
                        var parentChannelId = parentChannelSelected.id;
                        $.when(channelCmsChildChannelService.sendRequest({'parentId':parentChannelId}))
                            .done(function(result) {
                                $scope.childChannels = result.value;
                                $scope.childChannelSelected = {};
                                $scope.$apply();
                            })
                            .fail(function() {
                            })
                    } else {
                        $scope.childChannels = {};
                        $scope.childChannelSelected = {};
                    }
                };
            $scope.omChannels = {};
            $scope.omChannelSelected = {};
            $scope.getOmChannel = function() {
                $.when(commonOmChannelService.sendRequest())
                    .done(function(result) {
                        $scope.omChannels = result.value;
                        $scope.$apply();
                    })
                    .fail(function() {
                    })
            };
            $scope.getOmChannel();

            $scope.deptObj = {};
            $scope.getDept = function(){
                $.when(roleDeptListService.sendRequest())
                    .done(function(result) {
                        var deptArr = [];
                        var departments  = result.value;
                        _.each(departments,function(first){
                            if(first.second.length == 0) {
                                deptArr.push(first);
                            } else {
                                _.each(first.second,function(second){
                                    if(second.second.length == 0) {
                                        deptArr.push(second);
                                    } else {
                                        _.each(second.second,function(third){
                                            deptArr.push(third);
                                        })
                                    }
                                })
                            }
                        });
                        $scope.deptObj = deptArr;
                        $scope.$apply();
                    })
                    .fail(function() {
                    })
            }
            $scope.getDept();

            $scope.searchPage = {
                "pageSize": 20,  //页大小
                "pageNum": 1,   //当前页码
                "pageTotal": 1,  //页面数量
                "params": {
                    "pageSize": 20,
                    "pageNum": 1,
                    "parentId":'',
                    'childId':'',
                    'deliverType':'',
                    'terminal':'',
                    'om':''
                },
                "search": function() {
                    this.params.pageSize = this.pageSize;
                    this.params.pageNum = 1;
                    this.params.parentId = "";
                    this.params.childId = "";
                    this.params.deliverType = "";
                    this.params.terminal = "";
                    var parentChannelSelected  = $scope.parentChannelSelected;
                    if(parentChannelSelected != null) {
                        this.params.parentId = parentChannelSelected.id;
                    }
                    var childChannelSelected = $scope.childChannelSelected;
                    if(childChannelSelected != null) {
                        this.params.childId = childChannelSelected.id;
                    }
                    var deliverSelected = $scope.deliverSearchSelected;
                    if(deliverSelected != null) {
                        this.params.deliverType = deliverSelected.index;
                    }
                    var terminalSelected = $scope.terminalSearchSelected;
                    if(terminalSelected != null) {
                        if(this.params.parentId == 1) {
                            this.params.terminal = terminalSelected.index;
                        } else {
                            this.params.terminal = "";
                        }
                    }
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

            $scope.deliverType = {};
            $scope.terminalType = {};
            $scope.deliverSearchSelected = {};
            $scope.terminalSearchSelected = {};
            $scope.getAllType = function() {
                    $.when(channelCmsAllTypeService.sendRequest())
                        .done(function(result) {
                            $scope.deliverType = result.deliverVoList;
                            $scope.terminalType = result.terminalVoList;
                            $scope.$apply();
                        })
                        .fail(function() {
                        })
            }
            $scope.getAllType();

            $scope.addChannelPageModal = {
                'parentChannelSelected': '',
                'childChannels': '',
                'childChannelSelected': '',
                'terminalSelected':'',
                'deliverSelected':'',
                'deptSelected':'',
                "modal": $("#addChannelPageModal"),
                'open': function () {
                    this.modal.modal({});
                    $scope.addChannelPageModal.parentChannelSelected='';
                    $scope.addChannelPageModal.childChannels= '';
                    $scope.addChannelPageModal.childChannelSelected='';
                    $scope.addChannelPageModal.terminalSelected='';
                    $scope.addChannelPageModal.deliverSelected='';
                    $scope.addChannelPageModal.deptSelected='';
                },
                'getChildChannel': function () {
                    var parentChannelSelected = this.parentChannelSelected;
                    if (parentChannelSelected != null) {
                        var parentChannelId = parentChannelSelected.id;
                        $.when(channelCmsChildChannelService.sendRequest({'parentId': parentChannelId}))
                            .done(function (result) {
                                $scope.addChannelPageModal.childChannels = result.value;
                                $scope.addChannelPageModal.childChannelSelected = {};
                                $scope.$apply();
                            })
                            .fail(function () {
                            })
                    } else {
                        $scope.addChannelPageModal.childChannels = {};
                        $scope.addChannelPageModal.childChannelSelected = {};
                    }
                },
                'save' : function() {
                    var parentChannelId = "";
                    if(this.parentChannelSelected != null && this.parentChannelSelected != "") {
                        parentChannelId = this.parentChannelSelected.id;
                    }
                    var childChannelId = "";
                    if(this.childChannelSelected != null && this.childChannelSelected != "") {
                        childChannelId = this.childChannelSelected.id;
                    }
                    var terminal = "";
                    if(this.terminalSelected != null && this.terminalSelected != "") {
                        if(parentChannelId == '1') {
                            terminal = "{\"" + this.terminalSelected.index + "\":\"" + this.terminalSelected.label + "\"}";
                        }
                    }
                    var deliverType = "";
                    if(this.deliverSelected != null && this.deliverSelected != "") {
                        deliverType = "[{\"" + this.deliverSelected.index + "\":\"" + this.deliverSelected.label + "\"}]";
                    }
                    var dept = "";
                    if(this.deptSelected != null && this.deptSelected != "") {
                        dept = "[{\"" + this.deptSelected.id + "\":\"" + this.deptSelected.name + "\"}]";
                    }

                    $.when(channelCmsInsertChannelConfigService.sendRequest({
                        'parentChannelId' : parentChannelId,
                        'childChannelId' : childChannelId,
                        'terminal' : terminal,
                        'deliverType' : deliverType,
                        'dept':dept
                    }))
                        .done(function(result) {
                            if(result.value) {
                                $("#addChannelPageModal").modal('hide');
                                $scope.searchPage.search();
                            }
                        })
                        .fail(function(code,message) {
                            alert("code:" + code + ",msg:" + message);
                        })

                }
            };


            $scope.addChannelOmModal = {
                "combination":"",
                "params":{
                    "id":'',
                    'om':'',
                    'remarks':'',
                },
                "modal": $("#addChannelOmModal"),
                "open": function (channelOm) {
                    this.modal.modal({});
                    this.params.id = channelOm.id;
                    $scope.omChannelSelected = "";
                    if(channelOm.terminalString != undefined && channelOm.terminalString != null && channelOm.terminalString != "") {
                        this.combination = channelOm.parentName + "-" + channelOm.childName + "-" + channelOm.terminalString + "-" +  channelOm.deptString + "-" + channelOm.deliverString;
                    } else {
                        this.combination = channelOm.parentName + "-" + channelOm.childName + "-" + channelOm.deptString + "-" + channelOm.deliverString;
                    }
                    this.params.om = channelOm.omName;
                    this.params.remarks = channelOm.remarks;
                },
                'change': function() {
                    var omChannelSelected = $scope.omChannelSelected;
                    if(omChannelSelected != null) {
                        this.params.om = omChannelSelected.name;
                    }
                },

                "save": function() {
                    var tmpParams = {};
                    _.each(this.params, function(value, key) {
                            tmpParams[key] = value;
                    });

                    $.when(channelCmsUpdateChannelConfigService.sendRequest(tmpParams))
                        .done(function(result) {
                            if(result.value) {
                                _.each($scope.renderObj, function (item) {
                                    if (item.id == $scope.addChannelOmModal.params.id) {
                                        item.remarks =  $scope.addChannelOmModal.params.remarks;
                                        item.omName = $scope.addChannelOmModal.params.om;
                                    }
                                });
                                $scope.$apply();
                                $("#addChannelOmModal").modal('hide');
                                $scope.addChannelOmModal.params.id = '';
                                $scope.addChannelOmModal.params.om = '';
                                $scope.addChannelOmModal.params.remarks = '';
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

