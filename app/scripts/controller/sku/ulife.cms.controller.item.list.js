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

        'ulife.api.cms.item.list',
        'ulife.api.cms.item.setonsale',
        'ulife.api.channel.common.allChannel',
        'ulife.api.cms.item.export',

        'ulife.cms.directive.datepicker',
        'ulife.cms.directive.tooltip',
        'ulife.cms.directive.dateformat',
        "ulife.cms.service.authority"

    ],
    function (app, services, BizConfig, MenuConfig, cmsItemList, cmsItemSetonsale, channelCommonAllChannel,cmsItemExport) {
        cmsItemList.injectTo(app);
        cmsItemSetonsale.injectTo(app);
        channelCommonAllChannel.injectTo(app);
        cmsItemExport.injectTo(app);


        app.filter('itemStatus', function () {// 0: 创建, 1: 上架, 2: 下架, 3: 废弃
            return function (val) {
                switch (val) {
                    case 0 :
                        return '创建';
                    case 1 :
                        return '上架';
                    case 2 :
                        return '下架';
                    case 3 :
                        return '废弃';
                }
            }
        });

        app.filter('itemSalesTerminal', function () {//1表示Web  2表示H5  4表示APP，多个终端对应值进行位或运算值
            return function (val) {
                switch (val) {
                    case 1 :
                        return 'PC';
                    case 2 :
                        return 'H5';
                    case 3 :
                        return 'PC、H5';
                    case 4 :
                        return 'APP';
                    case 5 :
                        return 'PC、APP';
                    case 6 :
                        return 'H5、APP';
                    case 7 :
                        return 'PC、H5、APP';
                }
            }
        });
        app.filter('itemProductForm', function () {//（SELF:自营、consignation:直采）
            return function (val) {
                if (val == 'SELF') {
                    return '自营';
                } else
                    return '直采';
            }
        });

        var saleChannels_map = {};
        app.filter('saleChannelFilter', function () {
            return function (val) {
                return saleChannels_map[val];
            }
        })
        app.controller('cmsItemList', ['$scope', '$location', '$route',
            'cmsItemListService', 'cmsItemSetonsaleService', 'channelCommonAllChannelService','cmsItemExportService', 'authorityService',

            function ($scope, $location, $route, cmsItemListService, cmsItemSetonsaleService, channelCommonAllChannelService,cmsItemExportService) {

                $scope.menuConfig = MenuConfig.menu;

                $scope.gotoPageEdit = function (index) {
                    $location.path('page/edit/' + index);
                }
                $scope.renderObj = {};

                $scope.itemStatus = [
                    {'key': '不限', 'value': null},
                    {'key': '创建', 'value': '0'},
                    {'key': '上架', 'value': '1'},
                    {'key': '下架', 'value': '2'},
                    {'key': '废弃', 'value': '3'}
                ];
                $scope.itemProductForm = [
                    {'key': '不限', 'value': null},
                    {'key': '自营', 'value': 'SELF'},
                    {'key': '直采', 'value': 'consignation'}
                ];
                $scope.itemTerminal = [//1表示Web  2表示H5  4表示APP，多个终端对应值进行位或运算值
                    {'key': '全部终端', 'value': null},
                    {'key': 'PC', 'value': '1'},
                    {'key': 'H5', 'value': '2'},
                    {'key': 'PC、H5', 'value': '3'},
                    {'key': 'APP', 'value': '4'},
                    {'key': 'PC、APP', 'value': '5'},
                    {'key': 'H5、APP', 'value': '6'},
                    {'key': 'PC、H5、APP', 'value': '7'}
                ];

                $scope.applyStores = '';
                $.when(channelCommonAllChannelService.sendRequest())
                    .done(function (result) {
                        $scope.applyStores = result.value;

                        for (var i = 0; $scope.applyStores.length > i; i++) {
                            if ($scope.applyStores[i]) {
                                $scope.applyStores[i].jointName = $scope.applyStores[i].parentName + "--" + $scope.applyStores[i].childName;
                            }
                            saleChannels_map[$scope.applyStores[i].code] = $scope.applyStores[i].jointName;
                        }
                        $scope.applyStores.unshift({
                            "parentName": null,
                            "childName": null,
                            'salesChannel': null,
                            code: null,
                            jointName: "请选择"
                        })
                    })
                //$scope.imp = {
                //    "userEmail": null
                //},

                $scope.searchPage = {
                    "pageSize": 15,  //页大小
                    "pageNum": 1,   //当前页码
                    "pageTotal": 1,  //页面数量
                    "pageCount": 1, //数据个数
                    "pageShow": [],
                    "userEmail":null,
                    "params": {
                        'skuId':null,
                        "itemId": null,
                        "title": null,
                        'salesChannel': null,
                        "productForm": null,

                        "status": null,
                        "terminal": null
                    },
                    "search": function () {

                        this.pageNum = 1;
                        this.rows = this.pageSize;
                        this.getData();
                    },

                    "cmsItemSetonsale": function (searchParams) {
                        var selectedItems = _.filter($scope.renderObj.items, function (item, index) {
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
                                for (var i = 0; i < selectedItems.length; i++) {
                                    str += (selectedItems[i].id + ",");
                                }
                                this.str = str.substring(0, str.length - 1);
                                this.state = this.params.state;
                                if (str == '') {
                                    alert("未选择要修改商品状态的商品！")
                                    return false;
                                }
                                if (this.params.state == 1) {
                                    var rlt = confirm("本次将修改以下商品状态为上架！点击确定将执行操作，点击取消不操作！" + this.str)
                                    if (rlt != true) {
                                        return false;
                                    }
                                }
                                if (this.params.state == 2) {
                                    var rlt = confirm("本次将修改以下商品状态为下架！点击确定将执行操作，点击取消不操作！" + this.str)
                                    if (rlt != true) {
                                        return false;
                                    }
                                }
                                if (this.params.state == 3) {
                                    var rlt = confirm("本次将修改以下商品状态为废弃！点击确定将执行操作，点击取消不操作！" + this.str)
                                    if (rlt != true) {
                                        return false;
                                    }
                                }
                                $.when(cmsItemSetonsaleService.sendRequest({
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
                            _.each($scope.renderObj.items, function (item, index) {
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
                        $.when(cmsItemListService.sendRequest(tmpParams))
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
                        this.getData();
                    },
                    "next": function () {
                        if (this.pageNum == this.pageTotal) {
                            this.pageNum = 1;
                        } else {
                            this.pageNum++;
                        }
                        this.getData();
                    }
                };


                $scope.download = {
                    "modal": $("#downloadModal"),
                    "open": function () {
                        this.modal.modal({});
                    },
                    "save": function () {
                        //alert($scope.searchPage.params.mailAdress)

                        if ($scope.searchPage.userEmail == null) {
                            alert("请输入邮箱");
                            return;
                        }
                        this.modal.modal('hide');
                        if ($scope.searchPage.params.skuId || $scope.searchPage.params.itemId || $scope.searchPage.params.title || $scope.searchPage.params.salesChannel || $scope.searchPage.params.productForm ||
                            $scope.searchPage.params.status || $scope.searchPage.params.terminal) {
                            this.export();
                        } else {
                            alert("必须选择一个查询条件才能导出！");
                            return;
                        }
                        //this.page = this.oriPage;
                    },
                    export: function () {

                        //if ($scope.saveParams.userEmail == null) {
                        //    alert("请输入邮箱");
                        //    return;
                        //}
                        var tmpParams = {};
                        _.each(this.params, function (value, key, list) {
                            if (!!value) {
                                tmpParams[key] = value;
                            }
                        });
                        //tmpParams.rows =$scope.searchPage.pageSize;
                        //tmpParams.page = $scope.searchPage.pageNum;
                        tmpParams.email =$scope.searchPage.userEmail;
                        tmpParams.query = angular.toJson($scope.searchPage.params);

                        var that = this;
                        $.when(cmsItemExportService.sendRequest(tmpParams)).done(function (result) {
                                alert(result.message + "请到邮箱查看");
                                $scope.$apply();
                            })
                            .fail(function (code, msg) {
                                alert(msg)
                            })
                    }
                }
                $scope.searchPage.search();
                $scope.searchPage.cmsItemSetonsale();
            }

        ]);

    });

