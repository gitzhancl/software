/**
 * Created by Ulife on 2016/1/15.
 * 发布状态： -1-未发布 1-取消发布 2-已发布
 */

define([
        'ulife.cms.module.myApp',
        'ulife.framework.services',
        'ulife.cms.business.config',
        'ulife.cms.menu.config',

        'ulife.api.cms.sku.get',
        'ulife.api.cms.sku.edit',

        'ulife.cms.directive.datetimepicker',
        'ulife.cms.directive.dateformat',
        'ulife.cms.directive.tooltip',
        "ulife.cms.service.valid",
        "ulife.cms.service.authority",
        "ulife.cms.service.authority",
        'ulife.cms.directive.wangEditor'

    ],
    function (app, services, BizConfig, MenuConfig, cmsSkuGet, cmsSkuEdit) {

        cmsSkuGet.injectTo(app);
        cmsSkuEdit.injectTo(app);


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



        app.controller('skuParamIsView', ['$scope', '$location', '$route', '$filter',
            'cmsSkuGetService', 'cmsSkuEditService',
            'validService',
            'authorityService',

            function ($scope, $location, $route, $filter, cmsSkuGetService, cmsSkuEditService, validService) {

                $scope.menuConfig = MenuConfig.menu;

                $scope.skuStatus = [
                    {'key': '新品', 'value': 0},
                    {'key': '接收', 'value': 1},
                    {'key': '不可售', 'value': 2}
                ];
                $scope.skuParamIsView = [
                    {'key': '不显示', 'value': false},
                    {'key': '显示', 'value': true}
                ];

                $scope.virtualType = [
                    {'key': '否', 'value': false},
                    {'key': '是', 'value': true}
                ];

                $.when(cmsSkuGetService.sendRequest({"id": $route.current.params.id}))
                    .done(function (result) {
                        $scope.skus = result;

                        if ($scope.skus.status != 0) {
                            $scope.skuStatus.splice(0, 1);
                        }
                        document.getElementById("status").setAttribute("disabled", true);
                        document.getElementById("keywords").setAttribute("disabled", true);

                        $scope.$apply();

                    })
                    .fail(function (code, msg) {
                        alert(msg);
                    });
                $scope.checkPage1 = {
                    "modal": $("#previewModal1"),
                    "open1": function () {
                        this.modal.modal({});
                    }
                };
                $scope.checkPage2 = {
                    "modal": $("#previewModal2"),
                    "open2": function () {
                        this.modal.modal({});
                    }
                };
                $scope.checkPage3 = {
                    "modal": $("#previewModal3"),
                    "open3": function () {
                        this.modal.modal({});
                    }
                };

                //保存按钮
                $scope.btns = {
                    "save": function () {

                        if (!validService.valid($scope.skuForm)) {
                            return;
                        }
                        var _array = $scope.skus.keywords;

                      /*  if (!_.isArray(_array) && _array !=undefined) {
                            _array = _array.replace('，', ',').split(',');
                        }*/
                        $scope.skus.keywords = _array;
                        $.when(cmsSkuEditService.sendRequest({
                                "skuinfo": angular.toJson($scope.skus)
                            }))
                            .done(function (result) {
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

