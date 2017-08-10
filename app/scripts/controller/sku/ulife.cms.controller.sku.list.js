/**
 * Created by Ulife on 2016/3/22.
 * @author zhanchanglei
 * @date 2016-03-22（星期二 - -！）
 */

define([
        'ulife.cms.module.myApp',
        'ulife.framework.services',
        'ulife.cms.business.config',
        'ulife.cms.menu.config',

        'ulife.api.cms.sku.setstate',
        'ulife.api.cms.sku.list',
        'ulife.api.cms.sku.virtual.mapper.get',
        'ulife.api.cms.sku.virtual.mapper.edit',

        'ulife.cms.directive.datepicker',
        'ulife.cms.directive.tooltip',
        'ulife.cms.directive.dateformat',
        "ulife.cms.service.valid",
        "ulife.cms.service.authority"

    ],
    function (app, services, BizConfig, MenuConfig, cmsSkuList, cmsSkuSetstate, cmsSkuVirtualMapperGet, cmsSkuVirtualMapperEdit) {
        cmsSkuSetstate.injectTo(app);
        cmsSkuList.injectTo(app);
        cmsSkuVirtualMapperGet.injectTo(app);
        cmsSkuVirtualMapperEdit.injectTo(app);

        app.filter('skuStatus', function () {
            return function (val) {
                switch (val) {
                    case 0 :
                        return '新品';
                    case 1 :
                        return '接收';
                    case 2 :
                        return '不可售';
                }
            }
        });
        app.filter('skuSombination', function () {
            return function (val) {
                switch (val) {
                    case 0 :
                        return '否';
                    case 1 :
                        return '是';
                    default :
                        return '否';
                }
            }
        });

        app.filter('virtualType', function () {
            return function (val) {
                switch (val) {
                    case true :
                        return '是';
                    case false :
                        return '否';
                }
            }
        });


        app.controller('cmsSkuList', ['$scope', '$location', '$route',
            'cmsSkuListService', 'cmsSkuSetstateService', 'cmsSkuVirtualMapperGetService'
            , 'cmsSkuVirtualMapperEditService', 'validService', 'authorityService',

            function ($scope, $location, $route, cmsSkuListService, cmsSkuSetstateService, cmsSkuVirtualMapperGetService,
                      cmsSkuVirtualMapperEditService, validService) {

                $scope.menuConfig = MenuConfig.menu;

                $scope.gotoPageEdit = function (index) {
                    $location.path('page/edit/' + index);
                }
                $scope.renderObj = {};

                $scope.skuStatus = [
                    {'key': '请选择', 'value': null},
                    {'key': '新品', 'value': '0'},
                    {'key': '接收', 'value': '1'},
                    {'key': '不可售', 'value': '2'}
                ];
                $scope.promoCode = [
                    {'key': '请选择', 'value': ''},
                    {'key': '优惠券公码', 'value': 'promoCode'}
                ];


                $scope.searchPage = {
                    "pageSize": 15,  //页大小
                    "pageNum": 1,   //当前页码
                    "pageTotal": 1,  //页面数量
                    "pageCount": 1, //数据个数
                    "pageShow": [],
                    "params": {
                        "productId": null,
                        "productCode": null,
                        "name": null,
                        "status": null,
                        "superId": null
                    },
                    "search": function () {

                        this.pageNum = 1;
                        this.rows = this.pageSize;
                        this.getData();
                    },

                    "cmsSkuSetstate": function (searchParams) {
                        var selectedSkus = _.filter($scope.renderObj.skus, function (item, index) {
                            if (item.checked != undefined && item.checked) {
                                return true;
                            } else {
                                return false
                            }
                        })
                        if (searchParams) {
                            if (!!searchParams["state"]) {
                                this.params["state"] = searchParams["state"];

                                var str = '';
                                for (var i = 0; i < selectedSkus.length; i++) {
                                    str += (selectedSkus[i].id + ",");
                                }
                                this.str = str.substring(0, str.length - 1);
                                this.state = this.params.state;
                                if (str == '') {
                                    alert("未选择要修改商品状态的商品！")
                                    return false;
                                }
                                if (this.params.state == 1) {
                                    var rlt = confirm("本次将修改以下商品状态为接收！点击确定将执行操作，点击取消不操作！" + this.str)
                                    if (rlt != true) {
                                        return false;
                                    }
                                }
                                if (this.params.state == 2) {
                                    var rlt = confirm("本次将修改以下商品状态为不可售！点击确定将执行操作，点击取消不操作！" + this.str)
                                    if (rlt != true) {
                                        return false;
                                    }
                                }
                                $.when(cmsSkuSetstateService.sendRequest({
                                        ids: this.str,
                                        state: this.state
                                    }))

                                    .done(function (result) {
                                        if (!result.success) {
                                            alert(result.message);
                                            window.location.reload();
                                        }

                                        $scope.resultMessage = result.message;
                                        $scope.$apply();
                                    })
                                    .fail(function (code, msg) {
                                        alert(msg);

                                        $scope.resultMessage = msg;
                                        $scope.$apply();

                                    });
                            }
                        }
                        $('.checkAll').click(function () {
                            var that = this;
                            _.each($scope.renderObj.skus, function (item, index) {
                                item.checked = $(that).prop("checked")
                            })
                            $scope.$apply();
                        });
                        $(".clientList").click(function () {

                            $('.checkAll').prop('checked', ($(".clientList").length == $(".clientList:checked").length));

                        })

                    },


                    "getData": function () {
                        var tmpParams = {};

                        _.each(this.params, function (value, key, list) {
                            if (!!value) {
                                tmpParams[key] = value;
                            }

                        });


                        tmpParams.rows = this.pageSize;
                        tmpParams.page = this.pageNum;
                        tmpParams.query = angular.toJson($scope.searchPage.params);

                        var that = this;
                        //获取页面列表
                        $.when(cmsSkuListService.sendRequest(tmpParams))
                            .done(function (result) {
                                $scope.renderObj = result;
                                //处理分页信息
                                that.pageCount = result.total;
                                that.pageTotal = Math.ceil(result.total / that.pageSize);

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
                            this.pageNum = this.pageTotal;
                        } else {
                            this.pageNum--;
                        }
                        //this.pageNum = this.pageNum;
                        this.getData();
                    },
                    "next": function () {
                        if (this.pageNum == this.pageTotal) {
                            this.pageNum = 1;
                        } else {
                            this.pageNum++;
                        }
                        //this.pageNum = this.pageNum;
                        this.getData();
                    }
                };

                $scope.virtual = {
                    "modal": $("#addMJModal"),
                    "open": function (id) {
                        this.id = id;
                        $.when(cmsSkuVirtualMapperGetService.sendRequest({
                                id: id,
                            }))

                            .done(function (result) {
                                $scope.res = result;
                                $scope.$apply();
                            })
                            .fail(function (code, msg) {
                                alert(msg);
                            });
                        this.modal.modal({});
                    },

                    "save": function () {
                        if (!validService.valid($scope.virtualProduct)) {
                            return;
                        }
                        $scope.res.id = this.id;
                        $.when(cmsSkuVirtualMapperEditService.sendRequest(
                            $scope.res
                            ))
                            .done(function (result) {
                                alert(result.message)
                                window.location.reload();
                            })
                            .fail(function (code, msg) {
                                alert(msg);
                            })
                    }
                };
                $scope.searchPage.search();


                $scope.searchPage.cmsSkuSetstate();


            }

        ]);

    });

