/**
 * Created by Ulife on 2016/3/22.
 * @author zhanchanglei
 * @date 2016-03-22（星期二 - -！）
 */

define([
        'ulife.cms.module.myApp',
        'ulife.framework.services',
        'ulife.cms.business.config',
        'ulife.cms.menu.config',

        'ulife.api.order.cms.socancelbill',
        'ulife.api.order.processSoCancelBill',

        'ulife.cms.directive.datepicker',
        'ulife.cms.directive.datetimepicker',
        'ulife.cms.directive.tooltip',
        'ulife.cms.directive.dateformat',
        "ulife.cms.service.authority"

    ],
    function (app, services, BizConfig, MenuConfig, cmsBillList,soCancelBillProcess) {
        cmsBillList.injectTo(app);
        soCancelBillProcess.injectTo(app);

        app.filter('billStatus', function () {
            return function (val) {
                switch (val) {
                    case 1 :
                        return '已创建';
                    case 100 :
                        return '处理中';
                    case 200 :
                        return '已完成';
                }
            }
        });

        app.filter('cancelType', function () {
            return function (val) {
                if (val == 'CANCEL') {
                    return '取消';
                } else
                    return '拒收';
            }
        });
        app.filter('operationTypeValue', function () {
            return function (val) {
                switch (val) {
                    case 1:
                        return '取消';
                    case 2:
                        return '拒收';
                }
            }
        });
        app.filter('isNeedRefundValue', function () {
            return function (val) {
                switch (val) {
                    case 0:
                        return '否';
                    case 1:
                        return '是';
                }
            }
        });
        app.filter('payStatusValue', function () {
            return function (val) {
                switch (val) {
                    case 1:
                        return '等待支付';
                    case 2:
                        return '部分支付';
                    case 3:
                        return '支付完成';
                }
            }
        });
        app.filter('orderStatusValue',function(){
            return function(val){
                switch (val){
                    case 1:
                        return '已创建';
                    case 2:
                        return '已确认';
                    case 3:
                        return '已拆单';
                    case 4:
                        return '已同步到OM';
                    case 5:
                        return '配送中';
                    case 6:
                        return '客户拒收';
                    case 7:
                        return '已取消';
                    case 8:
                        return '部分取消';
                    case 9:
                        return '已挂起';
                    case 10:
                        return '已完成';
                }
            }
        });

        app.controller('cmsBillList', ['$scope', '$location', '$route', 'orderCmsSocancelbillService','orderProcessSoCancelBillService','authorityService',

            function ($scope, $location, $route, orderCmsSocancelbillService,orderProcessSoCancelBillService) {

                $scope.menuConfig = MenuConfig.menu;

                $scope.gotoPageEdit = function (index) {
                    $location.path('page/edit/' + index);
                }
                $scope.renderObj = {};

                $scope.billStatus = [
                    {'key': '不限', 'value': null},
                    {'key': '已创建', 'value': '1'},
                    {'key': '处理中', 'value': '100'},
                    {'key': '已完成', 'value': '200'}
                ];
                $scope.cancelType = [
                    {'key': '不限', 'value': null},
                    {'key': '取消', 'value': 'CANCEL'},
                    {'key': '拒收', 'value': 'REFUSED'}
                ];

                //处理订单取消单据

                $scope.processBill = {
                    "modal": $("#processBillModal"),
                    "open": function (cancelBillNo) {
                        this.processNo = cancelBillNo;
                        this.modal.modal({});
                    },
                    "processNo":null,
                    "process": function(){
                        if(this.processNo == "")
                        return;
                        this.modal.modal('hide');
                        $.when(orderProcessSoCancelBillService.sendRequest({"cancelBillNo": this.processNo}))
                            .done(function (result) {
                                if(result.value){
                                    alert("订单取消单据处理成功");
                                    $scope.searchPage.getData();
                                }else{
                                    alert("订单取消单据处理失败，请重试！");
                                }
                            })
                            .fail(function (code, msg) {
                                alert(msg);
                            })
                    }
                };
                //处理订单取消单据 end


                $scope.searchPage = {
                    "pageSize": 15,  //页大小
                    "pageNum": 1,   //当前页码
                    "pageTotal": 1,  //页面数量
                    "pageCount": 1, //数据个数
                    "pageShow": [],
                    "params": {
                        "startTime": new Date().setDate(new Date().getDate() - 7),
                        "endTime": new Date().getTime(),
                        "cancelBillNo": null,
                        "soNo": null,
                        "status":null,
                        "cancelType":null
                    },

                    "search": function () {

                        this.pageNum = 1;
                        this.rows = this.pageSize;
                        this.getData();
                    },

                    "getData": function () {
                        var tmpParams = {};

                        _.each(this.params, function (value, key, list) {
                            if (!!value) {
                                tmpParams[key] = value;
                            }

                        });

                        tmpParams.rows = this.pageSize;
                        tmpParams.page = this.pageNum;
                        tmpParams.query = angular.toJson($scope.searchPage.params);

                        var that = this;
                        //获取页面列表
                        $.when(orderCmsSocancelbillService.sendRequest(tmpParams))
                            .done(function (result) {
                                $scope.renderObj = result;
                                //处理分页信息
                                that.pageCount = result.total;
                                that.pageTotal = Math.ceil(result.total / that.pageSize);

                                $scope.$apply();
                            })
                            .fail(function (code, msg) {
                                alert(msg);
                            });
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
                            this.pageNum = this.pageTotal;
                        } else {
                            this.pageNum--;
                        }
                        this.getData();
                    },
                    "next": function () {
                        if (this.pageNum == this.pageTotal) {
                            this.pageNum = 1;
                        } else {
                            this.pageNum++;
                        }
                        this.getData();
                    }
                };

                $scope.searchPage.search();
            }

        ]);

    });

