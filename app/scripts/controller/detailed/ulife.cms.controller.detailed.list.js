
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

        'ulife.api.cms.sku.sale.list',
        'ulife.api.cms.sku.sale.export',

        'ulife.cms.directive.datetimepicker',
        'ulife.cms.directive.datepicker',
        'ulife.cms.directive.dateformat',
        "ulife.cms.service.authority"
    ],
    function (app, services, BizConfig, MenuConfig,cmsSkuSaleExport,cmsSkuSaleList) {
        cmsSkuSaleExport.injectTo(app);
        cmsSkuSaleList.injectTo(app);

/*
        app.filter('status', function () {
            return function (val) {
                switch (val) {
                    case 1 :
                        return '是';
                    case 2 :
                        return '否';
                }
            }
        });*/
        app.controller('cmsSkuSaleListCtrl', ['$scope', '$location', '$route','cmsSkuSaleExportService','cmsSkuSaleListService',
            'authorityService',


            function($scope, $location, $route,cmsSkuSaleExportService,cmsSkuSaleListService) {


                $scope.status = [
                    {'key': '上架', 'value': 1},
                    {'key': '下架', 'value': 2}
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
                        "id":null,
                        "productCode":"",
                        "name": "",
                        "status": 1,
                        "startNumber": 0,
                        "page": 1,
                        "eachPageNumber": 20
                    },
                    "search": function() {
                        this.params.eachPageNumber = this.pageSize;
                        this.params.startNumber = 0;
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
                        $.when(cmsSkuSaleListService.sendRequest(tmpParams))
                            .done(function(result) {
                                if(result.total===0){
                                    $scope.renderObj = {
                                        "rs":{
                                            res:"没有搜索结果！"
                                        }
                                    };
                                    $scope.$apply();
                                    return;
                                }
                                if(result.message!=""){
                                    var res= JSON.parse(result.message).rs;
                                    $scope.renderObj =res;

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
                                $scope.pageCount = result.total;
                                if(typeof($scope.pageCount)=='undefined'){
                                    that.pageTotal =1;
                                }else {
                                    that.pageTotal = Math.ceil(result.total / that.pageSize);

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
                        this.id=$scope.searchPage.params.id;
                        this.productCode=$scope.searchPage.params.productCode;
                        this.name=$scope.searchPage.params.name;
                        this.status=$scope.searchPage.params.status;
                        this.userEmail=$scope.searchPage.params.userEmail;
                        $.when(cmsSkuSaleExportService.sendRequest({
                            "id":$scope.searchPage.params.id,
                            "productCode":$scope.searchPage.params.productCode,
                            "name":$scope.searchPage.params.name,
                            "status":$scope.searchPage.params.status,
                            "userEmail":$scope.searchPage.params.userEmail
                        })).done(function(result) {
                            alert(result.value+"请到邮箱查看");
                            $scope.$apply();
                        })
                            .fail(function() {
                            })
                    }
                }

            }
        ]);

    });

