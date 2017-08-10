/**
 * Created by Ulife on 2016/1/22.
 */

define([
        'ulife.cms.module.myApp',
        'ulife.framework.services',
        'ulife.cms.business.config',
        'ulife.cms.menu.config',

        'ulife.api.promotion.cms.voucherchanged.getlist',
        'ulife.api.promotion.cms.voucherchanged.export',
        'ulife.api.promotion.cms.voucherchanged.delete',
//        'ulife.api.cms.page.add',

        'ulife.cms.directive.datepicker',
        'ulife.cms.directive.datetimepicker',
        'ulife.cms.directive.tooltip',
        'ulife.cms.directive.dateformat',
        "ulife.cms.service.authority"

    ],
    function (app, services, BizConfig, MenuConfig, promotionCmsVoucherchangedGetlist, promotionCmsVoucherchangedExport, promotionCmsVoucherchangedDelete) {

//        getPageList.injectTo(app);
        promotionCmsVoucherchangedGetlist.injectTo(app);
        promotionCmsVoucherchangedExport.injectTo(app);
        promotionCmsVoucherchangedDelete.injectTo(app);
//        addPage.injectTo(app);
        app.filter('isDelete', function () {
            return function (val) {
                switch (val) {
                    case 1 :
                        return '是';
                    case 0 :
                        return '否';
                }
            }
        });
        app.controller('VoucherchangedManageCtrl', ['$scope', '$location', '$route',
            'promotionCmsVoucherchangedGetlistService',
            'promotionCmsVoucherchangedExportService',
            'promotionCmsVoucherchangedDeleteService',
            'authorityService',

            function ($scope, $location, $route, promotionCmsVoucherchangedGetlistService, promotionCmsVoucherchangedExportService, promotionCmsVoucherchangedDeleteService, cmsPageAddService) {

                $scope.menuConfig = MenuConfig.menu;

                $scope.renderObj = {};

                $('.checkAll').click(function () {
                    var that = this;
                    _.each($scope.renderObj, function (item, index) {
                        item.checked = $(that).prop("checked")
                    })
                    $scope.$apply();
                });
                $(".clientList").click(function () {

                    $('.checkAll').prop('checked', ($(".clientList").length == $(".clientList:checked").length));

                })
                $scope.searchPage = {
                    "pageSize": 20,  //页大小
                    "pageNum": 1,   //当前页码
                    "pageTotal": 1,  //页面数量
                    "pageCount": 1, //数据个数
                    "pageShow": [],
                    "params": {
                        "name": "",
                        "moblie": "",
                        "start": null,
                        "end": null,
                        "page": 1,
                        "rows": 20,
                        "userEmail": "",
                        "serialNo": "",
                        "voucherName": "",
                        "ids": "",
                        "goto":1

                    },
                    "search1": function () {
                        this.params.rows = this.pageSize;
                        if( $scope.searchPage.params.goto<=1||$scope.searchPage.params.goto>$scope.searchPage.pageTotal){
                            $scope.searchPage.params.goto=1;
                            $scope.searchPage.pageNum=1;

                        }
                        this.params.page = $scope.searchPage.params.goto;
                        $scope.searchPage.pageNum= $scope.searchPage.params.goto;
                        this.getData();
                    },
                    "search": function () {
                        this.params.rows = this.pageSize;
                        this.params.page = 1;

                        this.getData();
                    },
                    "getData": function () {
                        var tmpParams = {};
                        _.each(this.params, function (value, key, list) {
                            if (!!value) {
                                tmpParams[key] = value;
                            }
                        });
                        var that = this;

                        //获取页面列表
                        $.when(promotionCmsVoucherchangedGetlistService.sendRequest(tmpParams))
                            .done(function (result) {
                                $scope.renderObj = result.voucherChangeds;
                                //处理分页信息
                                that.pageCount = result.count;
                                if (that.pageCount == undefined) {
                                    that.pageTotal = 0;
                                } else {
                                    if ($scope.renderObj) {
                                        _.each($scope.renderObj, function (user, index) {
                                            user.checked = false;
                                        });
                                    }
                                    that.pageTotal = Math.ceil(result.count / that.pageSize);
                                    $scope.searchPage.pageNum =   $scope.searchPage.params.page;
                                }
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
                        if (this.pageNum <= 1) {
                            return;
                        }
                           /* if (this.pageNum == 1) {
                            this.params.page = this.pageTotal;
                            this.params.startNumber = Math.ceil((this.params.page - 1) * this.pageSize)
                        } else */{
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

                        if (this.pageNum >= this.pageTotal) {
                            //this.params.page = 1;
                            this.pageNum = this.pageTotal;
                            return;
                        } else {
                            this.params.page++;
                            if(this.params.page>= this.pageTotal){
                                this.params.page= this.pageTotal
                            }
                            this.params.startNumber = this.pageSize * (this.params.page - 1)

                        }

                        this.pageNum = this.params.page;

                        this.getData();
                    }
                }


                $scope.createActivity = {
                    "modal": $("#downloadModal"),
                    "open": function () {
                        this.modal.modal({});
                    },
                    "save": function () {
                        //alert($scope.searchPage.params.mailAdress)
                        if ($scope.searchPage.params.userEmail == "") {
                            alert("请输入邮箱");
                            return;
                        }
                        this.modal.modal('hide');
                        this.export();
                        this.page = this.oriPage;
                    },
                    export: function () {
                        var that = this;
                        $scope.ids1=[];
                        _.filter($scope.renderObj, function (item, index) {
                            if (item.checked != undefined && item.checked) {
                                $scope.ids1.push(item.id);
                            } else {
                                return false
                            }

                        })
                        $scope.searchPage.params.ids = $scope.ids1.join(",");
                      /*  if( $scope.searchPage.params.ids==""){
                            alert("请勾选导出的数据！")
                            return;
                        }*/
                        $.when(promotionCmsVoucherchangedExportService.sendRequest($scope.searchPage.params)).done(function (result) {
                                alert(result.message + "请到邮箱查看");
                                $scope.$apply();
                            })
                            .fail(function (code,msg) {
                                alert(msg)
                            })
                    }
                }

                $scope.btns1 = {
                    "modal": $("#delMJModal"),
                    "open": function (id) {
                        $scope.deleteId = id;

                        this.modal.modal({});
                    },
                    "save": function () {
                        $scope.ids = [];
                        if ($scope.deleteId) {
                            $scope.ids.push($scope.deleteId);
                        }

                        $scope.ids = $scope.ids.join(",");
                        $.when(promotionCmsVoucherchangedDeleteService.sendRequest({"id": $scope.ids}))
                            .done(function (result) {
                                alert(result.message);
                                window.location.reload();
                            })
                            .fail(function (code, msg) {
                                alert(msg);
                            })

                    }

                };
                $scope.searchPage.search();
            }
        ]);

    });

