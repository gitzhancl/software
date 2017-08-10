define([
        'ulife.cms.module.myApp',
        'ulife.framework.services',
        'ulife.cms.business.config',
        'ulife.cms.menu.config',

        'ulife.api.ticket.cms.getList',
        'ulife.api.ticket.cms.getDetail',
        'ulife.api.ticket.cms.update',

        'ulife.cms.directive.datepicker',
        'ulife.cms.directive.tooltip',
        "ulife.cms.service.valid",
        'ulife.cms.directive.dateformat',
        "ulife.cms.service.authority"

    ],
    function (app, services, BizConfig, MenuConfig, ticketCmsGetList, ticketCmsGetDetail, ticketCmsUpdate) {

        ticketCmsGetList.injectTo(app);
        ticketCmsGetDetail.injectTo(app);
        ticketCmsUpdate.injectTo(app);
        app.filter('salePcH5', function () {
            return function (val) {
                switch (val) {
                    case 1 :
                        return '否';
                    case 2 :
                        return '是';
                }
            }
        });

        app.controller('SalesPackageListCtrl', ['$scope', '$location', '$route',
            'ticketCmsGetListService', 'ticketCmsGetDetailService', 'ticketCmsUpdateService', 'validService', 'authorityService',

            function ($scope, $location, $route, ticketCmsGetListService, ticketCmsGetDetailService, ticketCmsUpdateService, validService) {

                $scope.salePcH5 = [
                    {'key': '不限', 'value': 0},
                    {'key': '是', 'value': 2},
                    {'key': '否', 'value': 1}
                ];
                $scope.menuConfig = MenuConfig.menu;

                $scope.renderObj = {};

                $scope.searchPage = {
                    "pageSize": 10,  //页大小
                    "pageNum": 1,   //当前页码
                    "pageTotal": 1,  //页面数量
                    "pageCount": 1, //数据个数
                    "pageShow": [],
                    "params": {
                        "name": null,
                        "ticketId": null,
                        "startTime": null,
                        "endTime": null,
                        "salePc": 0,
                        "saleH5": 0
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
                        $.when(ticketCmsGetListService.sendRequest(tmpParams))
                            .done(function (result) {
                                $scope.renderObj = result;

                                //处理分页信息
                                that.pageCount = result.totalPage;
                                that.pageTotal = Math.ceil(result.totalPage / that.pageSize);

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
                    },

                    "modal": $("#editMJModal"),
                    "open": function (ticketId) {
                        this.modal.modal({});
                        $.when(ticketCmsGetDetailService.sendRequest({"id": ticketId}))
                            .done(function (result) {
                                $scope.ticketCount = result;
                                $scope.ticketCount.isPc=  $scope.ticketCount.salePc==2?true:false;
                                $scope.ticketCount.isH5=  $scope.ticketCount.saleH5==2?true:false;
                                $scope.$apply();
                            })
                            .fail(function (code, msg) {
                                alert(msg);
                            })

                    }
                };
                $scope.save = {
                    "btn": function () {

                        if (!validService.valid($scope.salesPackage)) {
                            return;
                        }
                        $scope.ticketParameter = {
                            "id": $scope.ticketCount.id,
                            "salePc":    $scope.ticketCount.isPc==true?2:1,
                            "saleH5": $scope.ticketCount.isH5==true?2:1,
                            "sort": $scope.ticketCount.sort==null?0:$scope.ticketCount.sort,
                            "mainTitle":$scope.ticketCount.mainTitle==null?'':$scope.ticketCount.mainTitle,
                            "subTitle": $scope.ticketCount.subTitle==null?'': $scope.ticketCount.subTitle,
                            "mainPicUrl": $scope.ticketCount.mainPicUrl==null?'': $scope.ticketCount.mainPicUrl,
                            "detailPicUrl": $scope.ticketCount.detailPicUrl==null?'': $scope.ticketCount.detailPicUrl

                        };
                        $.when(ticketCmsUpdateService.sendRequest(
                            {"json": angular.toJson($scope.ticketParameter)}
                            ))
                            .done(function (result) {
                                alert(result.message)
                                window.location.reload();
                            })
                            .fail(function (code, msg) {
                                alert(msg);
                            })
                    }
                };

                $scope.searchPage.search();


            }
        ]);

    });

