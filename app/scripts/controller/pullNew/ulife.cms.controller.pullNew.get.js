/**
 * Created by Ulife on 2016/1/15.
 * 发布状态： -1-未发布 1-取消发布 2-已发布
 */

define([
        'ulife.cms.module.myApp',
        'ulife.framework.services',
        'ulife.cms.business.config',
        'ulife.cms.menu.config',

        'ulife.api.cms.pullNew.get',

        'ulife.cms.directive.datetimepicker',
        'ulife.cms.directive.dateformat',
        'ulife.cms.directive.tooltip',
        "ulife.cms.service.valid",
        "ulife.cms.service.authority"

    ],
    function(app, services, BizConfig, MenuConfig, cmsPullNewGet) {

        cmsPullNewGet.injectTo(app);


        app.controller('pullNewGetCtrl', ['$scope', '$location', '$route','$filter',
            'cmsPullNewGetService',
            'authorityService',

            function($scope, $location, $route,$filter,
                     cmsPullNewGetService) {

                $scope.menuConfig = MenuConfig.menu;

                $.when(cmsPullNewGetService.sendRequest({"id": $route.current.params.id}))
                    .done(function(result) {
                        $scope.pullNew = result;
                        $scope.$apply();

                    })
                    .fail(function(code, msg) {
                        alert(msg);
                    })
            }
        ]);

    });

