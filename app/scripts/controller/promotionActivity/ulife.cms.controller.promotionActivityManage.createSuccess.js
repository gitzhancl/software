/**
 * Created by Ulife on 2016/1/15.
 */

define([
        'ulife.cms.module.myApp',
        'ulife.framework.services',
        'ulife.cms.business.config',
        'ulife.cms.menu.config',
        'ulife.api.cms.page.getList',
        'ulife.api.cms.page.add',
        'ulife.api.promotion.activity.get',
        'ulife.api.promotion.activity.publish',
        'ulife.api.promotion.activity.cancel',

        'ulife.cms.directive.datetimepicker',
        'ulife.cms.directive.dateformat',
        "ulife.cms.service.authority"
    ],
    function(app, services, BizConfig, MenuConfig, getPageList, addPage,activityGet,promotionActivityPublish,promotionActivityCancel) {

        getPageList.injectTo(app);
        addPage.injectTo(app);
        activityGet.injectTo(app);
        promotionActivityPublish.injectTo(app);
        promotionActivityCancel.injectTo(app);

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

        app.filter('promotionType', function () {
            return function (val) {
                switch (val) {
                    case 'REDUCE' :
                        return '满x元减n元';
                    case 'GIVE' :
                        return '满x元赠A商品n件';
                    case 'PIECEREDUCE' :
                        return 'A商品满n件减y元';
                    case 'PIECEGIVE' :
                        return 'A商品满n件赠B商品m件';
                    case 'OPTIONALLY' :
                        return 'x元选m件';
                    case 'FIRSTREDUCE' :
                        return '首单满x元减n元';
                    case 'FIRSTGIVE' :
                        return '首单满x元赠A商品n件';
                    case 'SPECIAL' :
                        return '限时特价';
                    case 'PANICBUY' :
                        return '限时抢购';
                }
            }
        });

        app.controller('PromotionActivityManageCreateSuccessCtrl', ['$scope', '$location', '$route','$filter',
            'cmsPageGetListService',
            'cmsPageAddService',
            'promotionActivityGetService',
            'promotionActivityPublishService',
            'promotionActivityCancelService',
            'authorityService',

            function($scope, $location, $route,$filter, cmsPageGetListService, cmsPageAddService,promotionActivityGetService,promotionActivityPublishService,promotionActivityCancelService) {

                $scope.menuConfig = MenuConfig.menu;

                $scope.renderObj = {};

                var activityId = $route.current.params.activityId;
                $scope.activityId = activityId;

                $scope.removeRule = function (index, id) {
                    $scope.ruleData.splice(index, 1);
                };

                $scope.appendPromotion = {
                    "modal": $("#appendModal"),
                    "open": function () {
                        this.modal.modal({});
                    },
                    "save": function() {
                        this.modal.modal('hide');

                        this.addPage();
                        this.page = this.oriPage;
                    },
                    addPage: function() {
                        $.when(cmsPageAddService.sendRequest(this.page))
                            .done(function(result) {
                                $location.path('page/edit/' + result.pageId);
                                $scope.$apply();
                            })
                            .fail(function() {
                            })
                    }
                }

                $scope.activity = {
                    "modal": $("#publishModuleModal"),
                    "modal2": $("#cancelModuleModal"),
                    "publishOpen": function () {
                        this.modal.modal({});
                    },
                    "cancelOpen": function () {
                        this.modal2.modal({});
                    },
                    publish: function(activityId) {
                        $.when(promotionActivityPublishService.sendRequest({"id":activityId})).done(function(result) {
                                alert(result.value);
                                $location.path('promotionActivityManage/createSuccess/'+result.id);
                                $scope.$apply();
                            })
                            .fail(function(r,e) {
                                alert(e);
                            })
                    },
                    cancel: function(activityId) {
                        $.when(promotionActivityCancelService.sendRequest({"id":activityId})).done(function(result) {
                                alert(result.value);
                                $scope.$apply();
                            })
                            .fail(function() {
                                alert("取消失败");
                            })
                    }
                }

                $scope.searchPage = {
                    "pageSize": 20,  //页大小
                    "pageNum": 1,   //当前页码
                    "pageTotal": 1,  //页面数量
                    "pageCount": 1, //数据个数
                    "pageShow": [],
                    "params": {
                        "id": $scope.activityId
                    },
                    "search": function() {
                        this.params.size = this.pageSize;
                        this.params.from = 0;
                        this.getData();
                    },
                    /*"publish": function(activityId) {
                        $.when(promotionActivityPublishService.sendRequest({"id":activityId}))
                            .done(function(result) {
                                alert(result.value);
                                $scope.$apply();
                            })
                            .fail(function() {
                            })
                    },
                    "cancel": function(activityId) {
                        $.when(promotionActivityCancelService.sendRequest({"id":activityId}))
                            .done(function(result) {
                                alert(result.value);
                                $scope.$apply();
                            })
                            .fail(function() {
                            })
                    },*/
                    "getData": function() {
                        var tmpParams = {};
                        _.each(this.params, function(value, key, list) {
                            if(!!value) {
                                tmpParams[key] = value;
                            }
                        });
                        var that = this;
                        //获取页面数据
                        $.when(promotionActivityGetService.sendRequest(tmpParams))
                            .done(function(result) {
                                $scope.renderObj = result;
                                $scope.previewLinks = BizConfig.setting['preview_links'];

                                //处理分页信息
                                that.pageCount = result.count;
                                that.pageTotal = Math.ceil(result.count / that.pageSize);

                                $scope.$apply();
                            })
                            .fail(function() {
                            })
                    },
                    "goto": function(pageNum) {
                        this.pageNum = pageNum;
                        if (!!pageNum && _.isNumber(pageNum) && pageNum > 0) {
                            this.params.from = this.pageSize * (pageNum - 1);
                        }
                        this.getData()

                    },
                    "pre": function() {
                        if (this.pageNum == 1) {
                            return;
                        }
                        this.params.from -= this.pageSize;
                        this.pageNum--;
                        this.getData();
                    },
                    "next": function() {
                        if (this.pageNum == this.pageTotal) {
                            return;
                        }
                        this.params.from += this.pageSize;
                        this.pageNum++;
                        this.getData();
                    }
                }
                $scope.searchPage.search();



            }
        ]);

    });

