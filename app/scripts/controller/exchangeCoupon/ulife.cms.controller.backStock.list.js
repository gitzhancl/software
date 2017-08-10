/**
 * Created by Ulife on 2016/1/22.
 */

define([
        'ulife.cms.module.myApp',
        'ulife.framework.services',
        'ulife.cms.business.config',
        'ulife.cms.menu.config',

        'ulife.api.restore.list',
        'ulife.api.restore.get',
        'ulife.api.restore.list.delete',
        'ulife.api.restore.update',
        'ulife.api.restore.confirm',
        'ulife.api.restore.audit',
        'ulife.api.cms.page.add',

        'ulife.cms.directive.datepicker',
        'ulife.cms.directive.datetimepicker',
        'ulife.cms.directive.tooltip',
        'ulife.cms.directive.dateformat',
        "ulife.cms.service.authority"

    ],
    function (app, services, BizConfig, MenuConfig, ticketCmsRestoreList, ticketCmsRestoreGet, ticketCmsRestoreDelete,ticketCmsRestoreUpdate,ticketCmsRestoreConfirm,ticketCmsRestoreAudit,addPage) {

        ticketCmsRestoreList.injectTo(app);
        ticketCmsRestoreGet.injectTo(app);
        ticketCmsRestoreDelete.injectTo(app);
        ticketCmsRestoreUpdate.injectTo(app);
        ticketCmsRestoreConfirm.injectTo(app);
        ticketCmsRestoreAudit.injectTo(app);
        addPage.injectTo(app);

        app.filter('backStatus', function () {
            return function (val) {
                switch (val) {
                    case 0 :
                        return '已创建';
                    case 1 :
                        return '已提交';
                    case 2 :
                        return '主管审核通过';
                    case 3 :
                        return '财务已审核';
                    case 4 :
                        return '已作废';
                    case 5 :
                        return ' 已销毁';
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


        app.controller('BackStockListCtrl', ['$scope', '$location', '$route',
            'restoreListService',
            'restoreGetService',
            'restoreListDeleteService',
            'restoreUpdateService',
            'restoreConfirmService',
            'restoreAuditService',
            'cmsPageAddService',
            'authorityService',

            function ($scope, $location, $route, ticketCmsRestoreListService, ticketCmsRestoreGetService, ticketCmsRestoreDeleteService,ticketCmsRestoreUpdateService,ticketCmsRestoreConfirmService,ticketCmsRestoreAuditService,cmsPageAddService,authorityService) {

                $scope.menuConfig = MenuConfig.menu;

                $scope.validStatus = [
                    {'key': '全部', 'value': '-1'},
                    {'key': '已创建', 'value': '0'},
                    {'key': '已提交', 'value': '1'},
                    {'key': '主管已审核', 'value': '2'},
                    {'key': '财务已审核作废券', 'value': '3'},
                    {'key': '已作废', 'value': '4'},
                    {'key': '已销毁', 'value': '5'},
                ];
                //$scope.validDefault=$scope.backStatus[0].value;

                $scope.btnStatus = {
                    '0':['修改','提交','查看','作废'],
                    '1':['查看','主管审核','作废'],
                    '2':['查看','财务审核','审核驳回','作废'],
                    '3':['查看','销毁'],
                    '4':['查看'],
                    '5':['查看']
                };

                $scope.searchPage = {
                    "pageSize": 20,  //页大小
                    "pageNum": 1,   //当前页码
                    "pageTotal": 1,  //页面数量
                    "pageCount": 1, //数据个数
                    "pageShow": [],
                    "params": {
                        "createBeginDate": null,
                        "createEndDate": null,
                        "auditBeginDate": null,
                        "auditEndDate": null,
                        "code": null,
                        "status": $scope.validStatus[0].value,
                        "outCode": null,
                        "page":1,
                        "rows": 20
                    },
                    "search": function() {
                        this.params.page = 1;
                        this.params.rows = this.pageSize;
                        this.getData();
                    },
                    "getData": function () {
                        //var tmpParams = {};
                        //_.each(this.params, function(value, key, list) {
                        //    // if(!!value) {
                        //    tmpParams[key] = value;
                        //    // }
                        //});

                        var that = this;
                        //获取页面列表
                        that.params.page = that.pageNum;
                        //that.params.parameter = JSON.stringify(tmpParams);
                        //alert(JSON.stringify(tmpParams));
                        $.when(ticketCmsRestoreListService.sendRequest(this.params))
                            .done(function (result) {
                                if (result.total == 0){
                                    $scope.renderObj = {};
                                    alert("未查到相关单号信息！");
                                }else {
                                    $scope.renderObj = result.restoreInfos;
                                }
                                //处理分页信息
                                that.pageCount = result.totalPage;
                                that.pageTotal = Math.ceil(result.totalPage / that.pageSize);
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
                    "submit":function(id){
                        var that = this;
                        var params = {id:id};
                        $.when(ticketCmsRestoreConfirmService.sendRequest(params))
                            .done(function (result) {
                                if (result.code){
                                    $scope.searchPage.getData();
                                }else {
                                    alert(result.msg);
                                }
                            }).fail(function(code,msg) {
                                alert(msg);
                            })
                    },
                    "audit":function(id,auditStatus,status){
                        var that = this;
                        var params = {id:id,auditStatus:auditStatus,type:status};
                        if (auditStatus == 1 && (status == 2 || status == 3)) {
                            if (confirm("你确定通过审核?")) {
                                $.when(ticketCmsRestoreAuditService.sendRequest(params))
                                    .done(function (result) {
                                        if (result.code) {
                                            alert('审核通过');
                                            $scope.searchPage.getData();
                                        } else {
                                            alert(result.msg);
                                        }
                                    }).fail(function (code, msg) {
                                    alert(msg);
                                })
                            }
                        }else if (auditStatus == -1 && status == 3){
                            if (confirm("你确定驳回吗?")) {
                                $.when(ticketCmsRestoreAuditService.sendRequest(params))
                                    .done(function (result) {
                                        if (result.code) {
                                            alert('驳回成功！');
                                            $scope.searchPage.getData();
                                        } else {
                                            alert(result.msg);
                                        }
                                    }).fail(function (code, msg) {
                                    alert(msg);
                                })
                            }
                        }else {
                            $.when(ticketCmsRestoreAuditService.sendRequest(params))
                                .done(function (result) {
                                    if (result.code) {
                                        $scope.searchPage.getData();
                                    } else {
                                        alert(result.msg);
                                    }
                                }).fail(function (code, msg) {
                                alert(msg);
                            })
                        }
                    }
                };

                $scope.searchPage.search();
            }
        ]);

    });

