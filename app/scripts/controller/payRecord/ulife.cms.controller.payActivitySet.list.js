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

        'ulife.api.cms.recharge.activity.get',
        'ulife.api.cms.recharge.amount.create',
        'ulife.api.cms.recharge.amount.edit',
        'ulife.api.cms.recharge.amount.delete',
        'ulife.api.cms.recharge.activity.create',
        'ulife.api.cms.recharge.amount.get',
        'ulife.api.cms.recharge.activity.edit',

        'ulife.cms.directive.datepicker',
        'ulife.cms.directive.tooltip',
        'ulife.cms.directive.dateformat',
        "ulife.cms.service.valid",
        "ulife.cms.service.authority"

    ],
    function (app, services, BizConfig, MenuConfig, cmsRechargeActivityGet, cmsRechargeAmountCreate, cmsRechargeAmountEdit, cmsRechargeAmountDelete, cmsRechargeActivityCreate, cmsRechargeAmountGet, cmsRechargeActivityEdit) {

        cmsRechargeActivityGet.injectTo(app);
        cmsRechargeAmountCreate.injectTo(app);
        cmsRechargeAmountEdit.injectTo(app);
        cmsRechargeAmountDelete.injectTo(app);
        cmsRechargeActivityCreate.injectTo(app);
        cmsRechargeAmountGet.injectTo(app);
        cmsRechargeActivityEdit.injectTo(app);

        app.filter('isValids', function () {
            return function (val) {
                switch (val) {
                    case 1 :
                        return '启用';
                    case 2 :
                        return '不启用';
                }
            }
        });
        app.controller('PayActivitySetCtrl', ['$scope', '$location', '$route',
            'cmsRechargeActivityGetService', 'cmsRechargeAmountCreateService', 'cmsRechargeAmountEditService', 'cmsRechargeAmountDeleteService', 'cmsRechargeActivityCreateService', 'cmsRechargeAmountGetService', 'cmsRechargeActivityEditService',
            'validService', 'authorityService',

            function ($scope, $location, $route, cmsRechargeActivityGetService, cmsRechargeAmountCreateService, cmsRechargeAmountEditService, cmsRechargeAmountDeleteService, cmsRechargeActivityCreateService, cmsRechargeAmountGetService, cmsRechargeActivityEditService, validService) {

                $scope.menuConfig = MenuConfig.menu;


                $scope.renderObj = {};

                $scope.isValids = [
                    {'key': '全部', 'value': 0},
                    {'key': '启用', 'value': 1},
                    {'key': '不启用', 'value': 2}
                ];


                $scope.searchPage = {
                    "pageSize": 10,  //页大小
                    "pageNum": 1,   //当前页码
                    "pageTotal": 1,  //页面数量
                    "pageCount": 1, //数据个数
                    "params": {
                        "amount": null,
                        "title": null,
                        "is_valid": 0,
                        "start_begin_time": null,
                        "start_end_time": null,
                        "end_begin_time": null,
                        "end_end_time": null
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
                        $.when(cmsRechargeActivityGetService.sendRequest(tmpParams))
                            .done(function (result) {
                                $scope.renderObj = result;

                                //处理分页信息
                                that.pageCount = result.count;
                                that.pageTotal = Math.ceil(result.count / that.pageSize);

                                $scope.$apply();
                            })
                            .fail(function () {
                            })
                        //充值面额获取
                        $.when(cmsRechargeAmountGetService.sendRequest())
                            .done(function (result) {
                                if (result) {
                                    $scope.btns.amounts = result.value;
                                }
                            })
                            .fail(function (code, msg) {
                                alert(msg);
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
                    "amounts": [],
                    "idAmounts": [],
                    "tem": {
                        "title": null,
                        "recharge_id": null,
                        "recharge_amount": null,
                        "promo_amount": null,
                        "start": null,
                        "end": null,
                        "promoCreater": null,
                        "promoOA": null,
                        "promoDepartment": null,
                        "financeDepartment": null,
                        "is_valid": 'false',
                        "is_app": true,
                        "is_h5": true,
                        "is_pc": true,
                        "limit":''
                    },
                    "modal": $("#addMJModal"),
                    "open": function () {
                        this.modal.modal({});
                    },
                    "save": function () {
                        if ($scope.btns.idAmounts) {
                            $scope.btns.tem.recharge_id = $scope.btns.idAmounts.id;
                            $scope.btns.tem.recharge_amount = $scope.btns.idAmounts.amount;
                        }
                        if (!validService.valid($scope.addPayActFrom)) {
                            return;
                        }

                        if (!$scope.btns.tem.is_app && !$scope.btns.tem.is_h5 && !$scope.btns.tem.is_pc) {
                            alert("必填一个终端！");
                            return;
                        }

                        if ($(":radio:checked").val()=="true") {
                            $scope.btns.tem.is_valid = true;
                        }else if($(":radio:checked").val()=="false"){
                            $scope.btns.tem.is_valid = false;
                        }

                        if ($scope.btns.tem.is_valid == null) {
                            alert("请选择是否开启！");
                            return;
                        }
                        $.when(cmsRechargeActivityCreateService.sendRequest($scope.btns.tem))
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
                    "delete": function (id) {
                        if (id > 0) {
                            var rlt = confirm("确认删除该配置吗?");
                            if (rlt != true) {
                                return;
                            }
                            $.when(cmsRechargeAmountDeleteService.sendRequest({"id": id}))
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
                    },

                    "amounts": [],
                    "idAmounts": [],
                    "tem": {
                        "id": null,
                        "title": null,
                        //"recharge_id": null,
                        //"recharge_amount": null,
                        "promoCreater": null,
                        "promoOA": null,
                        "promoDepartment": null,
                        "financeDepartment": null,
                        "promo_amount": null,
                        "start": null,
                        "end": null,
                        "is_valid": null,
                        "is_app": true,
                        "is_h5": true,
                        "is_pc": true,
                        "limit":''
                    },
                    "modal": $("#editMJModal"),
                    "open": function (id, app, h5, pc, amount, title, start, end, is_valid, promoAmount, promoCreater, promoOA, promoDepartment, financeDepartment,limit) {
                        $scope.btns1.tem.id = id;
                        $scope.btns1.tem.is_app = app == 1 ? true : false;
                        $scope.btns1.tem.is_h5 = h5 == 1 ? true : false;
                        $scope.btns1.tem.is_pc = pc == 1 ? true : false;
                        $scope.btns1.tem.amount = amount;
                        $scope.btns1.tem.promo_amount = promoAmount;
                        $scope.btns1.tem.title = title;
                        $scope.btns1.tem.start = start;
                        $scope.btns1.tem.end = end;
                        $scope.btns1.tem.is_valid= is_valid == 1 ? 'true' : 'false';
                        $scope.btns1.tem.promoCreater = promoCreater;
                        $scope.btns1.tem.promoOA = promoOA;
                        $scope.btns1.tem.promoDepartment = promoDepartment;
                        $scope.btns1.tem.financeDepartment = financeDepartment;
                        $scope.btns1.tem.limit = limit;

                        this.modal.modal({});
                    },
                    "save": function () {
                        if (!validService.valid($scope.editPayActFrom)) {
                            return;
                        }
                        if (!$scope.btns1.tem.is_app && !$scope.btns1.tem.is_h5 && !$scope.btns1.tem.is_pc) {
                            alert("必填一个终端！");
                            return;
                        }

                        $.when(cmsRechargeActivityEditService.sendRequest($scope.btns1.tem))
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

