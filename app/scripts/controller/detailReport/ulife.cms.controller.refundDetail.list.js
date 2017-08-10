/**
 * Created by Ulife on 2016/1/22.
 * @author zhangke
 * @date 2016-03-06（星期日 - -！）
 */

define([
        'ulife.cms.module.myApp',
        'ulife.framework.services',
        'ulife.cms.business.config',
        'ulife.cms.menu.config',

        'ulife.api.order.cms.requisition.detail.get',
        'ulife.api.order.cms.requisition.detail.export',

        'ulife.cms.directive.datepicker',
        'ulife.cms.directive.tooltip',
        'ulife.cms.directive.dateformat',
        "ulife.cms.service.authority"

    ],
    function(app, services, BizConfig, MenuConfig, orderCmsRequisitionDetailGet,orderCmsRequisitionDetailExport) {

        orderCmsRequisitionDetailGet.injectTo(app);
        orderCmsRequisitionDetailExport.injectTo(app);

        app.filter('payRefundStatus', function () {
            return function (val) {
                switch (val) {
                    case 1 :
                        return '已创建';
                    case 2 :
                        return '已确认';
                    case 3 :
                        return '已退款';
                    case 4 :
                        return '已取消';
                }
            }
        });
        app.controller('RefundDetailCtrl', ['$scope', '$location', '$route',
            'orderCmsRequisitionDetailGetService', 'orderCmsRequisitionDetailExportService','authorityService',

            function($scope, $location, $route, orderCmsRequisitionDetailGetService,orderCmsRequisitionDetailExportService) {

                $scope.menuConfig = MenuConfig.menu;


                $scope.renderObj = {};


                $scope.payRefundStatus = [
                    {'key': '不限', 'value': null},
                    {'key': '已创建', 'value': 1},
                    {'key': '已确认', 'value': 2},
                    {'key': '已退款', 'value': 3},
                    {'key': '已取消', 'value': 4}
                ];
                $scope.searchPage = {
                    "pageSize": 10,  //页大小
                    "pageNum": 1,   //当前页码
                    "pageTotal": 1,  //页面数量
                    "pageCount": 1, //数据个数
                    "params": {
                        "requisition_no": null,
                        "status": null,
                        "create_start_time": null,
                        "create_end_time": null,
                        "refund_start_time": null,
                        "userEmail": null,
                        "refund_end_time": null
                    },
                    "search": function() {
                        this.params.page = 1;
                        this.params.rows = this.pageSize;
                        this.getData();
                    },
                    "getData": function() {
                        var tmpParams = {};
                        _.each(this.params, function(value, key, list) {
                            if(!!value) {
                                tmpParams[key] = value;
                            }
                        });
                        tmpParams.size = this.pageSize;
                        tmpParams.from = (this.pageNum - 1) * this.pageSize;


                        var that = this;
                        //获取页面列表
                        $.when(orderCmsRequisitionDetailGetService.sendRequest(tmpParams))
                            .done(function(result) {
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
                        _.each($scope.searchPage.params, function(value, key, list) {
                            if(!!value) {
                                tmpParams[key] = value;
                            }
                        });
                        tmpParams.actionType ='export';
                        tmpParams.userEmail =$scope.searchPage.params.userEmail;

                        var that = $scope.searchPage;
                        $.when(orderCmsRequisitionDetailExportService.sendRequest(tmpParams))
                            .done(function(result) {
                                    alert(result.value);
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

