/**
 * Created by Ulife on 2016/1/15.
 * 发布状态： -1-未发布 1-取消发布 2-已发布
 */

define([
        'ulife.cms.module.myApp',
        'ulife.framework.services',
        'ulife.cms.business.config',
        'ulife.cms.menu.config',

        'ulife.api.group.activity.get',
        'ulife.api.group.activity.publish',
        'ulife.api.group.activity.revise',
        'ulife.api.group.activity.suspend',
        'ulife.api.promotion.get.promoinitial',
        'ulife.api.promotion.activity.get',

        'ulife.cms.directive.datetimepicker',
        'ulife.cms.directive.dateformat',
        'ulife.cms.directive.tooltip',
        "ulife.cms.service.valid",
        "ulife.cms.service.authority"

    ],
    function (app, services, BizConfig, MenuConfig, groupActivityGet, groupActivityPublish, groupActivityRevise, groupActivitySuspend, promotionGetPromoinitial, promotionActivityGet) {

        groupActivityGet.injectTo(app);
        groupActivityPublish.injectTo(app);
        groupActivityRevise.injectTo(app);
        groupActivitySuspend.injectTo(app);
        promotionGetPromoinitial.injectTo(app);
        promotionActivityGet.injectTo(app);

        app.controller('GroupEditCtrl', ['$scope', '$location', '$route', '$filter',
            'groupActivityGetService',
            'groupActivityPublishService',
            'groupActivityReviseService',
            'groupActivitySuspendService', 'promotionGetPromoinitialService', 'promotionActivityGetService',
            'validService',
            'authorityService',

            function ($scope, $location, $route, $filter,
                      groupActivityGetService,
                      groupActivityPublishService,
                      groupActivityReviseService,
                      groupActivitySuspendService, promotionGetPromoinitialService, promotionActivityGetService,
                      validService) {

                $scope.menuConfig = MenuConfig.menu;


                $scope.groupType = [
                    {'key': '常规团', 'value': 1},
                    {'key': '新人团', 'value': 2},
                    {'key': '预售团', 'value': 3},
                    {'key': '拉新团', 'value': 4}
                ];
                $scope.deptType = [
                    {'key': '运营部', 'value': 1},
                    {'key': '市场部', 'value': 2},
                    {'key': '商品部', 'value': 3},
                    {'key': '用户体验部', 'value': 4},
                    {'key': '财务部', 'value': 5},
                    {'key': '技术部', 'value': 6},
                    {'key': '产品部', 'value': 7},
                    {'key': '大客户部', 'value': 8},
                    {'key': '新媒体营销部', 'value': 9}
                ];
                $scope.group = {
                    "type": 2
                };

                $.when(groupActivityGetService.sendRequest({"id": $route.current.params.id}))
                    .done(function (result) {
                        $scope.group = result;
                        $scope.$apply();

                    })
                    .fail(function (code, msg) {
                        alert(msg);
                    })

                $scope.getTimeInfo = function () {
                    if ($scope.group.couponCode != '' && $scope.group.couponCode != undefined) {

                        $.when(promotionGetPromoinitialService.sendRequest({
                            code: $scope.group.couponCode
                        })).done(function (promo1) {
                            var promo = promo1.promoInfo;
                            if (promo.start) {
                                $scope.group.startTime = promo.start;
                            }
                            if (promo.end) {
                                $scope.group.endTime = promo.end;
                            }

                            $.when(promotionActivityGetService.sendRequest({"id": promo.activityid}))
                                .done(function (result) {
                                    if (result.startTime) {
                                        $scope.group.viewStartTime = result.startTime;
                                    }
                                    if (result.endTime) {
                                        $scope.group.viewEndTime = result.endTime;
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

                $scope.canSend = true
                $scope.btns = {
                    "save": function () {
                        if (!validService.valid($scope.groupForm)) {
                            return;
                        }

                        if ($scope.group.couponCode != '' && $scope.group.couponCode != undefined) {
                            $.when(promotionGetPromoinitialService.sendRequest({
                                code: $scope.group.couponCode
                            })).done(function (promo1) {
                                var promo = promo1.promoInfo;
                                if (promo.rules) {
                                    if (promo.rules.preferential >= $scope.group.price) {
                                        alert("团购价格必须大于优惠券金额！");
                                        return false;
                                    }

                                    //if ($scope.group.couponCode != '' && $scope.group.couponCode != undefined) {
                                    //
                                    //    $.when(promotionGetPromoinitialService.sendRequest({
                                    //        code: $scope.group.couponCode
                                    //    })).done(function (promo1) {
                                    //        var promo = promo1.promoInfo;
                                    //        if(promo.start){
                                    //            $scope.group.startTime=promo.start;
                                    //        }  if(promo.end){
                                    //            $scope.group.endTime=promo.end;
                                    //        }
                                    //
                                    //        $.when(promotionActivityGetService.sendRequest({"id": promo.activityid}))
                                    //            .done(function (result) {
                                    //                if(result.startTime){
                                    //                    $scope.group.viewStartTime=result.startTime;
                                    //                }  if(result.endTime){
                                    //                    $scope.group.viewEndTime=result.endTime;
                                    //                }
                                    //
                                    //                //if (result.startTime >= $scope.group.startTime) {
                                    //                //    alert("优惠券开始时间不能大于团购活动开始时间！优惠券开始时间：" + new Date(result.startTime))
                                    //                //    return;
                                    //                //}
                                    //                //if (result.endTime <= $scope.group.endTime) {
                                    //                //    alert("请保持团购结束时间晚于优惠券结束时间！优惠券结束时间：" + new Date(result.endTime))
                                    //                //    return;
                                    //                //}
                                    //
                                    //                $.when(groupActivityReviseService.sendRequest({"json": angular.toJson($scope.group)}))
                                    //                    .done(function (result) {
                                    //                        if (result.value) {
                                    //                            window.location.reload();
                                    //                        }
                                    //                    })
                                    //                    .fail(function (code, msg) {
                                    //                        alert(msg);
                                    //                    })
                                    //
                                    //            })
                                    //            .fail(function (code, msg) {
                                    //                alert(msg);
                                    //            })
                                    //
                                    //
                                    //    }).fail(function (errorInfo, msg) {
                                    //        alert(msg)
                                    //    })
                                    //} else {


                                    if (!$scope.canSend) {
                                        return
                                    }
                                    $scope.canSend = false
                                    $.when(groupActivityReviseService.sendRequest({"json": angular.toJson($scope.group)}))
                                        .done(function (result) {
                                            if (result.value) {
                                                window.location.reload();
                                            }
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
                                })

                        }else {
                            $.when(groupActivityReviseService.sendRequest({"json": angular.toJson($scope.group)}))
                                .done(function (result) {
                                    if (result.value) {
                                        window.location.reload();
                                    }
                                })
                                .fail(function (code, msg) {
                                    alert(msg);
                                })
                            //}
                        }
                    }
                    ,
                    "publish": function () {
                        if (!validService.valid($scope.groupForm)) {
                            return;
                        }

                        $.when(groupActivityPublishService.sendRequest({"id": $scope.group.id}))
                            .done(function (result) {
                                window.location.reload();
                            })
                            .fail(function (code, msg) {
                                alert(msg);
                            })
                    }

                    ,
                    "cancel": function () {
                        if (!validService.valid($scope.groupForm)) {
                            return;
                        }

                        $.when(groupActivitySuspendService.sendRequest({"id": $scope.group.id}))
                            .done(function (result) {
                                window.location.reload();
                            })
                            .fail(function (code, msg) {
                                alert(msg);
                            })
                    }
                }


                $scope.getProductInfo = function () {
                    $.when(productGetService.sendRequest({
                        id: $scope.group.itemId
                    })).done(function (productDetail) {
                        $scope.group.shareImages = productDetail.item.mediaInfos[0];
                    }).fail(function (errorInfo) {
                    })

                };

            }
        ]);

    });

