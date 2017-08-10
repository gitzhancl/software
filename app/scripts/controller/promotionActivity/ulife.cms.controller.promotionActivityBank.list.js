/**
 * Created by LMF on 2016-10-09.
 */

define([
        'ulife.cms.module.myApp',
        'ulife.framework.services',
        'ulife.cms.business.config',
        'ulife.cms.menu.config',

        'ulife.api.promotion.activity.getlist',
        'ulife.api.cms.page.add',

        'ulife.cms.directive.datetimepicker',
        'ulife.cms.directive.datepicker',
        'ulife.cms.directive.dateformat',
        "ulife.cms.service.authority"
    ],
    function(app, services, BizConfig, MenuConfig, getPageList, addPage) {

        getPageList.injectTo(app);
        addPage.injectTo(app);

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
        app.controller('PromotionActivityBankListCtrl', ['$scope', '$location', '$route',
            'promotionActivityGetlistService',
            'cmsPageAddService',
            'authorityService',

            function($scope, $location, $route, promotionActivityGetlistService, cmsPageAddService) {

                $scope.menuConfig = MenuConfig.menu;

                $scope.gotoPageEdit = function(index) {
                    $location.path('page/edit/' + index);
                }
                $scope.renderObj = {};

                $scope.pType = '';
                $scope.prodType = '';
                $scope.termType = '';

                $scope.terminalType = [
                    {'key': '全部终端', 'deviceId': ''},
                    {'key': 'APP', 'deviceId': '4'},
                    {'key': 'H5', 'deviceId': '2'},
                    {'key': 'PC', 'deviceId': '1'}
                ];

                $scope.status = [
                    {'key': '全部状态', 'deviceId': "99"},
                    {'key': '已创建', 'deviceId':"0"},
                    {'key': '已发布', 'deviceId':"1"},
                    {'key': '进行中', 'deviceId': '3'},
                    {'key': '已结束', 'deviceId': '4'},
                    {'key': '已取消', 'deviceId':"-1"}
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

                $scope.searchPage = {
                    "pageSize": 20,  //页大小
                    "pageNum": 1,   //当前页码
                    "pageTotal": 1,  //页面数量
                    "pageCount": 1, //数据个数
                    "pageShow": [],
                    "params": {
                        "name": "",
                        "id": null,
                        "code": "",
                        "product_from": "",
                        "start_date": null,
                        "end_date": null,
                        "type": 4,
                        "status": "99",
                        "terminal": "",
                        "page": 1,
                        "rows": 10
                    },
                    "search": function() {
                        this.params.rows = this.pageSize;
                        this.params.page = 1;
                        this.getData();
                    },
                    "getData": function() {
                        var tmpParams = {};
                        _.each(this.params, function(value, key, list) {
                            if(!!value) {
                                tmpParams[key] = value;
                            }
                        });
                        //tmpParams["status"] = 99;
                        var that = this;
                        //获取页面列表
                        $.when(promotionActivityGetlistService.sendRequest(tmpParams))
                            .done(function(result) {
                                _.each(result.promoActivity, function(value) {
                                    var cartPackage = JSON.parse(value.cartPackage);
                                    _.each(cartPackage, function(pack) {
                                        //pack.replace("limit","<br/>limit");
                                    });
                                });
                                $scope.renderObj = result;

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

