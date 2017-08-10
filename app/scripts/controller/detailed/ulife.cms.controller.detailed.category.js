/**
 * Created by Luliangshu on 206/09/14.
 */

define([
        'ulife.cms.module.myApp',
        'ulife.framework.services',
        'ulife.cms.business.config',
        'ulife.cms.menu.config',

        'ulife.api.search.queryFrontCategory',
        'ulife.api.search.exportFrontCategory',

        'ulife.cms.directive.datetimepicker',
        'ulife.cms.directive.datepicker',
        'ulife.cms.directive.dateformat',
        "ulife.cms.service.authority"
    ],
    function (app, services, BizConfig, MenuConfig,searchQueryFrontCategory,searchExportFrontCategory) {
        searchQueryFrontCategory.injectTo(app);
        searchExportFrontCategory.injectTo(app);

        app.controller('cmsItemCategoryCtrl', ['$scope', '$location', '$route','searchQueryFrontCategoryService','searchExportFrontCategoryService',
            'authorityService',


            function($scope, $location, $route,searchQueryFrontCategoryService,searchExportFrontCategoryService) {


                $scope.status = [
                    {'key': 'PC', 'value': 1},
                    {'key': 'H5', 'value': 2},
                    {'key': '未关联H5', 'value': 3},
                    {'key': '未关联PC', 'value': 4}
                ];
                $scope.menuConfig = MenuConfig.menu;

                $scope.renderObj = {};

                $scope.searchPage = {
                    "pageSize": 20,  //页大小
                    "pageNum": 1,   //当前页码
                    "pageTotal": 1,  //页面数量
                    "pageCount": 1, //数据个数

                    "pageShow": [],
                    "params": {
                        "key" : "",
                        "terminal" : 1,
                        "rows": 20,  //页大小
                        "page": 1   //当前页码
                    },
                    "search": function() {
                        this.params.rows = this.pageSize;
                        this.params.page = 1;
                        this.getData();
                    },
                    "getData": function() {
                        var tmpParams = {};
                        _.each(this.params, function(value, key, list) {
                            if(!!value) {
                                tmpParams[key] = value;
                            }
                        });
                        var that = this;
                        //获取页面列表
                        $.when(searchQueryFrontCategoryService.sendRequest(tmpParams))
                            .done(function(result) {
                                if(result.totalCount===0){
                                    $scope.renderObj = {
                                        "rs":{
                                            res:"没有搜索结果！"
                                        }
                                    };
                                    $scope.$apply();
                                    return;
                                }

                                if(result.totalCount > 0){
                                    // var res= JSON.parse(result.message).rs;
                                    $scope.renderObj =result.result;
                                    console.log($scope.renderObj)
                                    $scope.$apply();
                                }else{
                                    $scope.renderObj = {
                                        "rs":{
                                            res:"没有搜索结果！"
                                        }
                                    };

                                    $scope.$apply();
                                }
                                //处理分页信息
                                $scope.pageCount = result.totalCount;
                                if(typeof($scope.pageCount)=='undefined'){
                                    that.pageTotal =1;
                                }else {
                                    that.pageTotal = Math.ceil(result.totalCount / that.pageSize);
                                }
                                $scope.$apply();
                            })
                            .fail(function(code,msg) {
                                alert(msg+"，重新填写查询条件！")
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
                            this.params.startNumber=Math.ceil((this.params.page-1)*this.pageSize)
                        }else{
                            this.params.page--;
                            this.params.startNumber=Math.ceil((this.params.page-1)*this.pageSize)
                        }
                        this.pageNum = this.params.page;
                        this.getData();
                    },
                    "next": function() {

                        if(Math.ceil($scope.pageCount/this.pageSize)==this.pageNum){
                            this.params.page=1;
                            this.params.startNumber=this.pageSize*(this.params.page-1)
                        }

                        if (this.pageNum == this.pageTotal) {
                            this.params.page = 1;

                        }else {
                            this.params.page++;
                            this.params.startNumber=this.pageSize*(this.params.page-1)

                        }

                        this.pageNum = this.params.page;

                        this.getData();
                    }
                }
                $scope.userEmailExport = {
                    "modal": $("#downloadModal"),
                    "open": function () {
                        this.modal.modal({});
                    },
                    "save": function() {
                        if($scope.searchPage.params.userEmail == null){
                            alert("请输入邮箱");
                            return;
                        }
                        this.modal.modal('hide');
                        this.export();
                    },
                    export: function() {
                        $.when(searchExportFrontCategoryService.sendRequest({
                                "key":$scope.searchPage.params.key,
                                "terminal":$scope.searchPage.params.terminal,
                                "userEmail":$scope.searchPage.params.userEmail
                            })).done(function(result) {
                                alert(result.value+"请到邮箱查看");
                                $scope.$apply();
                            })
                            .fail(function(errCode,errMsg) {
                                alert(errMsg)
                            })
                    }
                }

            }
        ]);

    });

