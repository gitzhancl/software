/**
 * Created by Ulife on 2016/1/22.
 * @author zhangke
 * @date 2016-03-06（星期日 - -！）
 */

define([
        'ulife.cms.module.myApp',
        'ulife.framework.services',
        'ulife.cms.business.config',
        'ulife.cms.menu.config',

        'ulife.api.role.control.list',
        'ulife.api.role.control.update',
        'ulife.api.role.control.add',
        'ulife.api.role.control.get',

        'ulife.cms.directive.datepicker',
        'ulife.cms.directive.tooltip',
        'ulife.cms.directive.dateformat',
        "ulife.cms.service.valid",
        "ulife.cms.service.authority"

    ],
    function (app, services, BizConfig, MenuConfig, roleControlList, roleControlUpdate, roleControlAdd,roleControlGet) {

        roleControlList.injectTo(app);
        roleControlUpdate.injectTo(app);
        roleControlAdd.injectTo(app);
        roleControlGet.injectTo(app);

        app.filter('typeName', function () {
            return function (val) {
                switch (val) {
                    case "按钮" :
                        return '按钮';
                }
            }
        });

        app.controller('buttonListCtrl', ['$scope', '$location', '$route',
            'roleControlListService', 'roleControlUpdateService', 'roleControlAddService', 'validService','roleControlGetService', 'authorityService',

            function ($scope, $location, $route, roleControlListService, roleControlUpdateService, roleControlAddService, validService,roleControlGetService) {

                $scope.typeName = [
                    {'key': '请选择', 'value': null},
                    {'key': '按钮', 'value': '按钮'}
                ];


                $scope.res = {
                    typeName:null,
                    buttonName: null
                }
                $scope.menuConfig = MenuConfig.menu;
                $scope.renderObj = {};
                $.when(roleControlListService.sendRequest())
                    .done(function (result) {
                        $scope.renderObj = result;
                        $scope.$apply();
                    })
                    .fail(function (code, msg) {
                        alert(msg);
                    })

                $scope.editButton = {

                    "modal": $("#editMJModal"),
                    "open": function (id) {

                        if (id < 0) {
                            alert("该数据无法修改！")
                        }

                        $.when(roleControlGetService.sendRequest({"id":id}))
                            .done(function (result) {
                                $scope.res=result;
                                $scope.$apply();
                            })
                            .fail(function (code, msg) {
                                alert(msg);
                            })
                        this.modal.modal({});
                    },
                    "editSave": function () {

                        if (!validService.valid($scope.controlEdit)) {
                            return;
                        }
                        $.when(roleControlUpdateService.sendRequest({
                                "id": $scope.res.id,
                                "typeName":  $scope.res.typeName,
                                "controlName": $scope.res.buttonName
                            }))
                            .done(function (result) {
                                alert(result.msg)
                                window.location.reload();
                            })
                            .fail(function (code, msg) {
                                alert(msg);
                            })
                    }
                };

                $scope.addButton = {
                    "modal": $("#addMJModal"),
                    "open": function () {
                        this.modal.modal({});
                    },

                    "createSave": function (id) {

                        if (!validService.valid($scope.controlAdd)) {
                            return;
                        }
                        $.when(roleControlAddService.sendRequest({"menuId": id, "typeName":  $scope.res.typeName,
                            "controlName": $scope.res.buttonName}))
                            .done(function (result) {
                                alert(result.msg)
                                window.location.reload();
                            })
                            .fail(function (code, msg) {
                                alert(msg);
                            })
                    }
                };


            }
        ]);

    });

