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
        'ulife.api.promotion.code.getlist',
        'ulife.api.promotion.code.export',
        "ulife.cms.service.authority"
    ],
    function(app, services, BizConfig, MenuConfig, getPageList, exportCode) {

        getPageList.injectTo(app);
        exportCode.injectTo(app);

        app.filter('codeStatusType', function () {
            return function (val) {
                switch (val) {
                    case 1 :
                        return '已激活';
                    case -1 :
                        return '已失效';
                    case 0 :
                        return '已使用';
                }
            }
        });

        app.controller('PromotionCodeListCtrl', ['$scope', '$location', '$route',
            'promotionCodeGetlistService',
            'promotionCodeExportService',
            'authorityService',

            function($scope, $location, $route, promotionCodeGetlistService, promotionCodeExportService) {

                $scope.menuConfig = MenuConfig.menu;

                $scope.gotoPageEdit = function(index) {
                    $location.path('page/edit/' + index);
                }
                $scope.renderObj = {};

                $scope.codeStatus = [
                    {'key': '全部', 'deviceId': null},
                    {'key': '已激活', 'deviceId': '1'},
                    {'key': '已使用', 'deviceId':'0'},
                    {'key': '已失效', 'deviceId': '-1'}
                ];

                $scope.bindingType = [
                    {'key': '全部', 'deviceId': null},
                    {'key': '已绑定', 'deviceId': 1},
                    {'key': '未绑定', 'deviceId': 2}
                ];

                $scope.exportParams = {
                    "id": null,
                    "code": null,
                    "customer_id": null,
                    "login_name": null,
                    "status": null,
                    "isbinding": null,
                    "mailAdress": null
                }

                $scope.createActivity = {
                    "modal": $("#downloadModal"),
                    "open": function () {
                        this.modal.modal({});
                    },
                    "save": function() {
                        if($scope.exportParams.mailAdress == ""){
                            alert("请输入邮箱");
                            return;
                        }
                        this.modal.modal('hide');
                        this.export();
                        this.page = this.oriPage;
                    },
                    export: function() {
                        $.when(promotionCodeExportService.sendRequest($scope.exportParams)).done(function(result) {
                                alert(result.value+"请到邮箱查看");
                                $scope.$apply();
                            })
                            .fail(function() {
                            })
                    }
                }

                $scope.searchPage = {
                    "pageSize": 20,  //页大小
                    "pageNum": 1,   //当前页码
                    "pageTotal": 1,  //页面数量
                    "pageCount": 1, //数据个数
                    "pageShow": [],
                    "params": {
                        "page": 0,
                        "rows": 0
                    },
                    "search": function() {
                        this.params.page = this.pageNum;
                        this.params.rows = this.pageSize;
                        this.getData();
                    },
                    "getData": function() {
                        var tmpParams = {};
                        var flag = true;
                        _.each(this.params, function(value, key, list) {
                            if(!!value) {
                                tmpParams[key] = value;
                            }
                        });
                        _.each($scope.exportParams, function(value, key, list) {
                            if(!!value) {
                                tmpParams[key] = value;
                                flag = true;
                            }
                        });
                        if(!flag){
                            return;
                        }
                        var that = this;
                        //获取页面列表
                        $.when(promotionCodeGetlistService.sendRequest(tmpParams))
                            .done(function(result) {
                                $scope.renderObj = result;

                                //处理分页信息
                                that.pageCount = result.count;
                                that.pageTotal = Math.ceil(result.count / that.pageSize);

                                $scope.$apply();
                            })
                            .fail(function() {
                            })
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
                    }
                }

            }
        ]);

    });

