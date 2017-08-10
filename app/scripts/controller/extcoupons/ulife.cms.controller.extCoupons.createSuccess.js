/**
 * Created by Ulife on 2016/1/15.
 */
/**
 * Created by Zhangke on 2015/12/15.
 *
 * status -1:已取消 0：已创建 1：已发布
 */

define([
        'ulife.cms.module.myApp',
        'ulife.framework.services',
        'ulife.cms.business.config',
        'ulife.cms.menu.config',

        'ulife.api.promotion.cms.extcode.activityPublish',
        'ulife.api.promotion.cms.extcode.activityCancel',
        'ulife.api.promotion.cms.extcode.addCount',
        'ulife.api.promotion.cms.extcode.singleActivity',

        'ulife.cms.directive.datetimepicker',
        'ulife.cms.directive.dateformat', 
        "ulife.cms.service.authority"
    ],
    function(app, services, BizConfig, MenuConfig, activityPublish, activityCancel, promotionCmsExtcodeAddCount, getActivity) {

        activityPublish.injectTo(app);
        activityCancel.injectTo(app);
        promotionCmsExtcodeAddCount.injectTo(app);
        getActivity.injectTo(app);

        app.filter('productFrom', function () {
            return function (val) {
                switch (val) {
                    case 'SELF' :
                        return '菜园自营';
                    case 'consignation' :
                        return '产地直采';
                }
            }
        });

        app.filter('departmentType', function () {
            return function (val) {
                switch (val) {
                    case 1 :
                        return '运营部';
                    case 2 :
                        return '市场部';
                    case 3 :
                        return '商品部';
                    case 4 :
                        return '用户体验部';
                    case 5 :
                        return '财务部';
                    case 6 :
                        return '技术部';
                    case 7 :
                        return '产品部';
                    case 8 :
                        return '大客户部';
                    case 9 :
                        return '新媒体营销部';
                }
            }
        });

        app.filter('isPublicType', function () {
            return function (val) {
                switch (val) {
                    case 1 :
                        return '公券';
                  /*  case 0 :
                        return '私券';*/
                }
            }
        });

        app.filter('terminalType', function () {
            return function (val) {
                switch (val) {
                    case 1 :
                        return 'PC';
                    case 2 :
                        return 'H5';
                    case 3 :
                        return 'PC、H5';
                    case 4 :
                        return 'App';
                    case 5 :
                        return 'PC、APP';
                    case 6 :
                        return 'H5、APP';
                    case 7 :
                        return 'PC、H5、APP';
                }
            }
        });

        app.filter('status', function () {
            return function (val) {
                switch (val) {
                    case 0 :
                        return '已创建';
                    case 1 :
                        return '已发布';
                    case -1 :
                        return '已取消';
                }
            }
        });
        app.filter('stores', function () {
            return function (val) {
                switch (val) {
                    case "1" :
                        return '全部门店';
                    case "2" :
                        return '部分门店';
                }
            }
        });

        app.controller('CmsActivityCreateSuccess', ['$scope', '$location', '$route','$filter',
            'promotionCmsExtcodeActivityPublishService',
            'promotionCmsExtcodeActivityCancelService',
            'promotionCmsExtcodeAddCountService',
            'promotionCmsExtcodeSingleActivityService',
            'authorityService',

            function($scope, $location, $route,$filter,
                     promotionCmsExtcodeActivityPublishService,
                     promotionCmsExtcodeActivityCancelService,
                     promotionCmsExtcodeAddCountService,
                     promotionCmsExtcodeSingleActivityService) {

                $scope.menuConfig = MenuConfig.menu;

                $scope.params = {};

                $scope.rules = [];

                $scope.id = $route.current.params.id;

                $scope.rulesRoot = {"ALL":[],"REDUCE":[],"POSTAGEREDUCE":[]};


                $scope.promotionType = [
                    {'key': '全部', 'deviceId': ''},
                    {'key': '外部优惠券', 'deviceId': 3}
                    //{'key': '免邮券', 'deviceId': }
                ];

                $scope.useDate = [
                    {'key': '全部', 'deviceId': ''},
                    {'key': '固定日期区间', 'deviceId': 'date'},
                    {'key': '固定有效时长', 'deviceId': 'days'}
                ];

                $scope.loadPromotion = function(){

                            //获取页面基本信息
                            $.when(promotionCmsExtcodeSingleActivityService.sendRequest({"activityId":$scope.id}))
                                .done(function(result) {
                                    debugger
                                    $scope.params = JSON.parse(result.jsonMessage);

                                    $scope.params.cartPackage = JSON.parse($scope.params.cartPackage);
                                    //console.log(JSON.stringify($scope.params));
                                    //$scope.params.cartPackage = JSON.parse(result.cartPackage);

                                    //_.each($scope.params.cartPackage, function(item, index, list) {
                                    //    $scope.rules.push($scope.rulesRoot[item.type]);
                                    //})

                                    $scope.$apply();
                                })
                                .fail(function() {

                                })

                };

                $scope.loadPromotion();


                //提交按钮
                //$scope.createActivity = {
                //    "save": function() {
                //        this.saveActivity();
                //    },
                //    saveActivity: function() {
                //        console.log(JSON.stringify($scope.params));
                //        $.when(promotionActivitySaveService.sendRequest({"json":JSON.stringify($scope.params)})).done(function(result) {
                //                alert("提交成功");
                //                $scope.$apply();
                //            })
                //            .fail(function() {
                //            })
                //    }
                //}

                //追加优惠券
                $scope.appendPromotion = {
                    "modal": $("#appendModal"),
                    "count":0,
                    "open": function () {
                        this.modal.modal({});
                    },
                    "save": function() {
                        if(this.count == undefined || this.count < 1){
                            alert("请输入追加数量");
                            return;
                        }
                        this.modal.modal('hide');
                        this.addCount();
                    },
                    addCount: function() {
                        $.when(promotionCmsExtcodeAddCountService.sendRequest({
                            "id":$scope.id,
                            "count":this.count,
                        })).done(function(result) {
                                alert(result.debugMessage);
                                $scope.loadPromotion();
                                $scope.$apply();
                            })
                            .fail(function() {
                                alert("追加失败");
                            })
                    }
                }
                //
                ////发布优惠券
                //$scope.publishPromotion = {
                //    "modal": $("#publishModal"),
                //    "open": function () {
                //        this.modal.modal({});
                //    },
                //    "publish": function(id) {
                //        this.modal.modal('hide');
                //        $.when(promotionCmsExtcodeActivityPublishService.sendRequest({"id":id})).done(function(result) {
                //                alert(result.value);
                //                $scope.loadPromotion();
                //                window.location.reload();
                //                $scope.$apply();
                //            })
                //            .fail(function(msg) {
                //                alert(msg);
                //            })
                //    }
                //}

                //作废优惠券
                $scope.cancelPromotion = {
                    "modal": $("#cancelModal"),
                    "open": function () {
                        this.modal.modal({});
                    },
                    "cancel": function(id) {
                        this.modal.modal('hide');
                        $.when(promotionCmsExtcodeActivityCancelService.sendRequest({"id":id})).done(function(result) {
                                alert(result.value);
                                window.location.reload();
                                $scope.$apply();
                            })
                            .fail(function() {
                                alert("作废优惠券失败");
                            })
                    }
                }

                $scope.isclick = false;


            }
        ]);

    });

