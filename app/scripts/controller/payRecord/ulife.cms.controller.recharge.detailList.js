/**
 * zhanchanglei
 */
define([
        'ulife.cms.module.myApp',
        'ulife.framework.services',
        'ulife.cms.business.config',
        'ulife.cms.menu.config',

        'ulife.api.cms.recharge.detailList',

        'ulife.cms.directive.datepicker',
        'ulife.cms.directive.tooltip',
        'ulife.cms.directive.dateformat',
        "ulife.cms.service.authority"

    ],
    function (app, services, BizConfig, MenuConfig, cmsRechargeDetailList) {
        cmsRechargeDetailList.injectTo(app);
/*
        app.filter('deptType', function () {
            return function (val) {
                switch (val) {
                    case "1":
                        return "运营部";
                    case "2":
                        return "市场部";
                    case "3":
                        return "商品部";
                    case "4":
                        return "用户体验部";
                    case "5":
                        return "财务部";
                    case "6":
                        return "技术部";
                    case "7":
                        return "产品部";
                    case "8":
                        return "大客户部";
                    case "9":
                        return "新媒体营销部";

                }

            }


        });*/
        app.filter('zhifufangshi', function () {
            return function (val) {
                switch (val) {
                    case "02":
                        return "支付宝";
                    case "06":
                        return "支付宝";
                    case "16":
                        return "支付宝";
                    case "07":
                        return "微信";
                    case "17":
                        return "微信";

                }
            }
        });
        app.filter('kaleixing', function () {
            return function (val) {
                switch (val) {
                    case 0:
                        return "主卡";
                    case 1:
                        return "赠卡";
                }
            }
        });
        app.controller('RechargeDetailList', ['$scope', '$location', '$route',
            'cmsRechargeDetailListService', 'authorityService',

            function ($scope, $location, $route, cmsRechargeDetailListService) {

                $scope.menuConfig = MenuConfig.menu;


                $scope.renderObj = {};
                $scope.searchPage = {
                    "pageSize": 10,  //页大小
                    "pageNum": 1,   //当前页码
                    "pageTotal": 1,  //页面数量
                    "pageCount": 1, //数据个数
                    "pageShow": [],
                    "params": {
                        "actionType": 'page',
                        "rechargeStartTime": null,
                        "rechargeEndTime": null,
                        "cardNo": null,
                        "rechargeNo": null,
                        "userEmail": null,
                        "activityId": null,
                        "customer": null,
                        "paySerialNo": null,
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
                        tmpParams.size = this.pageSize;
                        tmpParams.from = (this.pageNum - 1) * this.pageSize;

                        var that = this;
                        //获取页面列表
                        $.when(cmsRechargeDetailListService.sendRequest(tmpParams))
                            .done(function (result) {
                                if (result.jsonMessage != "") {
                                    $scope.renderObj = JSON.parse(result.jsonMessage);
                                } else {
                                    $scope.renderObj = '';
                                }
                                //处理分页信息
                                that.pageCount = result.totalCount;
                                that.pageTotal = Math.ceil(result.totalCount / that.pageSize);

                                $scope.$apply();
                            })
                            .fail(function (code, msg) {
                                alert(msg)
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

                $scope.download = {
                    "modal": $("#downloadModal"),
                    "open": function () {
                        this.modal.modal({});
                    },
                    "save": function () {
                        if ($scope.searchPage.params.userEmail == null) {
                            alert("请输入邮箱");
                            return;
                        }
                        this.modal.modal('hide');
                        this.export();
                    },
                    export: function () {
                        $scope.searchPage.params.page = 1;
                        $scope.searchPage.params.rows = $scope.searchPage.pageSize;
                        var tmpParams = {};
                        _.each($scope.searchPage.params, function (value, key, list) {
                            if (!!value) {
                                tmpParams[key] = value;
                            }
                        });
                        tmpParams.actionType = 'export';
                        tmpParams.userEmail = $scope.searchPage.params.userEmail;

                        var that = $scope.searchPage;
                        $.when(cmsRechargeDetailListService.sendRequest(tmpParams))
                            .done(function (result) {
                                if (result.status == "OK") {
                                    alert("导出成功，请到邮箱查看吧！");
                                }
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

