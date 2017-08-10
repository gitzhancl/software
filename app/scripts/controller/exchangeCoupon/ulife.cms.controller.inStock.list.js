/**
 * Created by Ulife on 2016/1/22.
 */

define([
        'ulife.cms.module.myApp',
        'store',
        'ulife.framework.services',
        'ulife.cms.business.config',
        'ulife.cms.menu.config',

        'ulife.api.instore.list',
        'ulife.api.instore.update.status',

        'ulife.cms.directive.datepicker',
        'ulife.cms.directive.datetimepicker',
        'ulife.cms.directive.tooltip',
        'ulife.cms.directive.dateformat',
        "ulife.cms.service.authority",
        'ulife.cms.service.getDepartment'

    ],
    function (app, store, services, BizConfig, MenuConfig, ticketInStoreList, ticketInStoreUpdate) {

        ticketInStoreList.injectTo(app);
        ticketInStoreUpdate.injectTo(app);
        var deportmentList = store.get('setDeptList');

        app.filter('inStoreStatus', function () {
            return function (val) {
                switch (val) {
                    case 1 :
                        return '已创建';
                    case 2 :
                        return '已提交';
                    case 3 :
                        return '已入库';
                    case 0 :
                        return '已作废';
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

        app.controller('inStockListCtrl', ['$scope', '$location', '$route',
            'instoreListService',
            'instoreUpdateStatusService',
            'authorityService',
            'deportmentService',
            function ($scope, $location, $route, instoreListService, inst0reUpdateStatusService) {

                $scope.menuConfig = MenuConfig.menu;

                $scope.optionStatus = [
                    {'key': '全部', 'value': '-1'},
                    {'key': '已创建', 'value': '1'},
                    {'key': '已提交', 'value': '2'},
                    {'key': '已确认入库', 'value': '3'},
                    {'key': '已作废', 'value': '0'}
                ];

                $scope.btnStatus = {
                    '1':['修改','提交','作废','查看'],
                    '2':['入库审核','审核驳回','作废','查看'],
                    '3':['查看'],
                    '0':['查看']
                };

            
                $scope.searchPage = {
                    "pageSize": 20,  //页大小
                    "pageNum": 1,   //当前页码
                    "pageTotal": 1,  //页面数量
                    "pageCount": 1, //数据个数
                    "pageShow": [],
                    "datas":{},
                    "params": {
                        "createStart": null,
                        "createEnd": null,
                        "confirmStart": null,
                        "confirmEnd": null,
                        "inStoreNo": null,
                        "codeNo": null,
                        "codeName": null,
                        "codeId": null,
                        "codePrefix": null,
                        "status":$scope.optionStatus[0].value,
                        "page":1,
                        "rows": 20
                    },
                    "search": function() {
                        this.params.page = 1;
                        this.params.rows = this.pageSize;
                        this.getData();
                    },
                    "getData": function () {
                        var that = this;
                        that.params.page = that.pageNum;
                        var tmpParams = {};
                        _.each(this.params, function(value, key, list) {
                            if(!!value) {
                                tmpParams[key] = value;
                            }
                        });
                        //获取页面列表
                        $.when(instoreListService.sendRequest(tmpParams))
                            .done(function (result) {
                                if (result.total == 0){
                                    $scope.renderObj = {};
                                    alert("未查到相关单号信息！");
                                }else {
                                    $scope.renderObj = result.cmsInStoreList;
                                }
                                //处理分页信息
                                that.pageCount = result.count;
                                that.pageTotal = Math.ceil(result.count / that.pageSize);
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
                    "submit":function(id,status){
                        var that = this;
                        var params = {id:id,status:status};
                        if (status == 3) {
                            if (confirm("你确定通过审批?")) {
                                $.when(inst0reUpdateStatusService.sendRequest(params))
                                    .done(function (result) {
                                        if (result.result) {
                                            alert('审核通过');
                                            $scope.searchPage.getData();
                                        } else {
                                            alert(result.message);
                                        }
                                    }).fail(function (code, msg) {

                                })
                            }
                        }else if (status == 1){
                            if(confirm("你确定驳回吗?")){
                                $.when(inst0reUpdateStatusService.sendRequest(params))
                                    .done(function (result) {
                                        if (result.result) {
                                            alert('驳回成功！');
                                            $scope.searchPage.getData();
                                        } else {
                                            alert(result.message);
                                        }
                                    }).fail(function (code, msg) {
                                })
                            }
                        }else {
                            $.when(inst0reUpdateStatusService.sendRequest(params))
                                .done(function (result) {
                                    if (result.result) {
                                        $scope.searchPage.getData();
                                    } else {
                                        alert(result.message);
                                    }
                                }).fail(function (code, msg) {
                            })
                        }
                    }
                };
                $scope.searchPage.search();

            }
        ]);

    });

