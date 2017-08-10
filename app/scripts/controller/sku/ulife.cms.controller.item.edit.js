/**
 * Created by Ulife on 2016/1/15.
 * 发布状态： -1-未发布 1-取消发布 2-已发布
 */

define([
        'ulife.cms.module.myApp',
        'ulife.framework.services',
        'ulife.cms.business.config',
        'ulife.cms.menu.config',

        'ulife.api.cms.item.edit',
        'ulife.api.cms.item.get',
        'ulife.api.cms.item.clone',
    'ulife.api.channel.common.allChannel',

        'ulife.cms.directive.datetimepicker',
        'ulife.cms.directive.dateformat',
        'ulife.cms.directive.tooltip',
        "ulife.cms.service.valid",
        "ulife.cms.service.authority"

    ],
    function (app, services, BizConfig, MenuConfig, cmsItemGet, cmsItemEdit, cmsItemClone,channelCommonAllChannel) {

        cmsItemGet.injectTo(app);
        cmsItemEdit.injectTo(app);
        cmsItemClone.injectTo(app);
        channelCommonAllChannel.injectTo(app);

        app.controller('cmsItemEdit', ['$scope', '$location', '$route', '$filter',
            'cmsItemGetService',
            'cmsItemEditService',
            'cmsItemCloneService',
            'channelCommonAllChannelService',
            'validService',
            'authorityService',

            function ($scope, $location, $route, $filter,
                      cmsItemGetService,
                      cmsItemEditService,
                      cmsItemCloneService,
                      channelCommonAllChannelService,
                      validService) {

                $scope.menuConfig = MenuConfig.menu;


                //$scope.salesChannels = [
                //    {'key': 'ONLINE', 'value': 'ONLINE'},
                //    {'key': 'GROUP', 'value': 'GROUP'}
                //];
                //$scope.salesChannels1 = [
                //    {'key': 'GROUP', 'value': 'GROUP'}
                //];
                $scope.stockType = [
                    {'key': '正常模式', 'value': 0},
                    {'key': '强制售罄', 'value': 2},
                    {'key': '不扣减库存', 'value': 3}
                ];
                $scope.supportShoppingCart = [
                    {'key': '不支持', 'value': 0},
                    {'key': '支持', 'value': 1}
                ];
                $scope.productForm = [
                    {'key': '自营', 'value': 'SELF'},
                    {'key': '直采', 'value': 'consignation'}
                ];
                $scope.salesTerminal = [//1表示Web  2表示H5  4表示APP，多个终端对应值进行位或运算值
                    {'key': 'PC', 'value': 1},
                    {'key': 'H5', 'value': 2},
                    {'key': 'PC、H5', 'value': 3},
                    {'key': 'APP', 'value': 4},
                    {'key': 'PC、APP', 'value': 5},
                    {'key': 'H5、APP', 'value': 6},
                    {'key': 'PC、H5、APP', 'value': 7}
                ];
                $scope.status = [
                    {'key': '创建', 'value': 0},
                    {'key': '上架', 'value': 1},
                    {'key': '下架', 'value': 2},
                    {'key': '废弃', 'value': 3}
                ];


                $scope.applyStores='';


                $.when(channelCommonAllChannelService.sendRequest())
                    .done(function (result) {
                        $scope.applyStores=result.value;
                        for(var i=0; $scope.applyStores.length>i;i++){
                            if($scope.applyStores[i]){
                                $scope.applyStores[i].jointName=$scope.applyStores[i].parentName+"--"+$scope.applyStores[i].childName;}
                        }
                    })

                $.when(cmsItemGetService.sendRequest({"id": $route.current.params.id}))
                    .done(function (result) {
                        $scope.items = result;
                        $scope.items.salesChannels1="GROUP";


                        $.when(channelCommonAllChannelService.sendRequest())
                            .done(function (result) {
                                $scope.applyStores=result.value;
                                if( $scope.applyStores.length>0){
                                for(var i=0; $scope.applyStores.length>i;i++){
                                    if($scope.applyStores[i]){
                                        $scope.applyStores[i].jointName=$scope.applyStores[i].parentName+"--"+$scope.applyStores[i].childName;}
                                    if($scope.items.salesChannels==$scope.applyStores[i].code){
                                    $scope.items.salesChannels=$scope.applyStores[i].code;
                                    }
                                }
                                    $scope.$apply();
                                }
                            })


                        //if ($scope.items.salesChannels == "GROUP") {
                        //    $scope.salesChannels = $scope.salesChannels.splice(1, 1);
                        //}
                        //if ($scope.items.status != 0) {
                        //    $scope.status = $scope.status.splice(1, 3);
                        //}

                        $scope.$apply();
                    })
                    .fail(function (code, msg) {
                        //alert(msg);
                    });

                $scope.btns = {
                    "delivery": function () {
                        $location.path('item/delivery/' + $scope.items.id);
                    },
                    "payment": function () {
                        $location.path('item/payment/' + $scope.items.id);
                    },
                    "save": function () {
                        if (!validService.valid($scope.itemForm)) {
                            return;
                        }

                        $.when(cmsItemEditService.sendRequest({"iteminfo": angular.toJson($scope.items)}))
                            .done(function (result) {
                                window.location.reload();
                            })
                            .fail(function (code, msg) {
                                alert(msg);
                            })
                    }
                };

                $scope.checkPage = {
                    "modal": $("#addMJModal"),

                    "open": function () {
                        this.modal.modal({});

                    },
                    "itemClone": function () {
                        $scope.items.salesChannels=$scope.items.salesChannels1;
                        var rlt = confirm("是否克隆itemId:[" + $scope.items.id + "],销售渠道是:[" + $scope.items.salesChannels + "],取消不执行!")
                        if (rlt != true) {
                            return false;
                        }
                        $.when(cmsItemCloneService.sendRequest({
                                "id": $scope.items.id,
                                "salesChannels": $scope.items.salesChannels
                            }))
                            .done(function (result) {
                                $scope.itemClone = result.value;
                                if ($scope.itemClone <= 0) {
                                    alert("克隆商品失败" + items.id);
                                    return false;
                                } else {
                                    //$location.path('item/edit/' + $scope.itemClone);
                                    $.when(cmsItemGetService.sendRequest({"id": $scope.itemClone}))
                                        .done(function (result) {
                                            $scope.items = result;
                                            //if ($scope.items.salesChannels == "GROUP") {
                                            //    $scope.salesChannels = $scope.salesChannels.splice(1, 1);
                                            //}
                                            $scope.$apply();
                                        })
                                        .fail(function (code, msg) {
                                            alert(msg);
                                        });

                                }
                                $location.path('item/edit/' + $scope.itemClone);
                                window.location.reload();
                                $scope.$apply();


                            })
                            .fail(function (code, msg) {
                                alert(msg);
                            })

                    }


                }
            }
        ]);

    });

