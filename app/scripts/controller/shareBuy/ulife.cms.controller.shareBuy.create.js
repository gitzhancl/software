/**
 * Created by Ulife on 2016/1/15.
 */

define([
        'ulife.cms.module.myApp',
        'ulife.framework.services',
        'ulife.cms.business.config',
        'ulife.cms.menu.config',

        'ulife.api.product.get',
        'ulife.api.share.buy.createOrEdit',
        'ulife.api.promotion.getbypubliccode',

        'ulife.cms.directive.datetimepicker',
        'ulife.cms.directive.dateformat',
        'ulife.cms.directive.tooltip',
        "ulife.cms.service.valid",
        "ulife.cms.service.authority"


    ],
    function (app, services, BizConfig, MenuConfig, productGet, shareBuyCreateOrEdit, promotionGetbypubliccode) {

        productGet.injectTo(app);
        shareBuyCreateOrEdit.injectTo(app);
        promotionGetbypubliccode.injectTo(app);


        app.controller('ShareBuyCreateCtrl', ['$scope', '$location', '$route', '$filter',
            'shareBuyCreateOrEditService',
            'productGetService',
            'promotionGetbypubliccodeService',
            'validService',
            'ngDialog',
            'authorityService',

            function ($scope, $location, $route, $filter, shareBuyCreateOrEditService, productGetService, promotionGetbypubliccodeService, validService) {
                $scope.menuConfig = MenuConfig.menu;


                $scope.renderObj = {};
                $scope.group = {
                    "id": 0,
                    "activityName": "",
                    "sort": "",
                    "wechatTitle": "",
                    "wechatImages": "http://i1.ucaiyuan.com/h5/images/share/share.png",
                    "mainUrl": "",
                    "listImages": "",
                    "activityRule": "",
                    "sharePrice": "",
                    "price": "",
                    "wechatCopy": "",
                    "departmentId": "1",
                    "demandPerson": "",
                    "newCode": "",
                    "oldCode": "",
                    "startTime": moment().format("x"),
                    "endTime": moment().add(7, 'days').format("x"),
                    "viewStartTime": moment().format("x"),
                    "viewEndTime": moment().add(7, 'days').format("x"),
                    "itemId": "",
                    "status": "",
                    "createTime": ""
                };

                $scope.groupStatus = [
                    {'key': '不限', 'value': 0},
                    {'key': '已创建', 'value': 1},
                    {'key': '未开始', 'value': 2},
                    {'key': '进行中', 'value': 3},
                    {'key': '已结束', 'value': 4},
                    {'key': '已取消', 'value': 5}
                ];
                $scope.deptType = [
                    {'key': '请选择', 'value': ''},
                    {'key': '运营部', 'value': '1'},
                    {'key': '市场部', 'value': '2'},
                    {'key': '商品部', 'value': '3'},
                    {'key': '用户体验部', 'value': '4'},
                    {'key': '财务部', 'value': '5'},
                    {'key': '技术部', 'value': '6'},
                    {'key': '产品部', 'value': '7'},
                    {'key': '大客户部', 'value':'8'},
                    {'key': '新媒体营销部', 'value':'9'}
                ];

                $scope.group.endTime = $scope.group.viewEndTime;
                $scope.addShareBuy = {
                    "save": function () {
                        if (!validService.valid($scope.shareBuyForm)) {
                            return;
                        }

                        /* if (!($scope.group.endTime == $scope.group.viewEndTime)) {
                         alert("请保持【活动结束时间】和【列表显示结束时间】一致,谢谢配合!")
                         return false;
                         }*/
                        if ($scope.group.endTime < $scope.group.startTime) {
                            alert("结束时间不能小于开始时间,谢谢配合!")
                            return false;
                        }
                        if ($scope.group.endTime < new Date()) {
                            alert("结束时间请大于当前时间,谢谢配合!")
                            return false;
                        }
                        $.when(productGetService.sendRequest({
                            id: $scope.group.itemId
                        })).done(function (productDetail) {
                            //$scope.group.shareImages = productDetail.item.mediaInfos[0];
                            $.when(shareBuyCreateOrEditService.sendRequest({"json": angular.toJson($scope.group)}))
                                .done(function (result) {
                                    //$location.path('shareBuy/get/'+result.value);
                                    //$scope.$apply();
                                    alert(result.msg)
                                    window.location.reload();
                                })
                                .fail(function (code, msg) {
                                    alert(msg);
                                })
                        }).fail(function (errorInfo, msg) {
                            alert(errorInfo + msg)
                            return false;
                        })

                    }
                };

                $scope.getProductInfo = function () {
                    $.when(productGetService.sendRequest({
                        id: $scope.group.itemId
                    })).done(function (productDetail) {
                        $scope.group.price = productDetail.item.retailPrice;
                        $scope.$apply();
                    }).fail(function (errorInfo, msg) {
                        alert(errorInfo + msg)
                    })
                };
            /*    $scope.getPromotionGetNewCode = function () {
                    $.when(promotionGetbypubliccodeService.sendRequest({
                        code: $scope.group.newCode
                    })).done(function (promotionDetail) {
                    }).fail(function (errorInfo, msg) {
                        //alert("新用户优惠券配置：" + errorInfo + msg)
                    })
                };
                $scope.getPromotionGetOldCode = function () {
                    $.when(promotionGetbypubliccodeService.sendRequest({
                        code: $scope.group.oldCode
                    })).done(function (promotionDetail) {
                    }).fail(function (errorInfo, msg) {
                        //alert("老用户优惠券配置：" + errorInfo + msg)
                    })
                }*/

            }
        ]);

    });

