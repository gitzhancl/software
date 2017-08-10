/**
 * Created by Ulife on 2016/1/15.
 * 发布状态： -1-未发布 1-取消发布 2-已发布
 */

define([
        'ulife.cms.module.myApp',
        'ulife.framework.services',
        'ulife.cms.business.config',
        'ulife.cms.menu.config',

        'ulife.api.role.pwd.update',

        'ulife.cms.directive.datetimepicker',
        'ulife.cms.directive.dateformat',
        'ulife.cms.directive.tooltip',
        "ulife.cms.service.valid",
        "ulife.cms.service.authority"

    ],
    function(app, services, BizConfig, MenuConfig, rolePwdUpdate) {

        rolePwdUpdate.injectTo(app);

        app.controller('ChangePwdCtrl', ['$scope', '$location', '$route','$filter',
            'rolePwdUpdateService',
            'validService',
            'authorityService',

            function($scope, $location, $route,$filter,
                     rolePwdUpdateService,
                     validService) {

                $scope.menuConfig = MenuConfig.menu;

                $scope.btns = {
                    "save": function(){
                        if (!validService.valid($scope.pwdFrom)) {
                            return;
                        }
                        if($scope.pwd.validPwd!==$scope.pwd.validPwd1){
                            alert("新密码确认错误，请重新确认密码！")

                            return;
                        }
                        $scope.params={'loginName':$scope.pwd.loginName,'originalPwd':$scope.pwd.originalPwd,'validPwd':$scope.pwd.validPwd};

                        $.when(rolePwdUpdateService.sendRequest($scope.params))
                            .done(function(result) {
                                alert(result.msg)
                                window.location.reload();
                            })
                            .fail(function(code, msg) {
                                alert(msg);
                            })
                    }
                }


            }
        ]);

    });

