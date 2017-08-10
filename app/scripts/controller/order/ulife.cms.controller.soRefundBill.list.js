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

        'ulife.api.order.getRefundBillList',
        'ulife.api.order.processRefundBill',
        "ulife.api.order.cms.refund.add.bankinfo",
    
        'ulife.cms.directive.datepicker',
        'ulife.cms.directive.datetimepicker',
        'ulife.cms.directive.tooltip',
        'ulife.cms.directive.dateformat',
        "ulife.cms.service.authority"
    ],
    function (app, services, BizConfig, MenuConfig, soRefundBillList,processRefundBill,orderCmsRefundAddBankinfoService) {
        soRefundBillList.injectTo(app);
        processRefundBill.injectTo(app);
        orderCmsRefundAddBankinfoService.injectTo(app);

        app.filter('refundStatusDesc',function(){
            return function(val){
                if (val == 2) {
                    return '已成功';
                }if (val == 3) {
                    return '失败';
                }else{
                    return "";
                }
            }
        });

        app.filter('billStatusDesc',function(){
            return function(val){
                if (val == 1) {
                    return '已创建';
                }if (val == 50) {
                    return '已确认';
                }if (val == 100) {
                    return '退款中';
                }if (val == 200) {
                    return '已完成';
                }else{
                    return "";
                }
            }
        });

        app.filter('refundWayDesc',function(){
            return function(val){
                if (val == "PayWayRefund") {
                    return '原支付路径退';
                } if(val == "BACKTOBANK") {
                    return "退银行卡";
                }else{
                    return "";
                }
            }
        });

        app.controller('soRefundBillListCtrl', ['$scope', '$location', '$route', 'orderGetRefundBillListService', 'orderProcessRefundBillService', 'orderCmsRefundAddBankinfoService','authorityService',
            function ($scope, $location, $route, orderGetRefundBillListService,orderProcessRefundBillService,orderCmsRefundAddBankinfoService,authorityService) {

                $scope.menuConfig = MenuConfig.menu;
                $scope.renderObj = {};

                $scope.billStatus = [
                    {'key': '不限', 'value': null},
                    {'key': '已创建', 'value': '1'},
                    {'key': '已确认', 'value': '50'},
                    {'key': '退款中', 'value': '100'},
                    {'key': '已完成', 'value': '200'},
                ];

                $scope.refundWaySelect = [
                    {'key': '不限', 'value': 'NoLimit'},
                    {'key': '原支付路径退', 'value': 'PayWayRefund'},
                    {'key': '退银行卡', 'value': 'BACKTOBANK'}
                ];

                $scope.payChannel = [
                    {'key': '不限', 'value': null},
                    {'key': '支付宝', 'value': '支付宝'},
                    {'key': '微信', 'value': '微信'},
                    {'key': '银联在线', 'value': '银联在线'},
                    {'key': '银联支付', 'value': '银联支付'},
                    {'key': '银联电子', 'value': '银联电子'},
                    {'key': '财付通', 'value': '财付通'},
                    {'key': '翼支付', 'value': '翼支付'},
                    {'key': '壹钱包支付', 'value': '壹钱包支付'},
                    {'key': '中国建设银行', 'value': '中国建设银行'},
                    {'key': '中国农业银行', 'value': '中国农业银行'},
                    {'key': '中国招商银行', 'value': '中国招商银行'},
                    {'key': '中国平安银行', 'value': '中国平安银行'},
                    {'key': '中国民生银行', 'value': '中国民生银行'},
                    {'key': '浦发信用卡支付', 'value': '浦发信用卡支付'}
                ];

                //处理订单取消单据
                $scope.processBill = {
                    "params": {
                        "refundBankSerialNumber": ''
                    },
                    "modal": $("#processBillModal"),
                    "open": function (refundBillNo,payChannel,txSerialNumber,name,bankNo,belongToBank,bankBranch,remark) {
                        this.processNo = refundBillNo;
                        this.payChannel = payChannel;
                        this.remark = remark;
                        this.txSerialNumber = "";
                        this.name = "";
                        this.bankNo = "";
                        this.belongToBank = "";
                        this.bankBranch = "";
                        if(payChannel == "翼支付") {
                            this.txSerialNumber = txSerialNumber;
                        }
                        if(payChannel != "支付宝" && payChannel != "微信" && payChannel != "Balance" && payChannel != "翼支付") {
                            this.name = name;
                            this.bankNo = bankNo;
                            this.belongToBank = belongToBank;
                            this.bankBranch = bankBranch;
                        }
                        this.modal.modal({});
                    },
                    "processNo":"",
                    "payChannel":"",
                    "txSerialNumber":"",
                    'name':"",
                    'bankNo':"",
                    'belongToBank':"",
                    'bankBranch':"",
                    'remark':"",
                    "process": function(){
                        if(this.processNo == "")
                            return;
                        var tmpParams = {};
                        tmpParams.refundBillNo = this.processNo;
                        tmpParams.data = this.params.refundBankSerialNumber;

                        $.when(orderProcessRefundBillService.sendRequest(tmpParams))
                            .done(function (result) {
                                if(result.value){
                                    alert("退款单处理成功");
                                    $scope.searchPage.getData();
                                }else{
                                    alert("退款单处理失败，请重试！");
                                }
                            })
                            .fail(function (code, msg) {
                                alert(msg);
                            })
                        this.params.refundBankSerialNumber =  '';
                        this.modal.modal('hide');
                    }
                };
                //处理订单取消单据 end
                //添加客户银行信息 start
                $scope.bankInfo = {
                    "params": {
                        "refundBillNo":"",
                        "name": "",
                        "bankNo": "",
                        "belongToBank": "",
                        "bankBranch": "",
                        "remark":""
                    },
                    "isShow":'',
                    "modal": $("#addBankInfo"),
                    "open": function (refundBillNo,name,bankNo,belongToBank,bankBranch,remark,isShow) {
                        this.params.refundBillNo = refundBillNo;
                        this.params.name = name;
                        this.params.bankNo = bankNo;
                        this.params.belongToBank = belongToBank;
                        this.params.bankBranch = bankBranch;
                        this.params.remark = remark;
                        this.isShow = isShow;
                        this.modal.modal({});
                    },
                    "addBankInfo": function(){
                        var tmpParams = {};
                        _.each(this.params, function(value, key) {
                            if(!!value) {
                                tmpParams[key] = value;
                            }
                        });

                        $.when(orderCmsRefundAddBankinfoService.sendRequest(tmpParams))
                            .done(function (result) {
                                if(result.value){
                                    alert("银行信息添加成功");
                                    $scope.searchPage.getData();
                                }else{
                                    alert("银行信息添加失败，请重试！");
                                }
                            })
                            .fail(function (code, msg) {
                                alert(msg);
                            })
                        this.modal.modal('hide');
                        this.isShow = '';
                        this.params.refundBillNo = "";
                        this.params.name = "";
                        this.params.bankNo = "";
                        this.params.belongToBank = "";
                        this.params.bankBranch = "";
                        this.params.remark = "";
                    }
                };
                //添加客户银行信息 end

                $scope.searchPage = {
                    "pageSize": 15,  //页大小
                    "pageNum": 1,   //当前页码
                    "pageTotal": 1,  //页面数量
                    "pageCount": 1, //数据个数
                    "pageShow": [],
                    "params": {
                        "createdStartTime": new Date().setDate(new Date().getDate() - 7),
                        "createdEndTime": new Date().getTime(),
                        "refundStartTime": null,
                        "refundEndTime": null,
                        "refundBillNo": null,
                        "soNo": null,
                        "status": null,
                        "channel": null
                    },

                    "search": function () {
                        this.pageNum = 1;
                        this.rows = this.pageSize;
                        this.getData();
                    },

                    "getData": function () {
                        $scope.renderObj = null;
                        var tmpParams = {};
                        _.each(this.params, function (value, key, list) {
                            if (!!value) {
                                tmpParams[key] = value;
                            }
                        });
                        tmpParams.rows = this.pageSize;
                        tmpParams.page = this.pageNum;
                        tmpParams.condition = angular.toJson($scope.searchPage.params);
                        var that = this;
                        //获取页面列表
                        $.when(orderGetRefundBillListService.sendRequest(tmpParams))
                            .done(function (result) {
                                $scope.renderObj = result;
                                //处理分页信息
                                that.pageCount = result.count;
                                that.pageTotal = Math.ceil(result.count / that.pageSize);
                                $scope.$apply();
                            })
                            .fail(function (code, msg) {
                                alert(msg);
                            });
                    },
                    "goto": function () {
                        if (!!this.pageNum && _.isNumber(this.pageNum) && this.pageNum > 0) {
                            this.params.from = this.pageSize * (this.pageNum - 1);
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

