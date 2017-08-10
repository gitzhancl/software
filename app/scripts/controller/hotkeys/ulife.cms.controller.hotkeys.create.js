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


        'ulife.cms.directive.datetimepicker',
        'ulife.cms.directive.dateformat',
        'ulife.cms.directive.tooltip',
        "ulife.cms.service.valid",
        "ulife.cms.service.authority"
    ],
    function (app, services, BizConfig, MenuConfig, cmsHotkeysSaveOrUpdateKeys) {

        cmsHotkeysSaveOrUpdateKeys.injectTo(app);


        app.controller('hotkeyCreate', ['$scope', '$location', '$route', '$filter',
            'cmsHotkeysSaveOrUpdateKeysService',
            'validService',
            'authorityService',

            function ($scope, $location, $route, $filter,
                      cmsHotkeysSaveOrUpdateKeysService,
                      validService) {

                $scope.menuConfig = MenuConfig.menu;

                $scope.terminal = [//1表示Web  2表示H5  4表示APP，多个终端对应值进行位或运算值
                    {'key': '请选择终端', 'value': ''},
                    {'key': 'PC', 'value': 1},
                    {'key': 'H5', 'value': 2},
                    {'key': 'PC、H5', 'value': 3},
                    {'key': 'APP', 'value': 4},
                    {'key': 'PC、APP', 'value': 5},
                    {'key': 'H5、APP', 'value': 6},
                    {'key': 'PC、H5、APP', 'value': 7}
                ];


                $scope.hotkey = {
                    "id": 0,
                    "hotKey": "",
                    "hits": null,
                    "terminal": ''

                }
                $scope.btns = {
                    "save": function () {
                        if (!validService.valid($scope.newhotkey)) {
                            return;
                        }

                        $.when(cmsHotkeysSaveOrUpdateKeysService.sendRequest($scope.hotkey))

                            .done(function (result) {
                                if (result.result) {
                                    $location.path('hotkeys/list/');
                                }
                                $scope.$apply();
                                //window.location.reload();
                            })
                            .fail(function (code, msg) {
                                alert(msg);
                            })
                    }

                }
            }
        ]);

    });

