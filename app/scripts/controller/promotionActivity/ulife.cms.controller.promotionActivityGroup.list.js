/**
 * Created by zhengjing on 2015/1/21.
 */

define([
        'ulife.cms.module.myApp',
        'ulife.framework.services',
        'ulife.cms.business.config',
        'ulife.cms.menu.config',

        'ulife.api.promotion.activityGroup.getlist',
        'ulife.api.promotion.activityGroup.save',

        "ulife.cms.service.authority"
    ],
    function(app, services, BizConfig, MenuConfig, promotionActivityGroupGetlist, activityGroupSave) {

        promotionActivityGroupGetlist.injectTo(app);
        activityGroupSave.injectTo(app);

        app.controller('PromotionActivityGroupListCtrl', ['$scope', '$location', '$route',
            'promotionActivityGroupGetlistService',
            'promotionActivityGroupSaveService',
            'authorityService',

            function($scope, $location, $route, promotionActivityGroupGetlistService, promotionActivityGroupSaveService) {

                $scope.menuConfig = MenuConfig.menu;

                $scope.gotoPageEdit = function(index) {
                    $location.path('page/edit/' + index);
                }
                $scope.renderObj = {};

                /*$scope.editObj = {};*/

                $scope.pType = 1;

                $scope.promotionType = [
                    {'key': '满X元减N元', 'deviceId': 1},
                    {'key': '满X元包邮', 'deviceId': 2}
                ];

                $scope.addPage = {
                    "modal": $("#addMJModal"),
                    "open": function () {
                        this.id = "";
                        this.name = "";
                        this.modal.modal({});
                    },
                    "save": function() {
                        this.modal.modal('hide');
                        this.addPage();
                        /*this.page = this.oriPage;*/
                    },
                    /*"edit": function(index) {
                     this.modal.modal({});
                     },*/
                    addPage: function() {
                        $.when(promotionActivityGroupSaveService.sendRequest({
                                /*"id": JSON.stringify(this.id),*/
                                "name": this.name
                            }))
                            .done(function(result) {
                                $scope.searchPage.search();
                                $scope.$apply();
                            })
                            .fail(function() {
                            })
                    }
                }

                $scope.editGroup = {
                 /*"id": "",
                 "name": "",*/
                 "modal": $("#editMJModal"),
                 "open": function (id) {
                    this.modal.modal({});
                    this.searchSingle(id);
                 },
                 "save": function() {
                    this.modal.modal('hide');
                    this.editSave();
                 /*this.page = this.oriPage;*/
                 },
                 searchSingle: function(id) {
                 $.when(promotionActivityGroupGetlistService.sendRequest({
                    "id": id,
                    /*"name": JSON.stringify(this.name)*/
                 }))
                 .done(function(result) {
                 //$scope.editObj = result;
                    $scope.addPage.id = result.promoActivityGroup[0].id;
                    $scope.addPage.name = result.promoActivityGroup[0].name;
                    $scope.$apply();
                 })
                 .fail(function() {
                 })
                 },
                    editSave: function() {
                        $.when(promotionActivityGroupSaveService.sendRequest({
                                "id": $scope.addPage.id,
                                "name": $scope.addPage.name
                            }))
                            .done(function(result) {
                                $scope.searchPage.search();
                                $scope.$apply();
                            })
                            .fail(function() {
                            })
                    }

                 }

                $scope.searchPage = {
                    "searchId":"",
                    "searchName":"",
                    "pageSize": 20,  //页大小
                    "pageNum": 1,   //当前页码
                    "pageTotal": 1,  //页面数量
                    "pageCount": 1, //数据个数
                    "pageShow": [],
                    "page": 0,
                    "rows": 0,
                    "params": {
                        /*"categoryId": 2,
                         "pageId": null,
                         "title": "",
                         "from": 0*/
                        "id": null,
                        "name": "",
                        "page": 1,
                        "rows": 10
                    },
                    "search": function() {
                        this.params.page = 1;
                        this.params.rows = this.pageSize;
                        this.params.id = this.searchId;
                        this.params.name = this.searchName;
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
                        $.when(promotionActivityGroupGetlistService.sendRequest(tmpParams))
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
                            this.params.page = this.pageTotal;
                        }else{
                            this.params.page--;
                        }
                        this.pageNum = this.params.page;
                        this.getData();
                    },
                    "next": function() {
                        if (this.pageNum == this.pageTotal) {
                            this.params.page = 1;
                        }else {
                            this.params.page++;
                        }
                        this.pageNum = this.params.page;
                        this.getData();
                    }
                }
                $scope.searchPage.search();
            }
        ]);

    });

