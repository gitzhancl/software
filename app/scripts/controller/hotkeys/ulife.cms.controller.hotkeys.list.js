/**
 * @author zhanchanglei
 * @date 2016-05-09
 */

define([
        'ulife.cms.module.myApp',
        'ulife.framework.services',
        'ulife.cms.business.config',
        'ulife.cms.menu.config',

        'ulife.api.cms.hotkeys.list',

        'ulife.cms.directive.datepicker',
        'ulife.cms.directive.tooltip',
        'ulife.cms.directive.dateformat',
        "ulife.cms.service.authority"

    ],
    function (app, services, BizConfig, MenuConfig, cmsHotkeysList) {

        cmsHotkeysList.injectTo(app);


        app.filter('terminal', function () {//1表示Web  2表示H5  4表示APP，多个终端对应值进行位或运算值
            return function (val) {
                switch (val) {
                    case 1 :
                        return 'PC';
                    case 2 :
                        return 'H5';
                    case 3 :
                        return 'PC、H5';
                    case 4 :
                        return 'APP';
                    case 5 :
                        return 'PC、APP';
                    case 6 :
                        return 'H5、APP';
                    case 7 :
                        return 'PC、H5、APP';
                }
            }
        });
        app.controller('hotkeysList', ['$scope', '$location', '$route',
            'cmsHotkeysListService',
            'authorityService',

            function ($scope, $location, $route, cmsHotkeysListService) {

                $scope.terminal = [//1表示Web  2表示H5  4表示APP，多个终端对应值进行位或运算值
                    {'key': '全部终端', 'value': ''},
                    {'key': 'PC', 'value': 1},
                    {'key': 'H5', 'value': 2},
                    {'key': 'PC、H5', 'value': 3},
                    {'key': 'APP', 'value': 4},
                    {'key': 'PC、APP', 'value': 5},
                    {'key': 'H5、APP', 'value': 6},
                    {'key': 'PC、H5、APP', 'value': 7}
                ];
                $scope.menuConfig = MenuConfig.menu;

                $scope.searchPage = {
                    "pageSize": 15,  //页大小
                    "pageNum": 1,   //当前页码
                    "pageTotal": 1,  //页面数量
                    "pageCount": 1, //数据个数
                    "pageShow": [],
                    "params": {
                        "hotKey": null,
                        "startNumber": 1,
                        "eachPageNumber": 15,
                        "page": 1
                    },
                    "search": function () {
                        this.params.startNumber = 0;
                        this.params.eachPageNumber = this.pageSize;
                        this.getData();
                    },
                    "getData": function () {
                        var tmpParams = {};
                        _.each(this.params, function (value, key, list) {
                            if (!!value) {
                                tmpParams[key] = value;
                            }
                        });
                        tmpParams.hotKey = this.params.hotKey;
                        //tmpParams.eachPageNumber = this.pageSize;
                        //tmpParams.startNumber = (this.pageNum - 1) * this.pageSize;

                        var that = this;
                        //获取页面列表
                        $.when(cmsHotkeysListService.sendRequest(tmpParams))
                            .done(function (result) {
                                if (result.result == true && result.total > 0) {
                                    $scope.renderObj = JSON.parse(result.message);
                                } else {
                                    $scope.renderObj = {};
                                    $scope.renderObj.message = 'rs = []';
                                }


                                //处理分页信息
                                $scope.pageCount = result.total;
                                if (typeof($scope.pageCount) == 'undefined') {
                                    that.pageTotal = 1;
                                } else {
                                    that.pageTotal = Math.ceil(result.total / that.pageSize);

                                }
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
                            this.params.startNumber = Math.ceil((this.params.page - 1) * this.pageSize)
                        } else {
                            this.params.page--;
                            this.params.startNumber = Math.ceil((this.params.page - 1) * this.pageSize)
                        }
                        this.pageNum = this.params.page;
                        this.getData();
                    },
                    "next": function () {

                        if (Math.ceil($scope.pageCount / this.pageSize) == this.pageNum) {
                            this.params.page = 1;
                            this.params.startNumber = this.pageSize * (this.params.page - 1)
                        }

                        if (this.pageNum == this.pageTotal) {
                            this.params.page = 1;

                        } else {
                            this.params.page++;
                            this.params.startNumber = this.pageSize * (this.params.page - 1)

                        }

                        this.pageNum = this.params.page;

                        this.getData();
                    }
                }
                $scope.searchPage.search();
            }
        ]);

    });

