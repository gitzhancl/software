/**
 * Created by Ulife on 2016/1/15.
 * 发布状态： -1-未发布 1-取消发布 2-已发布
 */

define([
        'ulife.cms.module.myApp',
        'ulife.framework.services',
        'ulife.cms.business.config',
        'ulife.cms.menu.config',

        'ulife.api.order.getRefundBill',

        'ulife.cms.directive.datetimepicker',
        'ulife.cms.directive.dateformat',
        'ulife.cms.directive.tooltip',
        "ulife.cms.service.valid",
        "ulife.cms.service.authority"

    ],
    function (app, services, BizConfig, MenuConfig,soRefundBillDetail){

        soRefundBillDetail.injectTo(app);

        app.controller('SoRefundBillDetailCtrl', ['$scope', '$location', '$route', '$filter',
            'orderGetRefundBillService','authorityService',

            function ($scope, $location, $route, $filter,
                      orderGetRefundBillService) {

                $scope.menuConfig = MenuConfig.menu;
                $scope.renderObj = {};

                $.when(orderGetRefundBillService.sendRequest({"refundBillNo": $route.current.params.refundBillNo}))

                    .done(function (result) {
                        $scope.soRefundBill = result;
                        $scope.$apply();
                    })
                    .fail(function (code, msg) {
                        alert(msg);
                    });
            }
        ]);

    });