/**
 * Created by Ulife on 2016/1/15.
 */
/**
 * Created by Zhangke on 2015/12/15.
 */

define([
        'ulife.cms.module.myApp',
        'ulife.framework.services',
        'ulife.cms.business.config',
        'ulife.cms.menu.config',

        'ulife.api.ticket.handle.list',
        'ulife.api.cms.ticketExchangeNum.reset',
        'ulife.api.cms.updateBindingUserName',

        'ulife.cms.directive.datetimepicker',
        'ulife.cms.directive.datepicker',
        'ulife.cms.directive.dateformat',
        "ulife.cms.service.authority"
    ],
    function (app, services, BizConfig, MenuConfig, ticketHandleList, cmsTicketExchangeNumReset,cmsUpdateBindingUserName) {

        ticketHandleList.injectTo(app);
        cmsTicketExchangeNumReset.injectTo(app);
        cmsUpdateBindingUserName.injectTo(app);

        app.filter('bindingDataTime', function () {
            return function (val) {
                if(val ==""){
                    return val;
                }else{
                    return moment(val,"MMM D, YYYY h:mm:ss A").valueOf();
                }

            }
        });
        app.filter('exchange_status', function () {
            return function (val) {
                if(val ==1){
                    return "已兑换";
                }else{
                    return "未兑换";
                }

            }
        });
        //仓储状态  0 - 已生成未入库  1 - 已入库 2-已出库
        app.filter('store_status', function () {
            return function (val) {
                if(val ==0){
                    return "已创建";
                }if(val==1){
                    return "已入库";
                }if(val==2){
                    return "已出库";
                }if(val==-1){
                    return "已退库";
                }

            }
        });

        app.controller('CmsTicketCodeListCtrl', ['$scope', '$location', '$route',
            'ticketHandleListService', 'cmsTicketExchangeNumResetService','cmsUpdateBindingUserNameService',
            'authorityService',

            function ($scope, $location, $route, ticketHandleListService, cmsTicketExchangeNumResetService,cmsUpdateBindingUserNameService) {

                $scope.menuConfig = MenuConfig.menu;
                $scope.renderObj = {};


                $scope.status = [
                    {'key': '全部', 'value': ''},
                    {'key': '已绑定', 'value': '已绑定'},
                    {'key': '未绑定', 'value': '未绑定'}
                ];

                $scope.searchPage = {
                    "pageSize": 15,  //页大小
                    "pageNum": 1,   //当前页码
                    "pageTotal": 1,  //页面数量
                    "pageCount": 1, //数据个数
                    "pageShow": [],
                    "params": {
                        "actionType": "page",
                        "code": "",
                        "codeName": "",
                        "codeid": "",
                        "bandingStatus": "",
                        "customerid": "",
                        "customerName": "",
                        "startNumber": 0,
                        "page": 1,
                        "rows": 15

                    },
                    "search": function () {
                     /*   if(this.params.code=="" && this.params.codeName=="" && this.params.codeid==""
                            && this.params.bandingStatus=="" && this.params.customerid=="" &&
                            this.params.customerName==""){
                            alert("必须填写一个查询条件！");
                            return;
                        }*/
                        this.params.page = 1;
                        this.params.rows = this.pageSize;
                       this.pageNum = this.params.page;
                        this.params.startNumber = 0;
                        this.getData();
                    },
                    "getData": function () {
                        var tmpParams = {};
                        _.each(this.params, function (value, key, list) {
                            if (!!value) {
                                tmpParams[key] = value;
                            }
                        });
                        //tmpParams["status"] = 99;
                        var that = this;
                        //获取页面列表
                        $.when(ticketHandleListService.sendRequest(tmpParams))
                            .done(function (result) {
                                if (result.status == "success") {
                                    if (result.message == "") {
                                        $scope.renderObj = "";
                                    } else {
                                        $scope.renderObj = JSON.parse(result.message);

                                    }
                                } else {
                                    $scope.renderObj = "";
                                }
                                //处理分页信息
                                $scope.pageCount = result.othermsg;
                                that.pageTotal = Math.ceil(result.othermsg / that.pageSize);

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
                };
                //$scope.searchPage.search();

                $scope.reset = {
                    "modal": $("#resetModal"),
                    "open": function (id,wrong_pwd_count,code) {
                        if(wrong_pwd_count==undefined){
                            alert("该券号["+code+"]可能未绑定过用户！");
                            return;
                        }
                        $scope.resetId = id;
                        this.modal.modal({});
                    },
                    "save": function () {
                        this.modal.modal('hide');
                        $.when(cmsTicketExchangeNumResetService.sendRequest({"id": $scope.resetId})).done(function (result) {
                                alert(result.msg);
                                //window.location.reload();
                                $scope.searchPage.search();
                            })
                            .fail(function () {
                                alert("操作失败");
                            })
                    }
                };
                $scope.binding={
                    "updateCustomerId":null,
                    "updateCustomerLoginName":""
                };
                $scope.bindingUpdate = {
                    "modal": $("#bindingUpdateModal"),
                    "open": function (id,customer_id,customer_login_name,code) {
                        if(customer_id==undefined){
                            alert("该券号["+code+"]可能未绑定过用户！");
                            return;
                        }
                        $scope.bindingUpdateId = id;
                        $scope.bindingUpdateCustomerId = customer_id;
                        $scope.bindingUpdateCustomerLoginName = customer_login_name;
                        this.modal.modal({});
                    },
                    "save": function () {
                        if( $scope.binding.updateCustomerId==null&& $scope.binding.updateCustomerLoginName==""){
                            alert("客户id、客户登录名二选一填写!");
                            return;
                        }
                        this.modal.modal('hide');
                        $.when(cmsUpdateBindingUserNameService.sendRequest({"id": $scope.bindingUpdateId,
                            "customerId":  $scope.binding.updateCustomerId,"userLoginName": $scope.binding.updateCustomerLoginName})).done(function (result) {
                                alert(result.msg);
                                //window.location.reload();
                                $scope.searchPage.search();
                            })
                            .fail(function (code,msg) {
                                alert("操作失败"+code+msg);
                            })
                    }
                }

            }
        ]);

    });

