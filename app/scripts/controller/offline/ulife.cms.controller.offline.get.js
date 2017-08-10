/**
 * Created by Ulife on 2016/1/15.
 * 发布状态： -1-未发布 1-取消发布 2-已发布
 */

define([
        'ulife.cms.module.myApp',
        'ulife.framework.services',
        'ulife.cms.business.config',
        'ulife.cms.menu.config',

        'ulife.api.bonuscms.offline.load',

        'ulife.cms.directive.datetimepicker',
        'ulife.cms.directive.dateformat',
        'ulife.cms.directive.tooltip',
        "ulife.cms.service.valid",
        "ulife.cms.service.authority"

    ],
    function(app, services, BizConfig, MenuConfig, bonuscmsOfflineLoad) {

        bonuscmsOfflineLoad.injectTo(app);


        app.controller('OfflineGetCtrl', ['$scope', '$location', '$route','$filter',
            'bonuscmsOfflineLoadService',
            'authorityService',

            function($scope, $location, $route,$filter,
                     bonuscmsOfflineLoadService) {

                $scope.menuConfig = MenuConfig.menu;

                $.when(bonuscmsOfflineLoadService.sendRequest({"activityId": $route.current.params.id}))
                    .done(function(result) {
                        if(result.status=='success'){
                            $scope.offline =JSON.parse( result.message);


                        }
                        $scope.$apply();

                    })
                    .fail(function(code, msg) {
                        alert(msg);
                    })
            }
        ]);

    });

