/**
 * Created by Ulife on 2016/1/22.
 */

define([
        'ulife.cms.module.myApp',
        'store',
        'ulife.framework.services',
        'ulife.cms.business.config',
        'ulife.cms.menu.config',

        'ulife.api.ticket.getCodeList',
        'ulife.api.ticket.exportCode',
        'ulife.api.ticket.updateStatus',
        'ulife.api.ticket.createTickeCode',
//        'ulife.api.cms.page.add',

        'ulife.cms.directive.datepicker',
        'ulife.cms.directive.datetimepicker',
        'ulife.cms.directive.tooltip',
        'ulife.cms.directive.dateformat',
        'ulife.cms.service.getDepartment',
        "ulife.cms.service.authority"
        

    ],
    function (app,store, services, BizConfig, MenuConfig, ticketCodeList, ticketCodeExport, ticketUpdateStatus,ticketCreateCode) {

        ticketCodeList.injectTo(app);
        ticketCodeExport.injectTo(app);
        ticketUpdateStatus.injectTo(app);
        ticketCreateCode.injectTo(app);

    
        app.controller('BulidTicketCodeCtrl', ['$scope', '$location', '$route',
            'ticketGetCodeListService',
            'ticketExportCodeService',
            'ticketUpdateStatusService',
            'ticketCreateTickeCodeService',
            'deportmentService',
            'authorityService',

            function ($scope, $location, $route, ticketGetCodeListService, ticketExportCodeService, ticketUpdateStatusService,ticketCreateCodeService) {

                $scope.menuConfig = MenuConfig.menu;

                $scope.renderObj = {};

                $scope.itemStatus = [
                    {'key': '全部', 'value': '0'},
                    {'key': '已创建', 'value': '1'},
                    {'key': '已提交', 'value': '2'},
                    {'key': '主管已审核', 'value': '7'},
                    {'key': '主管已驳回', 'value': '4'},
                    {'key': '已生成券号', 'value': '5'},
                    {'key': '已作废', 'value': '6'},
                    {'key': '财务已审核', 'value': '3'},
                    {'key': '财务已驳回', 'value': '8'},
                ];

                $scope.btnStatus = {
                    '1': ['修改', '提交', '作废'],
                    '2': ['主管通过', '主管驳回', '作废'],
                    '3': ['导出券号密码', '查看券号'],
                    '4': ['修改', '提交', '作废'],
                    '5': ['导出券号密码', '查看券号'],
                    '6': [''],
                    '7': ['财务通过/生成券号','财务驳回', '作废'],
                    '8': ['修改', '提交', '作废']
                }
                //$scope.itemDefault=$scope.itemStatus[0].value;

                $scope.searchPage = {
                    "pageSize": 20,  //页大小
                    "pageNum": 1,   //当前页码
                    "pageTotal": 1,  //页面数量
                    "pageCount": 1, //数据个数
                    "pageShow": [],
                    "exportParam":{},
                    "params": {
                        "createTime": null,
                        "endTime": null,
                        "codeCreateTime": null,
                        "codeEndTime": null,
                        "startNumber": 0,
                        "eachPageNumber": 20,
                        "code": "",
                        "ticketId": null,
                        "status": 0,
                        "ticketName": "",
                        "userEmail": "",
                        "goto": 1
                    },
                    "search": function () {
                        this.params.eachPageNumber = this.pageSize;
                        this.params.startNumber = 0;
                        this.getData();
                    },
                    "getData": function () {
                        var that = this;
                        $.when(ticketGetCodeListService.sendRequest({codeQueryRequest: JSON.stringify(that.params)}))
                            .done(function (result) {
                                if (result.total == 0) {
                                    $scope.renderObj = {};
                                    alert("未查到相关单号信息！");
                                } else {
                                    $scope.renderObj = JSON.parse(result.message).rs;
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
                    "pre": function () {
                        if (this.pageNum == 1) {
                            this.pageNum = 1;
                            this.params.startNumber = (this.pageNum - 1) * this.params.eachPageNumber;
                        } else {
                            this.pageNum--;
                            this.params.startNumber = (this.pageNum - 1) * this.params.eachPageNumber;
                        }
                        this.getData();
                    },
                    "next": function () {
                        if (this.pageNum == this.pageTotal) {
                            this.pageNum = this.pageTotal;
                            this.params.startNumber = (this.pageNum - 1) * this.params.eachPageNumber;
                        } else {
                            this.pageNum++;
                            this.params.startNumber = (this.pageNum - 1) * this.params.eachPageNumber;
                        }
                        this.getData();
                    }
                }

                $scope.btns = {
                    "submit":function(id,status){
                        var that = this;
                        var params = {id:id,status:status};
                        if (status == 4) {
                            if (confirm("你确定驳回吗?")) {
                                $.when(ticketUpdateStatusService.sendRequest({codeFlowRequest: JSON.stringify(params)}))
                                    .done(function (result) {
                                        if (result.result) {
                                            alert('驳回成功！');
                                            $scope.searchPage.getData();
                                        }else{
                                            alert(result.message);
                                        }
                                    })
                            }
                        }else if (status == 7) {
                            if(confirm("你确定通过审核?")) {
                                $.when(ticketUpdateStatusService.sendRequest({codeFlowRequest: JSON.stringify(params)}))
                                    .done(function (result) {
                                        if (result.result) {
                                            alert('审核通过！');
                                            $scope.searchPage.getData();
                                        }else{
                                            alert(result.message);
                                        }
                                    })
                            }
                        }else {
                            $.when(ticketUpdateStatusService.sendRequest({codeFlowRequest: JSON.stringify(params)}))
                                .done(function (result) {
                                    if (result) {
                                        $scope.searchPage.getData();
                                    }
                                })
                        }
                    },
                    "createCode":function(id,ticketId){
                        var that = this;
                        var params = {id:id,ticketId:ticketId};
                        if(confirm("你确定通过审核?")) {
                            $.when(ticketCreateCodeService.sendRequest({codeFlowRequest: JSON.stringify(params)}))
                                .done(function (result) {
                                    if (result.result) {
                                        alert('审核通过');
                                        $scope.searchPage.getData();
                                    }else{
                                        alert(result.message);
                                    }
                                })
                        }
                    }
                };

                $scope.createActivity = {
                    "modal": $("#downloadModal"),
                    "open": function (id) {
                        this.modal.modal({});
                        $scope.searchPage.exportParam.id = id;
                    },
                    "save": function() {
                        if($scope.searchPage.exportParam.userEmail == ""){
                            alert("请输入邮箱");
                            return;
                        }
                        this.modal.modal('hide');
                        this.export();
                        this.page = this.oriPage;
                    },
                    export: function() {
                        $.when(ticketExportCodeService.sendRequest($scope.searchPage.exportParam)).done(function(result) {
                                alert(result.value+"请到邮箱查看");
                                $scope.$apply();
                            })
                            .fail(function() {
                            })
                    }
                }
                $scope.searchPage.search();
            }
        ]);

        var deportmentList = store.get('setDeptList');
        app.filter('bulidStatus', function () {
            return function (val) {
                switch (val) {
                    case 0 :
                        return '全部';
                    case 1 :
                        return '已创建';
                    case 2 :
                        return '已提交';
                    case 3 :
                        return '财务已审核';
                    case 4 :
                        return '主管已驳回';
                    case 5 :
                        return '已生成劵号';
                    case 6 :
                        return '已作废';
                    case 7 :
                        return '主管已审核';
                    case 8 :
                        return '财务已驳回';
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
                            //debugger;
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

    });

