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

        'ulife.api.cms.recharge.list',
        'ulife.api.group.activity.groupCount',

        'ulife.cms.directive.datepicker',
        'ulife.cms.directive.tooltip',
        'ulife.cms.directive.dateformat',
        "ulife.cms.service.authority"

    ],
    function(app, services, BizConfig, MenuConfig, cmsRechargeList,groupCount) {

        cmsRechargeList.injectTo(app);
        groupCount.injectTo(app);

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


        app.controller('RechargeList', ['$scope', '$location', '$route',
            'cmsRechargeListService','groupActivityGroupCountService', 'authorityService',

            function($scope, $location, $route, cmsRechargeListService,groupActivityGroupCountService) {

                $scope.menuConfig = MenuConfig.menu;

                $scope.renderObj = {};


                $scope.rechargeStatus = [
                    {'key': '全部', 'value': null},
                    {'key': '待支付', 'value': 1},
                    {'key': '已支付待充值', 'value': 2},
                    {'key': '已充值', 'value': 3},
                    {'key': '充值失败', 'value': 4}
                ];

                $scope.payChannels = [
                    {'key': '全部', 'value': null},
                    {'key': '支付宝', 'value':'\"02\",\"06\",\"16\"'},
                    {'key': '微信', 'value': '\"07\",\"17\"'}
                ];
                $scope.searchPage = {
                    "pageSize": 10,  //页大小
                    "pageNum": 1,   //当前页码
                    "pageTotal": 1,  //页面数量
                    "pageCount": 1, //数据个数
                    "pageShow": [],
                    "params": {
                        "actionType": 'page',
                        "orderStartTime": null,
                        "orderEndTime": null,
                        "payStartTime": null,
                        "payEndTime": null,
                        "rechargeStartTime": null,
                        "rechargeEndTime": null,
                        "rechargeUser": null,
                        "paySerialNo": null,
                        "payAmount": null,
                        "payChannel": null,
                        "rechargeStatus": null,
                        "userEmail": null
                    },
                    //"export": function () {
                    //
                    //    //this.params.actionType ='export';
                    //    this.params.page = 1;
                    //    this.params.rows = this.pageSize;
                    //    var tmpParams = {};
                    //    _.each(this.params, function(value, key, list) {
                    //        if(!!value) {
                    //            tmpParams[key] = value;
                    //        }
                    //    });
                    //    tmpParams.actionType ='export';
                    //    tmpParams.size = this.pageSize;
                    //    tmpParams.from = (this.pageNum - 1) * this.pageSize;
                    //
                    //    var that = this;
                    //    debugger
                    //    $.when(cmsRechargeListService.sendRequest(tmpParams))
                    //        .done(function(result) {
                    //            if(result.status=="ok"){
                    //                alert("导出成功，请到邮箱查看吧！");
                    //            }
                    //        })
                    //        .fail(function (code, msg) {
                    //            alert(msg);
                    //        })
                    //},
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
                        $.when(cmsRechargeListService.sendRequest(tmpParams))
                            .done(function(result) {
                                if(result.jsonMessage!=""){
                                    $scope.renderObj =JSON.parse(result.jsonMessage);

                                    _.each( $scope.renderObj, function(value, key, list) {
                                        if(!!value) {
                                            if(value.recharge_status==1)
                                                $scope.renderObj[key].recharge_status='待支付';
                                            if(value.recharge_status==2)
                                                $scope.renderObj[key].recharge_status='已支付待充值';
                                            if(value.recharge_status==3)
                                                $scope.renderObj[key].recharge_status='已充值';
                                            if(value.recharge_status==4)
                                                $scope.renderObj[key].recharge_status='充值失败';

                                        }

                                    });
                                }else{
                                    $scope.renderObj ='';
                                }

                                //处理分页信息
                                that.pageCount = result.totalCount;
                                that.pageTotal = Math.ceil(result.totalCount / that.pageSize);

                                $scope.$apply();
                            })
                            .fail(function(code,msg) {
                                alert(msg)
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
                    },


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
                        //if ($scope.searchPage.params.skuId || $scope.searchPage.params.itemId || $scope.searchPage.params.title || $scope.searchPage.params.salesChannel || $scope.searchPage.params.productForm ||
                        //    $scope.searchPage.params.status || $scope.searchPage.params.terminal) {
                        //    this.export();
                        //} else {
                        //    alert("必须选择一个查询条件才能导出！");
                        //    return;
                        //}
                        //this.page = this.oriPage;
                    },
                    export: function () {

                        //this.params.actionType ='export';
                        $scope.searchPage.params.page = 1;
                        $scope.searchPage.params.rows = $scope.searchPage.pageSize;
                        var tmpParams = {};
                        _.each($scope.searchPage.params, function(value, key, list) {
                            if(!!value) {
                                tmpParams[key] = value;
                            }
                        });
                        tmpParams.actionType ='export';
                        //tmpParams.size = this.pageSize;
                        //tmpParams.from = (this.pageNum - 1) * this.pageSize;
                        tmpParams.userEmail =$scope.searchPage.params.userEmail;

                        var that = $scope.searchPage;
                        $.when(cmsRechargeListService.sendRequest(tmpParams))
                            .done(function(result) {
                                if(result.status=="OK"){
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

