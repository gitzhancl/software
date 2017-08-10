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

        'ulife.api.promotion.activity.publish',
        'ulife.api.promotion.activity.cancel',
        'ulife.api.promotion.activity.addCount',
        'ulife.api.promotion.activity.get',
        'ulife.api.promotion.card.getlist',
        'ulife.api.promotion.activity.save',
        'ulife.api.promotion.code.prebuilt',

        'ulife.cms.directive.datetimepicker',
        'ulife.cms.directive.dateformat',
        "ulife.cms.service.authority"
    ],
    function(app, services, BizConfig, MenuConfig, activityPublish, activityCancel, activityAddCount, getActivity, cardList, activitySave, prebuild) {

        activityPublish.injectTo(app);
        activityCancel.injectTo(app);
        activityAddCount.injectTo(app);
        getActivity.injectTo(app);
        cardList.injectTo(app);
        activitySave.injectTo(app);
        prebuild.injectTo(app);

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
                    case 0 :
                        return '私券';
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

        app.controller('PromotionActivityCreateSuccessCtrl', ['$scope', '$location', '$route','$filter',
            'promotionActivityPublishService',
            'promotionActivityCancelService',
            'promotionActivityAddCountService',
            'promotionActivityGetService',
            'promotionCardGetlistService',
            'promotionActivitySaveService',
            'promotionCodePrebuiltService',
            'authorityService',

            function($scope, $location, $route,$filter,
                     promotionActivityPublishService,
                     promotionActivityCancelService,
                     promotionActivityAddCountService,
                     promotionActivityGetService,
                     promotionCardGetlistService,
                     promotionActivitySaveService,
                     promotionCodePrebuiltService) {

                $scope.menuConfig = MenuConfig.menu;

                $scope.params = {};

                $scope.rules = [];

                $scope.id = $route.current.params.id;

                $scope.rulesRoot = {"ALL":[],"REDUCE":[],"POSTAGEREDUCE":[],"GROUPREDUCE":[]};


                $scope.promotionType = [
                    {'key': '全部', 'deviceId': ''},
                    {'key': '满减券', 'deviceId': 'REDUCE'},
                    {'key': '免邮券', 'deviceId': 'POSTAGEREDUCE'},
                    {'key': '团购满减券', 'deviceId': 'GROUPREDUCE'}
                ];

                $scope.useDate = [
                    {'key': '全部', 'deviceId': ''},
                    {'key': '固定日期区间', 'deviceId': 'date'},
                    {'key': '固定有效时长', 'deviceId': 'days'}
                ];

                $scope.loadPromotion = function(){
                    $.when(promotionCardGetlistService.sendRequest({"type":""}))
                        .done(function(REDUCE) {
                            $scope.rulesRoot["ALL"] = REDUCE.value;
                            _.each(REDUCE.value, function(item, index, list){
                                if(item.type == "REDUCE"){
                                    $scope.rulesRoot["REDUCE"].push(item);
                                }else if(item.type == "POSTAGEREDUCE"){
                                    $scope.rulesRoot["POSTAGEREDUCE"].push(item);
                                }else if(item.type == "GROUPREDUCE"){
                                    $scope.rulesRoot["GROUPREDUCE"].push(item);
                                }
                            });
                        })
                        .then(function() {
                            //获取页面基本信息
                            $.when(promotionActivityGetService.sendRequest({"id":$scope.id}))
                                .done(function(result) {
                                    $scope.params = result;
                                    $scope.params.cartPackage = JSON.parse(result.cartPackage);

                                    _.each($scope.params.cartPackage, function(item, index, list) {
                                        $scope.rules.push($scope.rulesRoot[item.type]);
                                    })

                                    $scope.$apply();
                                })
                                .fail(function() {

                                })
                        })
                        .fail(function() {
                        });
                }

                $scope.loadPromotion();


                //提交按钮
                $scope.createActivity = {
                    "save": function() {
                        this.saveActivity();
                    },
                    saveActivity: function() {
                        console.log(JSON.stringify($scope.params));
                        $.when(promotionActivitySaveService.sendRequest({"json":JSON.stringify($scope.params)})).done(function(result) {
                                alert("提交成功");
                                $scope.$apply();
                            })
                            .fail(function() {
                            })
                    }
                }

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
                        $.when(promotionActivityAddCountService.sendRequest({
                            "id":$scope.id,
                            "count":this.count,
                        })).done(function(result) {
                                alert(result.value);
                                $scope.loadPromotion();
                                $scope.$apply();
                            })
                            .fail(function() {
                                alert("追加失败");
                            })
                    }
                }

                //发布优惠券
                $scope.publishPromotion = {
                    "modal": $("#publishModal"),
                    "open": function () {
                        this.modal.modal({});
                    },
                    "publish": function(id) {
                        this.modal.modal('hide');
                        $.when(promotionActivityPublishService.sendRequest({"id":id})).done(function(result) {
                                alert(result.value);
                                $scope.loadPromotion();
                                $scope.$apply();
                            })
                            .fail(function() {
                                alert("发布失败");
                            })
                    }
                }

                //作废优惠券
                $scope.cancelPromotion = {
                    "modal": $("#cancelModal"),
                    "open": function () {
                        this.modal.modal({});
                    },
                    "cancel": function(id) {
                        this.modal.modal('hide');
                        $.when(promotionActivityCancelService.sendRequest({"id":id})).done(function(result) {
                                alert(result.value);
                                $scope.$apply();
                            })
                            .fail(function() {
                                alert("作废优惠券失败");
                            })
                    }
                }

                $scope.isclick = false;

                //批量预生成
                $scope.prebuildPromotion = {
                    "modal": $("#buildModal"),
                    "open": function () {
                        this.modal.modal({});
                    },
                    "build": function(id) {
                        this.modal.modal('hide');
                        $.when(promotionCodePrebuiltService.sendRequest({"actid":id})).done(function(result) {
                                $scope.isclick = true;
                                alert(result.value);
                                $scope.$apply();
                            })
                            .fail(function() {
                                alert("预生成失败");
                            })
                    }
                }

            }
        ]);

    });

