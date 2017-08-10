/**
 * Created by Ulife on 2016/4/08
 * user:zhanchanglei
 */


define([
        'ulife.cms.module.myApp',
        'ulife.framework.services',
        'ulife.cms.business.config',
        'ulife.cms.menu.config',

        'ulife.api.cms.item.paymentconfig.get',
        'ulife.api.cms.item.payment.config',
        'ulife.api.common.paytype',

        'ulife.cms.directive.datetimepicker',
        'ulife.cms.directive.dateformat',
        'ulife.cms.directive.tooltip',
        "ulife.cms.service.valid",
        "ulife.cms.service.authority",
        'ulife.cms.directive.wangEditor',

        "ulife.cms.service.authority"

    ],

    function (app, services, BizConfig, MenuConfig, cmsItemPaymentconfigGet, cmsItemPaymentConfig, commonPaytype) {

        cmsItemPaymentconfigGet.injectTo(app);
        cmsItemPaymentConfig.injectTo(app);
        commonPaytype.injectTo(app);


        app.filter('displays', function () {//1表示Web  2表示H5  4表示APP，多个终端对应值进行位或运算值
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
        app.controller('paymentIsEdit', ['$scope', '$location', '$route', '$filter',
            'cmsItemPaymentconfigGetService',
            'cmsItemPaymentConfigService',
            'commonPaytypeService',
            'validService',
            'authorityService',

            function ($scope, $location, $route, $filter, cmsItemPaymentconfigGetService, cmsItemPaymentConfigService, commonPaytypeService, validService) {

                $scope.menuConfig = MenuConfig.menu;
                $scope.itemStatus = [
                    {'key': '有效', 'value': 1},
                    {'key': '无效', 'value': 0}
                ];

                $.when(commonPaytypeService.sendRequest(), cmsItemPaymentconfigGetService.sendRequest({"id": $route.current.params.id}))
                    .done(function (result, cipgResult) {

                        $scope.paytypes = result.value;
                        $scope.payment = cipgResult;
                        $scope.payment.itemId=$route.current.params.id;

                        if( $scope.payment.status==null){
                            $scope.payment.status=1;
                        }

                        if ($scope.payment.config != null && $scope.payment.config != "") {
                            var itempayment = JSON.parse($scope.payment.config);
                        }
                        _.each($scope.paytypes, function (item, index, list) {
                            if (item.payChannelList != null && item.payChannelList.length > 0) {
                                item.ishavePayChannel = true;
                                item.payChannelList = _.filter(item.payChannelList, function (m) {
                                    return m.display != 0;
                                });
                            }
                            if(itempayment!=null) {
                                _.each(itempayment, function (ipItem, ipIndex) {
                                    if (item.ishavePayChannel) {
                                        _.each(item.payChannelList, function (pcItem, pcIndex) {
                                            if (item.code == ipItem.paymentType && pcItem.channelNo == ipItem.channelNo) {
                                                pcItem.isSelect = true;
                                            }
                                        })
                                    }
                                    else {
                                        if (item.code == ipItem.paymentType) {
                                            item.ishavePayChannel = false;
                                            item.isSelect = true;
                                        }
                                    }
                                })
                            }
                        });
                        $scope.$apply();
                    })
                    .fail(function (code, msg) {
                        if (code == -120 || code == -100) {
                            alert(code + "服务异常可能是挂了！" + msg)
                        } else
                            alert(msg)

                    });


                //保存按钮
                $scope.btns = {
                    "save": function () {
                        var configContext = "";

                        if (!validService.valid($scope.paymentForm)) {
                            return;
                        }

                        //获取勾选的支付方式
                        _.each($scope.paytypes, function (m, idx) {
                            if (m.isSelect != undefined && m.isSelect) {
                                //拼接已选支付方式(json字符串)
                                configContext += "{\"paymentType\":\"" + m.code + "\"},";
                            }
                            _.each(m.payChannelList, function (payChannel, indx) {
                                if (payChannel.isSelect != undefined && payChannel.isSelect) {
                                    //拼接已选支付方式(json字符串)
                                    configContext += "{\"paymentType\":\"" + m.code + "\",\"channelNo\":\"" + payChannel.channelNo + "\"},";
                                }
                            });
                        });

                        if (configContext != "") {
                            configContext = configContext.substring(0, configContext.length - 1);
                            configContext = "[" + configContext + "]";
                        }
                        if(configContext==''||configContext==null){
                            alert("编辑支付方式至少勾选一条！")
                            return false;
                        }
                        $scope.payment.config = configContext;
                        $scope.payment.id = $scope.payment.itemId;
                        $.when(cmsItemPaymentConfigService.sendRequest({"info": angular.toJson($scope.payment)}))
                            .done(function (result) {
                                alert(result.message)
                                window.location.reload();
                            })
                            .fail(function (code, msg) {
                                alert(msg);
                            })
                    }
                }

            }

        ]);

    });
