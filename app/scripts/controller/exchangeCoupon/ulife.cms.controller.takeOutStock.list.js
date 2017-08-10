
/**
 * Created by Ulife on 2016/11/29.
 *
 * Created by Yu on 2016/11/29.
 */

define([
        'ulife.cms.module.myApp',
        'store',
        'ulife.framework.services',
        'ulife.cms.business.config',
        'ulife.cms.menu.config',

        'ulife.api.role.dept.list',
        'ulife.api.cms.ticket.outstore.list',
        'ulife.api.cms.ticket.outstore.submit',
        'ulife.api.cms.ticket.outstore.receipt',
        'ulife.api.cms.ticket.outstore.disuse',
        'ulife.api.cms.ticket.outstore.aduit',
        'ulife.api.cms.ticket.outstore.confirm',
        'ulife.api.cms.ticket.outstore.confirm.reject',
        'ulife.api.cms.ticket.outstore.reject',
        'ulife.api.cms.ticket.outstore.submitcodes',

        'ulife.cms.directive.datetimepicker',
        'ulife.cms.directive.datepicker',
        'ulife.cms.directive.dateformat',
        "ulife.cms.service.authority",
        'ulife.cms.service.getDepartment'
    ],
    function(app,store, services, BizConfig, MenuConfig, DeportmentList,outStockList,outStoreSubmit,outStoreReceipt,outStoreDisuse,
             outStoreAudit,outStoreConfirm,outStoreConfirmReject,outStoreReject,outStoreSubmitCode) {

        DeportmentList.injectTo(app);
        outStockList.injectTo(app);
        outStoreSubmit.injectTo(app);
        outStoreReceipt.injectTo(app);
        outStoreDisuse.injectTo(app);
        outStoreAudit.injectTo(app);
        outStoreConfirm.injectTo(app);
        outStoreConfirmReject.injectTo(app);
        outStoreReject.injectTo(app);
        outStoreSubmitCode.injectTo(app);

        var deportmentList = store.get('setDeptList');

        app.filter('takeStatus', function () {
            return function (val) {
                switch (val) {
                    case 1 :
                        return '已创建';
                    case 2 :
                        return '已提交';
                    case 3 :
                        return '主管审核通过';
                    case 4 :
                        return '出库待确认';
                    case 5 :
                        return '已出库';
                    case 6 :
                        return ' 已签收';
                    case -1:
                        return ' 已作废';
                    default :
                        return val;
                }
            }
        });

        app.filter('show', function () {
            return function (val) {
                if (val == 0){
                    return null;
                }else {
                    return val;
                }
            }
        });

        app.filter('exchangedept', function () {
            return   function(val) {
                //  returns val
                return deportmentList[val];

            }
        });

        app.directive('ulifeBtnSt', ['$rootScope', function($rootScope) {
            return {
                restrict: 'A',
                scope: true,
                compile: function(tElement, tAttrs, transclude) {
                    return {
                        pre: function preLink(scope, iElement, iAttr, controller) {
                        },
                        post: function postLink(scope, iElement, iAttr, controller) {
                            var item = iAttr.ulifeBtnSt;
                            var title = iAttr.title;
                            var isShow = false;
                            _.each(scope.btnStatus[item],function(st){
                                if(st == title){
                                    isShow = true;
                                }
                            });
                            if (isShow) {
                                //iElement.removeClass("hide")
                            } else {
                                //debugger;
                                iElement.addClass("hide")
                            }                    
                        }
                    }
                }   
            };
        }]);

        app.controller('takeOutStockListCtrl', ['$scope', '$location', '$route',
            'roleDeptListService',
            'cmsTicketOutstoreListService',
            'cmsTicketOutstoreSubmitService',
            'cmsTicketOutstoreReceiptService',
            'cmsTicketOutstoreDisuseService',
            'cmsTicketOutstoreAduitService',
            'cmsTicketOutstoreConfirmService',
            'cmsTicketOutstoreConfirmRejectService',
            'cmsTicketOutstoreRejectService',
            'cmsTicketOutstoreSubmitcodesService',
            'deportmentService',
            'authorityService',
            function($scope, $location, $route, roleDeptListService,outStockListService,OutStoreSubmitService,OutStoreReceiptService,
                     OutStoreDisuseService,OutStoreAuditService,OutStoreConfirmService,OutStoreConfirmRejectService,OutStoreRejectService,OutStoreSubmitCodesService) {

                $scope.menuConfig = MenuConfig.menu;
                $scope.purpose = [
                    {'key': '全部', 'value': ''},
                    {'key': '销售', 'value': '销售'},
                    {'key': '客情', 'value': '客情'},
                    {'key': '样品', 'value': '样品'}
                ];
                
                $scope.checkState = [
                    {'key': '全部', 'value': '-99'},
                    {'key': '已创建', 'value': '1'},
                    {'key': '已提交', 'value': '2'},
                    {'key': '主管审核通过', 'value': '3'},
                    {'key': '出库待确认', 'value': '4'},
                    {'key': '已出库', 'value': '5'},
                    {'key': '已签收', 'value': '6'},
                    {'key': '已作废', 'value': '-1'},
                ];

                $scope.btnStatus = {
                    '1':['修改','提交','作废'],
                    '2':['主管审核','作废'],
                    '3':['作废','出库/出库修改','出库提交'],
                    '4':['出库审核通过','出库审核驳回','作废','查看出库明细'],
                    '5':['查看出库明细','签收'],
                    '6':['查看出库明细'],
                    '7':['']
                };

                setTimeout(function() {
                    //$scope.departmentId = $scope.deptType[0].id;
                    $scope.$apply();           
                }, 1000);
                //定义部门列表
                $scope.deptType = [];

                $scope.searchPage = {
                    "pageSize": 20,  //页大小
                    "pageNum": 1,   //当前页码
                    "pageTotal": 1,  //页面数量
                    "pageCount": 1, //数据个数
                    "pageShow": [],
                    "datas":{},
                    "params": {
                        "createTimeBegin": null,
                        "createTimeEnd": null,
                        "confirmTimeBegin": null,
                        "confirmTimeEnd": null,
                        "ticketName": null,
                        "status": null,
                        "ticketId":null,
                        "departmentId": null,
                        "demandMan":null,
                        "purpose":null
                    },
                    "search": function() {
                        this.pageNum = 1;
                        this.datas.rows = this.pageSize;
                        this.params.departmentId = $scope.departmentId;
                        this.getData();
                    },
                    "getData": function () {
                        var tmpParams = {};
                        _.each(this.params, function(value, key, list) {
                            if(!!value) {
                                tmpParams[key] = value;
                            }
                        });

                        var that = this;
                        //获取页面列表
                        that.datas.page = that.pageNum;
                        that.datas.query = JSON.stringify(tmpParams);

                        $.when(outStockListService.sendRequest(this.datas))
                            .done(function (result) {
                                if (result.total == 0){
                                    $scope.renderObj = {};
                                    alert("未查到相关单号信息！");
                                }else {
                                    $scope.renderObj = result.outStoreInfos;
                                }
                                //处理分页信息
                                that.pageCount = result.total;
                                that.pageTotal = Math.ceil(result.total / that.pageSize);
                                $scope.$apply();
                            })
                    },
                    "goto": function (pageNum) {
                        this.pageNum = pageNum;
                        if (!!pageNum && _.isNumber(pageNum) && pageNum > 0) {
                            this.params.from = this.pageSize * (pageNum - 1);
                        }
                        this.getData()

                    },
                    "pre": function() {
                        if (this.pageNum == 1) {
                            this.pageNum = 1;
                        }else{
                            this.pageNum--;
                        }
                        this.getData();
                    },
                    "next": function() {
                        if (this.pageNum == this.pageTotal) {
                            this.pageNum = this.pageTotal;
                        }else {
                            this.pageNum++;
                        }
                        this.getData();
                    }
                }

                $scope.btns = {
                    "submit":function(id,version){
                        var that = this;
                        var params = {id:id,version:version};
                        $.when(OutStoreSubmitService.sendRequest(params))
                            .done(function (result) {
                                if (result.result){
                                    $scope.searchPage.getData();
                                }else {
                                    alert(result.message);
                                }
                            })
                    },
                    "manageAudit":function(id,version){
                        var that = this;
                        var params = {id:id,version:version};
                        if(confirm("你确定通过审核?")) {
                            $.when(OutStoreAuditService.sendRequest(params))
                                .done(function (result) {
                                    if (result.result) {
                                        alert('审核通过');
                                        $scope.searchPage.getData();
                                    } else {
                                        alert(result.message);
                                    }
                                })
                        }
                    },
                    "manageReject":function(id,version){
                        var that = this;
                        var params = {id:id,version:version};
                        if(confirm("你确定驳回吗?")) {
                            $.when(OutStoreRejectService.sendRequest(params))
                                .done(function (result) {
                                    if (result.result) {
                                        alert('驳回成功！');
                                        $scope.searchPage.getData();
                                    } else {
                                        alert(result.message);
                                    }
                                })
                        }
                    },
                    "outStoreSubmit":function(id,version){
                        var that = this;
                        var params = {id:id,version:version};
                        $.when(OutStoreSubmitCodesService.sendRequest(params))
                            .done(function (result) {
                                if (result.result){
                                    $scope.searchPage.getData();
                                }else {
                                    alert(result.message);
                                }
                            })
                    },
                    "outStoreConfirm":function(id,version){
                        var that = this;
                        var params = {id:id,version:version};
                        if(confirm("你确定通过审核?")) {
                            $.when(OutStoreConfirmService.sendRequest(params))
                                .done(function (result) {
                                    if (result.result) {
                                        alert('审核通过');
                                        $scope.searchPage.getData();
                                    } else {
                                        alert(result.message);
                                    }
                                })
                        }
                    },
                    "outStoreConfirmReject":function(id,version){
                        var that = this;
                        var params = {id:id,version:version};
                        if(confirm("你确定驳回吗?")) {
                            $.when(OutStoreConfirmRejectService.sendRequest(params))
                                .done(function (result) {
                                    if (result.result) {
                                        alert('驳回成功！');
                                        $scope.searchPage.getData();
                                    } else {
                                        alert(result.message);
                                    }
                                })
                        }
                    },
                    "outStoreReceipt":function(id,version){
                        var that = this;
                        var params = {id:id,version:version};
                        $.when(OutStoreReceiptService.sendRequest(params))
                            .done(function (result) {
                                if (result.result){
                                    $scope.searchPage.getData();
                                }else {
                                    alert(result.message);
                                }
                            })
                    },

                    "outStoreDisuse":function(id,version){
                        var that = this;
                        var params = {id:id,version:version};
                        $.when(OutStoreDisuseService.sendRequest(params))
                            .done(function (result) {
                                if (result.result){
                                    $scope.searchPage.getData();
                                }else {
                                    alert(result.message);
                                }
                            })
                    }
                };
                $scope.searchPage.search();



            }
        ]);

    });

