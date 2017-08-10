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

        "ulife.cms.service.authority"
    ],
    function(app, services, BizConfig, MenuConfig, getPageList, addPage) {

        getPageList.injectTo(app);
        addPage.injectTo(app);

        app.controller('PromotionActivityBlacklistCtrl', ['$scope', '$location', '$route',
            'cmsPageGetListService',
            'cmsPageAddService',
            'authorityService',


            function($scope, $location, $route, cmsPageGetListService, cmsPageAddService) {

                $scope.menuConfig = MenuConfig.menu;

                $scope.gotoPageEdit = function(index) {
                    $location.path('page/edit/' + index);
                }
                $scope.renderObj = {};

                $scope.isVType = 1;

                $scope.isValidType = [
                    {'key': '有效', 'deviceId': 1},
                    {'key': '无效', 'deviceId': 2}
                ];

                $scope.addPage = {
                    "modal": $("#addMJModal"),
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

                $scope.deleteModule = {
                    dialog: {
                        open: function(index) {
                            //$scope.pageHandler.moduleHandler.edit(index);
                            $("#deleteModuleModal").modal({});
                        }
                    },
                    delete: function() {
                        //$scope.pageHandler.moduleHandler.delete();
                        $('#deleteModuleModal').modal('hide')
                    }
                }

                $scope.searchPage = {
                    "pageSize": 20,  //页大小
                    "pageNum": 1,   //当前页码
                    "pageTotal": 1,  //页面数量
                    "pageCount": 1, //数据个数
                    "pageShow": [],
                    "params": {
                        "categoryId": 2,
                        "pageId": null,
                        "title": "",
                        "from": 0
                    },
                    "search": function() {
                        this.params.size = this.pageSize;
                        this.params.from = 0;
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
                        $.when(cmsPageGetListService.sendRequest(tmpParams))
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

