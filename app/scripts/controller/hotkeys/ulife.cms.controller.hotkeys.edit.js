/**
 * @author zhanchanglei
 * @date 2016-05-09
 */
define([
        'ulife.cms.module.myApp',
        'ulife.framework.services',
        'ulife.cms.business.config',
        'ulife.cms.menu.config',

        'ulife.api.cms.hotkeys.saveOrUpdateKeys',
        'ulife.api.cms.hotkeys.edit',

        'ulife.cms.directive.datetimepicker',
        'ulife.cms.directive.dateformat',
        'ulife.cms.directive.tooltip',
        "ulife.cms.service.valid",
        "ulife.cms.service.authority"

    ],
    function (app, services, BizConfig, MenuConfig, cmsHotkeysSaveOrUpdateKeys, cmsHotkeysEdit) {

        cmsHotkeysSaveOrUpdateKeys.injectTo(app);
        cmsHotkeysEdit.injectTo(app);



        app.controller('hotkeyEdit', ['$scope', '$location', '$route', '$filter',
            'cmsHotkeysSaveOrUpdateKeysService',
            'cmsHotkeysEditService',
            'validService',
            'authorityService',

            function ($scope, $location, $route, $filter,
                      cmsHotkeysSaveOrUpdateKeysService,cmsHotkeysEditService,
                      validService) {


                $scope.terminal = [//1表示Web  2表示H5  4表示APP，多个终端对应值进行位或运算值
                    {'key': '全部终端', 'value': ''},
                    {'key': 'PC', 'value': 1},
                    {'key': 'H5', 'value':2},
                    {'key': 'PC、H5', 'value':3},
                    {'key': 'APP', 'value': 4},
                    {'key': 'PC、APP', 'value': 5},
                    {'key': 'H5、APP', 'value': 6},
                    {'key': 'PC、H5、APP', 'value': 7}
                ];

                $scope.menuConfig = MenuConfig.menu;


                $.when(cmsHotkeysEditService.sendRequest({"id": $route.current.params.id}))
                    .done(function (result) {
                        $scope.hotkey = result;
                        $scope.$apply();

                    })
                    .fail(function (code, msg) {
                        alert(msg);
                    })


                $scope.btns = {
                    "save": function () {
                        if (!validService.valid($scope.hotkeyProduct)) {
                            return;
                        }

                        $.when(cmsHotkeysSaveOrUpdateKeysService.sendRequest($scope.hotkey))
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

