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

        'ulife.api.cms.recharge.amount.get',
        'ulife.api.cms.recharge.amount.page.get',
        'ulife.api.cms.recharge.amount.create',
        'ulife.api.cms.recharge.amount.edit',
    'ulife.api.cms.recharge.amount.delete',

        'ulife.cms.directive.datepicker',
        'ulife.cms.directive.tooltip',
        'ulife.cms.directive.dateformat',
        "ulife.cms.service.valid",
        "ulife.cms.service.authority"

    ],
    function (app, services, BizConfig, MenuConfig, cmsRechargeAmountGet, cmsRechargeAmountCreate, cmsRechargeAmountEdit,cmsRechargeAmountDelete,cmsRechargeAmountPageGet) {

        cmsRechargeAmountGet.injectTo(app);
        cmsRechargeAmountCreate.injectTo(app);
        cmsRechargeAmountEdit.injectTo(app);
        cmsRechargeAmountDelete.injectTo(app);
        cmsRechargeAmountPageGet.injectTo(app);

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
        app.controller('PaySetCtrl', ['$scope', '$location', '$route',
            'cmsRechargeAmountGetService', 'cmsRechargeAmountCreateService', 'cmsRechargeAmountEditService','cmsRechargeAmountDeleteService','cmsRechargeAmountPageGetService',
            'validService', 'authorityService',

            function ($scope, $location, $route, cmsRechargeAmountGetService, cmsRechargeAmountCreateService, cmsRechargeAmountEditService,cmsRechargeAmountDeleteService,cmsRechargeAmountPageGetService, validService) {

                $scope.menuConfig = MenuConfig.menu;


                $scope.renderObj = {};

                //$scope.groupType = [
                //    {'key': '不限', 'value': ''},
                //    {'key': '常规团', 'value': '1'},
                //    {'key': '新人团', 'value': '2'},
                //    {'key': '预售团', 'value': '3'}
                //];
                //
                //
                //$scope.payRefundStatus = [
                //    {'key': '不限', 'value': null},
                //    {'key': '已创建', 'value': 1},
                //    {'key': '已确认', 'value': 2},
                //    {'key': '已退款', 'value': 3},
                //    {'key': '已取消', 'value': 4}
                //];
                $scope.searchPage = {
                    "pageSize": 10,  //页大小
                    "pageNum": 1,   //当前页码
                    "pageTotal": 1,  //页面数量
                    "pageCount": 1, //数据个数
                    "params": {
                        //"requisition_no": null,
                        //"status": null,
                        //"create_start_time": null,
                        //"create_end_time": null,
                        //"refund_start_time": null,
                        //"refund_end_time": null
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
                        $.when(cmsRechargeAmountPageGetService.sendRequest(tmpParams))
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
                    }
                };

                $scope.btns = {

                    "tem": {
                        "amount": null,
                        "is_app": true,
                        "is_h5": true,
                        "is_pc": true
                    },
                    "modal": $("#addMJModal"),
                    "open": function () {
                        this.modal.modal({});
                    },
                    "save": function () {

                        if (!validService.valid($scope.addPayFrom)) {
                            return;
                        }
                        if (!$scope.btns.tem.is_app && !$scope.btns.tem.is_h5 && !$scope.btns.tem.is_pc) {
                            alert("必填一个终端！");
                            return;
                        }

                        $.when(cmsRechargeAmountCreateService.sendRequest($scope.btns.tem))
                            .done(function (result) {
                                if (result.value) {
                                    alert("操作成功！")
                                    window.location.reload();
                                }
                            })
                            .fail(function (code, msg) {
                                alert(msg);
                            })
                    }
                };
                $scope.btns1 = {
                    "delete":function(id){
                        if(id>0){
                            var rlt = confirm("确认删除该配置吗?")
                            if (rlt != true) {
                                return;
                            }
                        $.when(cmsRechargeAmountDeleteService.sendRequest({"id":id}))
                            .done(function (result) {
                                if (result.value) {
                                    alert("操作成功！")
                                    window.location.reload();
                                }
                            })
                            .fail(function (code, msg) {
                                alert(msg);
                            }) }
                    },

                    "tem": {
                        "id": null,
                        "amount": null,
                        "is_app": true,
                        "is_h5": true,
                        "is_pc": true
                    },
                    "modal": $("#editMJModal"),
                    "open": function (id, app, h5, pc, amount) {
                        $scope.btns1.tem.id = id;
                        $scope.btns1.tem.is_app = app == 1 ? true : false;
                        $scope.btns1.tem.is_h5 = h5 == 1 ? true : false;
                        $scope.btns1.tem.is_pc = pc == 1 ? true : false;
                        $scope.btns1.tem.amount = amount;
                        this.modal.modal({});
                    },
                    "save": function () {
                        if (!validService.valid($scope.editPayFrom)) {
                            return;
                        }
                        if (!$scope.btns1.tem.is_app && !$scope.btns1.tem.is_h5 && !$scope.btns1.tem.is_pc) {
                            alert("必填一个终端！");
                            return;
                        }

                        $.when(cmsRechargeAmountEditService.sendRequest($scope.btns1.tem))
                            .done(function (result) {
                                if (result.value) {
                                    alert("操作成功！")
                                    window.location.reload();
                                }
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

