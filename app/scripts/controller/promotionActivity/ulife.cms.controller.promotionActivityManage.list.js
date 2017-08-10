/**
 * Created by Ulife on 2016/1/22.
 */

define([
        'ulife.cms.module.myApp',
        'ulife.framework.services',
        'ulife.cms.business.config',
        'ulife.cms.menu.config',

        'ulife.api.promotion.activity.getlist',
        'ulife.api.promotion.activityGroup.getlist',
        'ulife.api.cms.page.add',

        'ulife.cms.directive.datepicker',
        'ulife.cms.directive.datetimepicker',
        'ulife.cms.directive.tooltip',
        'ulife.cms.directive.dateformat',
        "ulife.cms.service.authority"

    ],
    function(app, services, BizConfig, MenuConfig, getPageList, promotionActivityGroupGetlist,addPage) {

        getPageList.injectTo(app);
        promotionActivityGroupGetlist.injectTo(app);
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

        app.controller('PromotionActivityManageCtrl', ['$scope', '$location', '$route',
            'promotionActivityGetlistService',
            'promotionActivityGroupGetlistService',
            'cmsPageAddService',
            'authorityService',

            function($scope, $location, $route, promotionActivityGetlistService,promotionActivityGroupGetlistService, cmsPageAddService,promotionWhitelistImportService,promotionWhitelistExportService) {

                $scope.menuConfig = MenuConfig.menu;

                $scope.gotoPageEdit = function(index) {
                    $location.path('page/edit/' + index);
                }
                $scope.renderObj = {};

                $scope.dtType = '';
                $scope.atType = '';
                $scope.apType = '';
                $scope.agType = '';
                $scope.termType = '';
                $scope.atStatus = '';

                $scope.departmentType = [
                    {'key': '请选择', 'deviceId': ''},
                    {'key': '运营部', 'deviceId': '1'},
                    {'key': '市场部', 'deviceId': '2'},
                    {'key': '商品部', 'deviceId': '3'},
                    {'key': '用户体验部', 'deviceId': '4'},
                    {'key': '财务部', 'deviceId': '5'},
                    {'key': '技术部', 'deviceId': '6'},
                    {'key': '产品部', 'deviceId': '7'},
                    {'key': '大客户部', 'deviceId':'8'},
                    {'key': '新媒体营销部', 'deviceId':'9'}
                ];
                $scope.terminalType = [
                    {'key': '全部终端', 'deviceId': ''},
                    {'key': 'APP', 'deviceId': '4'},
                    {'key': 'H5', 'deviceId': '2'},
                    {'key': 'PC', 'deviceId': '1'}
                ];
                $scope.activityType = [
                    {'key': '全部商品类型', 'deviceId': ''},
                    {'key': '满x元减n元', 'deviceId': 'REDUCE'},
                    {'key': '满x元赠A商品n件', 'deviceId': 'GIVE'},
                    {'key': 'A商品满n件减y元', 'deviceId': 'PIECEREDUCE'},
                    {'key': 'A商品满n件赠B商品m件', 'deviceId': 'PIECEGIVE'},
                    {'key': 'x元选m件', 'deviceId': 'OPTIONALLY'},
                    {'key': '首单满x元减n元', 'deviceId': 'FIRSTREDUCE'},
                    {'key': '首单满x元赠A商品n件', 'deviceId': 'FIRSTGIVE'},
                    {'key': '限时特价', 'deviceId': 'SPECIAL'},
                    {'key': '限时抢购', 'deviceId': 'PANICBUY'}
                ];
                $scope.activityProductType = [
                    {'key': '全部商品类型', 'deviceId': ''},
                    {'key': '自营商品', 'deviceId': 'SELF'},
                    {'key': '寄售商品', 'deviceId': 'consignation'}
                ];
                $scope.activityGroupType = [
                    {'key': '全部活动组', 'deviceId': "0"}/*,
                    {'key': '06年货季1', 'deviceId': '1'},
                    {'key': '06年货季2', 'deviceId': '2'}*/
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
                        "productFrom": "",
                        "terminal": "",
                        "name": "",
                        "itemId": "",
                        "start_date": null,
                        "end_date": null,
                        "department": "",
                        "activityType": "",
                        "groupId":"0",
                        "product_from": "",
                        "terminal": "",
                        "status": "99",
                        "type":2,
                        "page": 1,
                        "rows": 20,
                        "rulesType": "",
                        "itemId":""
                        /*"name": "",
                        "id": null,
                        "code": "",
                        "product_from": "",
                        "start_date": null,
                        "end_date": null,
                        "type": 2,
                        "terminal": "",
                        "page": 1,
                        "rows": 20*/
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
                        var that = this;

                        //获取页面列表
                        $.when(promotionActivityGetlistService.sendRequest(tmpParams))
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

                $scope.initGroup = function () {
                    var tmpParams = {};
                    $.when(promotionActivityGroupGetlistService.sendRequest(tmpParams))
                        .done(function(result) {
                            angular.forEach(result.promoActivityGroup, function(data){
                                $scope.activityGroupType.push({'key':data.name, 'deviceId': data.id});
                            });
                            $scope.$apply();
                        })
                        .fail(function() {
                        })
                }

                $scope.initGroup();

                $scope.searchPage.search();



            }
        ]);

    });

