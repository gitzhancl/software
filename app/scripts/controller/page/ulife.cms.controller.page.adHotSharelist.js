/**
 * @author zhanchanglei
 * @date 2016-05-09
 */

define([
        'ulife.cms.module.myApp',
        'ulife.framework.services',
        'ulife.cms.business.config',
        'ulife.cms.menu.config',

        'ulife.api.hot.share.list1',
        'ulife.api.hot.share.addoredit',
        'ulife.api.hot.share.get',
    'ulife.api.hot.share.delete',
        'ulife.api.promotion.activity.get',

        'ulife.cms.directive.datepicker',
        'ulife.cms.directive.tooltip',
        'ulife.cms.directive.dateformat',
        "ulife.cms.service.authority",
        "ulife.cms.service.valid"

    ],
    function (app, services, BizConfig, MenuConfig, hotShareList1, hotShareAddoredit, hotShareGet,hotShareDelete,activityGet) {

        hotShareList1.injectTo(app);
        hotShareAddoredit.injectTo(app);
        hotShareGet.injectTo(app);
        hotShareDelete.injectTo(app);
        activityGet.injectTo(app);


        app.filter('terminal', function () {//1表示Web  2表示H5  4表示APP，多个终端对应值进行位或运算值
            return function (val) {
                switch (val) {
                    case 2 :
                        return 'H5';
                    case 4 :
                        return 'APP';
                    case 6 :
                        return 'H5、APP';
                }
            }
        });
        app.controller('hotShareList', ['$scope', '$location', '$route',
            'hotShareList1Service',
            'authorityService', 'hotShareAddoreditService', 'hotShareGetService', 'validService','hotShareDeleteService','promotionActivityGetService',

            function ($scope, $location, $route, hotShareList1Service, authorityService, hotShareAddoreditService, hotShareGetService,
                      validService,hotShareDeleteService,promotionActivityGetService) {

                $scope.terminal = [//1表示Web  2表示H5  4表示APP，多个终端对应值进行位或运算值
                    {'key': '全部终端', 'value': 0},
                    {'key': 'H5', 'value': 2},
                    {'key': 'APP', 'value': 4}
                ];
                $scope.menuConfig = MenuConfig.menu;
//默认选择APP、h5
                $scope.terminals = {
                    "app": true,
                    "h5": true
                };
                $scope.saveParams = {
                    "id": 0,
                    "adsName": '',
                    "activityId": null,
                    "imagesUrl": null,
                    "validTimeStart": moment().format("x"),
                    "validTimeEnd": moment().add(7, 'days').format("x"),
                    "createTime": moment().format("x"),
                    "terminal": null,
                    "sort": null,
                    "isDelete": 0

                };
                $scope.addSaveParams = {
                    "id": 0,
                    "adsName": '',
                    "activityId": null,
                    "imagesUrl": null,
                    "validTimeStart": moment().format("x"),
                    "validTimeEnd": moment().add(7, 'days').format("x"),
                    "createTime": moment().format("x"),
                    "terminal": null,
                    "sort": null,
                    "isDelete": 0

                };
                function getHotShare(id) {
                    $scope.saveParams.id = id;
                    if ($scope.saveParams.id > 0) {
                        //单个查询
                        $.when(hotShareGetService.sendRequest({"id": $scope.saveParams.id}))
                            .done(function (result) {
                                $scope.saveParams = result;
                                $scope.terminals.h5 = ((result.terminal & 2) > 0);
                                $scope.terminals.app = ((result.terminal & 4) > 0);
                                $scope.$apply();
                            })
                            .fail(function (code, msg) {
                                alert(msg);
                            })
                    }
                }

                function getHotShare1(id) {
                    $scope.addSaveParams.id = id;
                    if ($scope.addSaveParams.id > 0) {
                        //单个查询
                        $.when(hotShareGetService.sendRequest({"id": $scope.addSaveParams.id}))
                            .done(function (result) {
                                $scope.addSaveParams = result;
                                $scope.terminals.h5 = ((result.terminal & 2) > 0);
                                $scope.terminals.app = ((result.terminal & 4) > 0);
                                $scope.$apply();
                            })
                            .fail(function (code, msg) {
                                alert(msg);
                            })
                    }
                }

                $scope.searchPage = {
                    "pageSize": 15,  //页大小
                    "pageNum": 1,   //当前页码
                    "pageTotal": 1,  //页面数量
                    "pageCount": 1, //数据个数
                    //"pageShow": [],
                    "params": {
                        "terminal": 0,
                        "activityId": null,
                        "page": 1,
                        "rows": 15
                    },
                    "search": function () {
                        this.params.page = 1;
                        this.params.rows = this.pageSize;
                        this.getData();
                    },
                    "getData": function () {
                        var tmpParams = {};
                        _.each(this.params, function (value, key, list) {
                            if (!!value) {
                                tmpParams[key] = value;
                            }
                        });
                        tmpParams.rows = this.pageSize;
                        tmpParams.page = this.params.page ;

                        var that = this;
                        //获取页面列表
                        $.when(hotShareList1Service.sendRequest(tmpParams))
                            .done(function (result) {
                                $scope.renderObj = result.hotShareInfos;

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
                            this.params.page = this.pageSize * (pageNum - 1);
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
                    }

                };
                $scope.addSaveParams={};
                $scope.verifyActivityId1 = function(){

                    //这里调用优惠单个查询是否有效==活动在有效时间并已发布
                    if($scope.addSaveParams.activityId!==null){
                        $.when(promotionActivityGetService.sendRequest({"id": $scope.addSaveParams.activityId}))
                            .done(function (result) {
                                if(result.status!==1){
                                    alert("该关联活动未发布！");
                                    return false;
                                }
                                if(result.endTime< new Date()){
                                    alert("该关联活动已过期！");
                                    return false;
                                }
                                $scope.addSaveParams.adsName= result.mobileTitle;
                                $scope.addSaveParams.validTimeStart= result.startTime;
                                $scope.addSaveParams.validTimeEnd= result.endTime;
                                //window.location.reload();
                                $scope.$apply();
                            })
                            .fail(function (errorInfo) {
                                //alert(errorInfo+"查询关活动ID服务异常");
                            })
                    }
                }
                $scope.saveParams={};
                $scope.verifyActivityId = function(){

                    //这里调用优惠单个查询是否有效==活动在有效时间并已发布
                    if($scope.saveParams.activityId!==null){
                        $.when(promotionActivityGetService.sendRequest({"id": $scope.saveParams.activityId}))
                            .done(function (result) {
                                if(result.status!==1){
                                    alert("该关联活动未发布！");
                                    return false;
                                }
                                if(result.endTime< new Date()){
                                    alert("该关联活动已过期！");
                                    return false;
                                }

                                $scope.saveParams.adsName= result.mobileTitle;
                                $scope.saveParams.validTimeStart= result.startTime;
                                $scope.saveParams.validTimeEnd= result.endTime;
                                $scope.$apply();
                                //window.location.reload();
                            })
                            .fail(function (errorInfo) {
                                //alert(errorInfo+"查询关活动ID服务异常");
                            })
                    }
                }
                $scope.btns1 = {
                    "modal": $("#editMJModal"),
                    "open": function (id) {
                        $scope.saveParams.id = id;
                        getHotShare($scope.saveParams.id);

                        this.modal.modal({});
                    },
                    "save": function () {

                        if (!validService.valid($scope.editFrom)) {
                            return;
                        }
                        if ($scope.terminals.h5 == $scope.terminals.app) {
                            $scope.saveParams.terminal = 6
                        } else if ($scope.terminals.h5) {
                            $scope.saveParams.terminal = 2
                        } else if ($scope.terminals.app) {
                            $scope.saveParams.terminal = 4
                        }
                        //这里再次 调用优惠单个查询是否有效==活动在有效时间并已发布
                        if($scope.saveParams.activityId!==null){
                            $.when(promotionActivityGetService.sendRequest({"id": $scope.saveParams.activityId}))
                                .done(function (result) {
                                    if(result.status!==1){
                                        alert("该关联活动未发布！");
                                        return false;
                                    }
                                    if(result.endTime< new Date()){
                                        alert("该关联活动已过期！");
                                        return false;
                                    }

                                    //$scope.saveParams.adsName= result.mobileTitle;
                                    $scope.saveParams.validTimeStart= result.startTime;
                                    $scope.saveParams.validTimeEnd= result.endTime;
                                    //保存
                                    $.when(hotShareAddoreditService.sendRequest({"json": angular.toJson($scope.saveParams)}))
                                        .done(function (result) {
                                            alert(result.msg)
                                            window.location.reload();
                                        })
                                        .fail(function (code, msg) {
                                            alert(msg);
                                        })
                                })
                                .fail(function (errorInfo) {
                                    //alert(errorInfo+"查询关活动ID服务异常");
                                })
                        }

                    }
                };
                $scope.btns = {
                    "modal": $("#addMJModal"),
                    "open": function (id) {
                        $scope.addSaveParams.id = id;
                        getHotShare1($scope.addSaveParams.id);

                        this.modal.modal({});
                    },
                    "save": function () {

                        if (!validService.valid($scope.addFrom)) {
                            return;
                        }
                        if ($scope.terminals.h5 == $scope.terminals.app) {
                            $scope.addSaveParams.terminal = 6
                        } else if ($scope.terminals.h5) {
                            $scope.addSaveParams.terminal = 2
                        } else if ($scope.terminals.app) {
                            $scope.addSaveParams.terminal = 4
                        }
                        //这里再次 调用优惠单个查询是否有效==活动在有效时间并已发布
                        if($scope.addSaveParams.activityId!==null){
                            $.when(promotionActivityGetService.sendRequest({"id": $scope.addSaveParams.activityId}))
                                .done(function (result) {
                                    if(result.status!==1){
                                        alert("该关联活动未发布！");
                                        return false;
                                    }
                                    if(result.endTime< new Date()){
                                        alert("该关联活动已过期！");
                                        return false;
                                    }
                                    //$scope.addSaveParams.adsName= result.mobileTitle;
                                    $scope.addSaveParams.validTimeStart= result.startTime;
                                    $scope.addSaveParams.validTimeEnd= result.endTime;
                                    //保存
                                    $.when(hotShareAddoreditService.sendRequest({"json": angular.toJson($scope.addSaveParams)}))
                                        .done(function (result) {
                                            alert(result.msg)
                                            window.location.reload();
                                        })
                                        .fail(function (code, msg) {
                                            alert(msg);
                                        })
                                })
                                .fail(function (errorInfo) {
                                    //alert(errorInfo+"查询关活动ID服务异常");
                                })
                        }

                    }
                };

                $scope.hotShareDel = {
                    "modal": $("#delMJModal"),
                    "open": function (id) {
                        $scope.saveParams.id = id;
                        this.modal.modal({});
                    },
                    "del": function(){
                        $.when(hotShareDeleteService.sendRequest({"id": $scope.saveParams.id}))
                            .done(function (result) {
                                alert(result.msg);
                                window.location.reload();
                            })
                            .fail(function (code, msg) {
                                alert(msg);
                            })

                    }
                }


                $scope.searchPage.search();


            }
        ]);

    });

