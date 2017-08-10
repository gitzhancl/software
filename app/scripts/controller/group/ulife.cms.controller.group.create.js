/**
 * Created by Ulife on 2016/1/15.
 */

define([
        'ulife.cms.module.myApp',
        'ulife.framework.services',
        'ulife.cms.business.config',
        'ulife.cms.menu.config',

        'ulife.api.product.get',
        'ulife.api.group.activity.create',
        'ulife.api.promotion.get.promoinitial',
        'ulife.api.promotion.activity.get',

        'ulife.cms.directive.datetimepicker',
        'ulife.cms.directive.dateformat',
        'ulife.cms.directive.tooltip',
        "ulife.cms.service.valid",
        "ulife.cms.service.authority"


    ],
    function (app, services, BizConfig, MenuConfig, productGet, groupActivityCreate, promotionGetPromoinitial, promotionActivityGet) {

        productGet.injectTo(app);
        groupActivityCreate.injectTo(app);
        promotionGetPromoinitial.injectTo(app);
        promotionActivityGet.injectTo(app);


        app.controller('GroupCreateCtrl', ['$scope', '$location', '$route', '$filter',
            'groupActivityCreateService',
            'productGetService', 'promotionGetPromoinitialService', 'promotionActivityGetService',
            'validService',
            'ngDialog',
            'authorityService',

            function ($scope, $location, $route, $filter, groupActivityCreateService, productGetService, promotionGetPromoinitialService, promotionActivityGetService, validService) {
                $scope.menuConfig = MenuConfig.menu;


                $scope.renderObj = {};
                $scope.group = {
                    "id": 0,
                    "type": "1",
                    "sort": "",
                    "name": "",
                    "itemName": "",
                    "pcTitle": "",
                    "mobileTitle": "",
                    "pcSubTitle": "",
                    "mobileSubTitle": "",
                    "departmentId": "1",
                    "demandPerson": "",
                    "startTime": moment().format("x"),
                    "endTime": moment().format("x"),
                    "viewStartTime": moment().format("x"),
                    "viewEndTime": moment().format("x"),
                    "itemId": "",
                    "price": "",
                    "perGroupLimit": "",
                    "stockLimit": "",
                    "pcImgUrl": "",
                    "mobileImgUrl": "",
                    "pcPreviewUrl": "",
                    "mobilePreviewUrl": "",
                    "remarks": "",
                    'couponCode': ""
                }
                $scope.isCreateActivity = false;


                $scope.groupType = [
                    {'key': '常规团', 'value': '1'},
                    {'key': '新人团', 'value': '2'},
                    {'key': '预售团', 'value': '3'},
                    {'key': '拉新团', 'value': '4'}
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
                    {'key': '大客户部', 'value': '8'},
                    {'key': '新媒体营销部', 'value': '9'}
                ];

                $scope.itemClass = 1;

                $scope.getTimeInfo = function () {
                    if ($scope.group.couponCode != '' && $scope.group.couponCode != undefined) {

                        $.when(promotionGetPromoinitialService.sendRequest({
                            code: $scope.group.couponCode
                        })).done(function (promo1) {
                            var promo = promo1.promoInfo;
                            if(promo.start){
                                $scope.group.startTime=promo.start;
                            }  if(promo.end){
                                $scope.group.endTime=promo.end;
                            }

                            $.when(promotionActivityGetService.sendRequest({"id": promo.activityid}))
                                .done(function (result) {
                                    if(result.startTime){
                                        $scope.group.viewStartTime=result.startTime;
                                    }  if(result.endTime){
                                        $scope.group.viewEndTime=result.endTime;
                                    }
                                })
                                .fail(function (code, msg) {
                                    alert(msg);
                                })


                        }).fail(function (errorInfo, msg) {
                            alert(msg)
                        })
                    }

                };
                $scope.preItem = {
                    "createIndex": function () {
                        $scope.itemClass = 1;
                    }
                }
                $scope.canSend = true
                $scope.nextItem = {
                    "nextItem": function () {
                        if ($scope.group.type == '') {
                            alert("请选择团购类型！");
                            return false;
                        }

                        $scope.itemClass = 2;
                    },
                    "createGroup": function () {
                        if (!validService.valid($scope.groupForm)) {
                            return;
                        }


                        if ($scope.group.couponCode != '' && $scope.group.couponCode != undefined) {
                            $.when(promotionGetPromoinitialService.sendRequest({
                                code: $scope.group.couponCode
                            })).done(function (promo1) {
                                var promo = promo1.promoInfo;
                                if(promo.rules){
                                    if(promo.rules.preferential>=$scope.group.price){
                                        alert("团购价格必须大于优惠券金额！");
                                        return false;
                                    }

                                    //
                                    //if ($scope.group.couponCode != '' && $scope.group.couponCode != undefined) {
                                    //
                                    //    $.when(promotionGetPromoinitialService.sendRequest({
                                    //        code: $scope.group.couponCode
                                    //    })).done(function (promo1) {
                                    //            var promo = promo1.promoInfo;
                                    //            if(promo.start){
                                    //                $scope.group.startTime=promo.start;
                                    //            }  if(promo.end){
                                    //                $scope.group.endTime=promo.end;
                                    //            }
                                    //
                                    //            $.when(promotionActivityGetService.sendRequest({"id": promo.activityid}))
                                    //                .done(function (result) {
                                    //                    if(result.startTime){
                                    //                        $scope.group.viewStartTime=result.startTime;
                                    //                    }  if(result.endTime){
                                    //                        $scope.group.viewEndTime=result.endTime;
                                    //                    }
                                    //                    //if (result.startTime >= $scope.group.startTime) {
                                    //                    //    alert("优惠券开始时间不能大于团购活动开始时间！优惠券开始时间：" + new Date(result.startTime))
                                    //                    //    return;
                                    //                    //}
                                    //                    //if (result.endTime <= $scope.group.endTime) {
                                    //                    //    alert("请保持团购结束时间晚于优惠券结束时间！优惠券结束时间：" + new Date(result.endTime))
                                    //                    //    return;
                                    //                    //}
                                    //                    $scope.isCreateActivity = true;
                                    //                    $.when(groupActivityCreateService.sendRequest({"json": angular.toJson($scope.group)}))
                                    //                        .done(function (result) {
                                    //                            $location.path('group/edit/' + result.value);
                                    //                            $scope.$apply();
                                    //                        })
                                    //                        .fail(function (code, msg) {
                                    //                            alert(msg);
                                    //                        })
                                    //                        .always(function () {
                                    //                            $scope.isCreateActivity = false;
                                    //                        })
                                    //                }).fail(function (errorInfo, msg) {
                                    //                alert(msg)
                                    //            })
                                    //        })
                                    //        .fail(function (code, msg) {
                                    //            alert(msg);
                                    //        })
                                    //} else {

                                    if (!$scope.canSend) {
                                        return
                                    }
                                    $scope.canSend = false;
                                    $.when(groupActivityCreateService.sendRequest({"json": angular.toJson($scope.group)}))
                                        .done(function (result) {
                                            $location.path('group/edit/' + result.value);
                                            $scope.$apply();
                                        })
                                        .fail(function (code, msg) {
                                            alert(msg);
                                        })
                                }
                            }).fail(function (errorInfo, msg) {
                                    alert(msg)
                                })


                                .always(function () {
                                    $scope.canSend = true
                                    $scope.isCreateActivity = false;
                                })
                        }else{
                            $.when(groupActivityCreateService.sendRequest({"json": angular.toJson($scope.group)}))
                                .done(function (result) {
                                    $location.path('group/edit/' + result.value);
                                    $scope.$apply();
                                })
                                .fail(function (code, msg) {
                                    alert(msg);
                                })

                                .always(function () {
                                    $scope.isCreateActivity = false;
                                })
                        }
                    }
                    //}
                }

                $scope.getProductInfo = function () {
                    $.when(productGetService.sendRequest({
                        id: $scope.group.itemId
                    })).done(function (productDetail) {
                        $scope.group.shareImages = productDetail.item.mediaInfos[0];
                        $scope.$apply();
                    }).fail(function (errorInfo) {
                    })
                };


                //    $scope.getPromoBypubliccode = function() {
                //        if( $scope.group.couponCode!=''&& $scope.group.couponCode!=undefined){
                //
                //        $.when(promotionGetbypubliccodeService.sendRequest({
                //            code: $scope.group.couponCode
                //        })).done(function(promo) {
                //            if(promo.start>$scope.group.startTime){
                //                alert("优惠券开始时间不能大于团购活动开始时间！")
                //                return;
                //            }
                //            if(promo.end<$scope.group.endTime){
                //                alert("优惠券结束时间不能小于团购活动结束时间！")
                //                return;
                //            }
                //        }).fail(function(errorInfo,msg) {
                //            alert(msg)
                //        })
                //    }
                //
                //}
            }
        ]);

    });

