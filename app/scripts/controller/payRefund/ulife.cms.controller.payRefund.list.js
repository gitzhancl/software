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

        'ulife.api.order.cms.requisition.list.get',
        'ulife.api.order.cms.requisition.show',
        'ulife.api.order.cms.requisition.create.get',
        'ulife.api.order.cms.requisition.create',
        'ulife.api.order.cms.requisition.cancel',
        'ulife.api.order.cms.requisition.confirm',
        'ulife.api.order.cms.requisition.modify.feerate',

        'ulife.cms.directive.datepicker',
        'ulife.cms.directive.tooltip',
        'ulife.cms.directive.dateformat',
        "ulife.cms.service.authority"

    ],
    function (app, services, BizConfig, MenuConfig, orderCmsRequisitionListGet, orderCmsRequisitionShow, orderCmsRequisitionCreateGet,
              orderCmsRequisitionCreate, orderCmsRequisitionCancel, orderCmsRequisitionConfirm, orderCmsRequisitionModifyFeerate) {

        orderCmsRequisitionListGet.injectTo(app);
        orderCmsRequisitionShow.injectTo(app);
        orderCmsRequisitionCreateGet.injectTo(app);
        orderCmsRequisitionCreate.injectTo(app);
        orderCmsRequisitionCancel.injectTo(app);
        orderCmsRequisitionConfirm.injectTo(app);
        orderCmsRequisitionModifyFeerate.injectTo(app);
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

        app.controller('payRefundCtrl', ['$scope', '$location', '$route',
            'orderCmsRequisitionListGetService', 'orderCmsRequisitionShowService', 'orderCmsRequisitionCreateGetService',
            'orderCmsRequisitionCreateService', 'orderCmsRequisitionCancelService', 'orderCmsRequisitionConfirmService', 'orderCmsRequisitionModifyFeerateService', 'authorityService',

            function ($scope, $location, $route, orderCmsRequisitionListGetService, orderCmsRequisitionShowService,
                      orderCmsRequisitionCreateGetService, orderCmsRequisitionCreateService, orderCmsRequisitionCancelService, orderCmsRequisitionConfirmService, orderCmsRequisitionModifyFeerateService) {

                $scope.menuConfig = MenuConfig.menu;

                $scope.gotoPageEdit = function (index) {
                    $location.path('page/edit/' + index);
                }
                $scope.renderObj = {};


                $scope.payRefundStatus = [
                    {'key': '不限', 'value': null},
                    {'key': '已创建', 'value': 1},
                    {'key': '已确认', 'value': 2},
                    {'key': '已退款', 'value': 3},
                    {'key': '已取消', 'value': 4}
                ];
                $scope.createGet = {
                    "customerLoginName": null,
                    //"giftCardInfoList":{
                    //    "number":null,
                    //    "giftcardType":null,
                    //    "denomination":null,
                    //    "balance":null,
                    //    "status":null
                    //},
                    //"sumAmount":null,
                    //"canReturnBalance":null,
                    //"feeRate":null,
                    //"returnAmount":null,
                    //"factorage":null,
                    "remarks": null
                    //"customerLoginName":null
                }
                $scope.showGet = {
                    "requisition_no": null,
                    "fee_rate": null,
                    "feeRate": null
                }
                $scope.searchPage = {
                    "pageSize": 10,  //页大小
                    "pageNum": 1,   //当前页码
                    "pageTotal": 1,  //页面数量
                    "pageCount": 1, //数据个数
                    "pageShow": [],
                    "params": {
                        "customer": null,
                        "requisition_no": null,
                        "refund_no": null,
                        "status": null,
                        "refund_start_time": null,
                        "refund_end_time": null,
                        "create_start_time": moment().add(-7, 'days').format("x"),
                        "create_end_time": moment().format("x")
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
                        $.when(orderCmsRequisitionListGetService.sendRequest(tmpParams))
                            .done(function (result) {
                                $scope.renderObj = result;

                                //处理分页信息
                                that.pageCount = result.count;
                                that.pageTotal = Math.ceil(result.count / that.pageSize);

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

                    "modal": $("#addMJModal"),
                    "open": function () {
                        this.modal.modal({});
                    },
                    "save": function () {

                        if ($scope.createGet.customerLoginName == '' || $scope.createGet.customerLoginName == null) {
                            alert("账户名不能为空！")
                            return;
                        }

                        $.when(orderCmsRequisitionCreateService.sendRequest({
                                "customer": $scope.createGet.customerLoginName,
                                "remarks": $scope.createGet.remarks
                            }))
                            .done(function (result) {
                                if (result) {
                                    alert("保存成功！")

                                    window.location.reload();
                                }
                            })
                            .fail(function (code, msg) {
                                alert(msg);
                            })
                    },
                    "getadd": function (customerLoginName) {
                        if (customerLoginName == undefined)
                            return;

                        $scope.createGet.customerLoginName = customerLoginName;
                        if ($scope.createGet.customerLoginName == null)
                            return;
                        $.when(orderCmsRequisitionCreateGetService.sendRequest({"customer": $scope.createGet.customerLoginName}))
                            .done(function (result) {
                                $scope.createGet = result;
                                $scope.$apply();
                            })
                            .fail(function (code, msg) {
                                alert(msg);
                            })
                    }
                }
                $scope.show = {

                    "modal": $("#getMJModal1"),
                    "open": function (requisition_no) {
                        $scope.showGet.requisition_no = requisition_no;
                        $.when(orderCmsRequisitionShowService.sendRequest({"requisition_no": $scope.showGet.requisition_no}))
                            .done(function (result) {
                                $scope.showGet = result;
                                $scope.$apply();
                            })
                            .fail(function (code, msg) {
                                alert(msg);
                            })
                        this.modal.modal({});
                    },
                    "show": function () {

                    }
                }

                $scope.edit = {
                    "open": function (requisition_no) {
                        $scope.showGet.requisition_no = requisition_no;
                        //$scope.$apply();
                    },
                    "cancel": function () {

                        if ($scope.showGet.requisition_no == null) {
                            alert("请选择一个要修改的单子！");
                            return;
                        }
                        var rlt = confirm("确认取消退款申请?")
                        if (rlt != true) {
                            return;
                        }
                        $.when(orderCmsRequisitionCancelService.sendRequest({"requisition_no": $scope.showGet.requisition_no}))
                            .done(function (result) {
                                if (result) {
                                    alert("操作成功！");
                                    window.location.reload();
                                }

                            })
                            .fail(function (code, msg) {
                                alert(msg)
                            })
                    },
                    "save": function () {

                        if ($scope.showGet.requisition_no == null) {
                            alert("请选择一个要修改的单子！");
                            return;
                        }
                        var rlt = confirm("确认后，将作废卡号，并生成退款单")
                        if (rlt != true) {
                            return;
                        }
                        $.when(orderCmsRequisitionConfirmService.sendRequest({"requisition_no": $scope.showGet.requisition_no}))
                            .done(function (result) {
                                if (result) {
                                    alert("操作成功！");
                                    window.location.reload();
                                }

                            })
                            .fail(function (code, msg) {
                                alert(msg)
                            })
                    },
                    "modal": $("#editMJModal1"),
                    "open1": function () {

                        if ($scope.showGet.requisition_no == null) {
                            alert("请选择一个要修改的单子！");
                            return;
                        }
                        var requisition_no = $scope.showGet.requisition_no;
                        $.when(orderCmsRequisitionShowService.sendRequest({"requisition_no": $scope.showGet.requisition_no}))
                            .done(function (result) {
                                $scope.showGet = result;
                                $scope.showGet.requisition_no = requisition_no;
                                $scope.$apply();
                            })
                            .fail(function (code, msg) {
                                alert(msg);
                            })
                        this.modal.modal({});
                    },
                    "rate": function () {

                       var fag =/^-?\d+\.?\d{0,2}$/.test($scope.showGet.feeRate)
                        if (!fag) {
                            alert("请输入数字，最多保留两位小数!");
                            return;
                        }

                        if ($scope.showGet.feeRate == 0) {
                            alert("费率不能为0！")
                            return;
                        }
                        if ($scope.showGet.requisition_no == null) {
                            alert("请选择一个要修改的单子！")
                            return;
                        }

                        $.when(orderCmsRequisitionModifyFeerateService.sendRequest({
                                "requisition_no": $scope.showGet.requisition_no,
                                "fee_rate": $scope.showGet.feeRate,
                                "remarks": $scope.showGet.remarks
                            }))
                            .done(function (result) {
                                if (result) {
                                    alert("操作成功！")
                                }
                                window.location.reload();
                            })
                            .fail(function (code, msg) {
                                alert(msg);
                            })
                    }
                }
                $scope.rateEdit = function () {
                    if ($scope.showGet.feeRate == 0) {
                        alert("费率不能为0！")
                        return;
                    }
                    $scope.showGet.factorage = $scope.showGet.canReturnBalance * ($scope.showGet.feeRate / 100);
                    $scope.showGet.returnAmount = $scope.showGet.canReturnBalance - $scope.showGet.factorage;
                    //$scope.$apply();

                };

                $scope.searchPage.search();


            }
        ]);

    });

