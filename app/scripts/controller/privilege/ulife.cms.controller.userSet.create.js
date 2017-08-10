/**
 * Created by Ulife on 2016/1/15.
 */

define([
        'ulife.cms.module.myApp',
        'ulife.framework.services',
        'ulife.cms.business.config',
        'ulife.cms.menu.config',

        'ulife.api.role.dept.list',
        'ulife.api.role.user.add',
        'ulife.api.role.list',
        'ulife.api.role.dept.query.role',

        'ulife.cms.directive.datetimepicker',
        'ulife.cms.directive.dateformat',
        'ulife.cms.directive.tooltip',
        "ulife.cms.service.valid",
        "ulife.cms.service.authority"
    ],
    function (app, services, BizConfig, MenuConfig, roleUserAdd, roleDeptList, roleList,roleDeptQueryRole) {

        roleUserAdd.injectTo(app);
        roleDeptList.injectTo(app);
        roleList.injectTo(app);
        roleDeptQueryRole.injectTo(app);


        app.controller('roleUserAdd', ['$scope', '$location', '$route', '$filter',
            'roleUserAddService',
            'validService', 'roleDeptListService', 'roleListService','roleDeptQueryRoleService', 'authorityService',

            function ($scope, $location, $route, $filter, roleUserAddService, validService, roleDeptListService, roleListService,roleDeptQueryRoleService) {


                $scope.isDelete = [
                    {'key': '请选择', 'value': null},
                    {'key': '有效', 'value': 0},
                    {'key': '无效', 'value': 1}
                ];

                $scope.isEpiboly = [
                    {'key': '请选择', 'value': null},
                    {'key': '否', 'value': 0},
                    {'key': '是', 'value': 1}
                ];
                $scope.isBusiness = [
                    {'key': '请选择', 'value': null},
                    {'key': '是', 'value': 1},
                    {'key': '否', 'value': 0}
                ];
                $scope.menuConfig = MenuConfig.menu;

                $.when(roleDeptListService.sendRequest())
                    .done(function (result) {
                        $scope.dataForTheTree = result.value;
                        _.each($scope.dataForTheTree, function (dept1, index) {
                            $scope.department2[dept1.id] = dept1.second;
                            _.each(dept1.second, function (dept2) {
                                $scope.department3[dept2.id] = dept2.second;
                            })
                        })

                        $scope.$apply();



                        /*$.when(roleListService.sendRequest())
                            .done(function (result) {
                                $scope.roleList = result.value;
                                _.each($scope.roleList, function (role1, index) {
                                    if($scope.userParams.departmentId==role1.id){
                                        $scope.roleId=role1.role;
                                    }else{
                                        $scope.roleId=[];
                                    }
                                })

                                $scope.$apply();
                            })
                            .fail(function (code, msg) {
                                alert(msg);
                            })*/
                    })
                    .fail(function (code, msg) {
                        alert(msg);
                    })


                $scope.searchRoles = function(deptId) {
                    if ($scope.userParams.departmentId3 !== undefined) {
                        $scope.userParams.departmentId = $scope.userParams.departmentId3;
                    } else if ($scope.userParams.departmentId2 !== undefined) {
                        $scope.userParams.departmentId = $scope.userParams.departmentId2;
                    } else if ($scope.userParams.departmentId1 !== undefined) {
                        $scope.userParams.departmentId = $scope.userParams.departmentId1;
                    }


                    var resList = []
                    $.when(roleDeptQueryRoleService.sendRequest({"deptId": deptId}))
                        .done(function (result) {
                            var roleList = [];
                            $scope.roleList = result.value;
                            resList = result.value;
                            if(resList!==undefined){
                                _.each(resList, function (res, index) {
                                    if (res.isDelete!==undefined&&res.isDelete == 1) {
                                        //delete resList[index];
                                    } else {
                                        roleList.push(res);
                                    }

                                });
                            }
                            $scope.roleList = roleList;
                            $scope.$apply();
                        })
                        .fail(function (code, msg) {
                            alert(msg);
                        })
                }
                $scope.department2 = {};
                $scope.department3 = {};

                $scope.renderObj = {};

                $scope.verifyLoginName = function(){

                    var reg=/[^\u0000-\u00FF]/ ;
                    if(reg.exec( $scope.userParams.loginName.trim())){
                        alert('用户名不能包含中文及特殊符号！');
                        return false;
                    }
                }
                $scope.userParams = {
                    "departmentId1": undefined,
                    "departmentId2": undefined,
                    "departmentId3": undefined,
                    "departmentId": 0,
                    "name": "",
                    //"sort": "",
                    "loginName": "",
                    "isDelete": null,
                    "isBusiness": null,
                    "roleId": 0,
                    "isEpiboly":null,
                    "email":""
                };


                $scope.btns = {
                    "userAdd": function () {
                        if (!validService.valid($scope.addUser)) {
                            return;
                        }

                        if ($scope.userParams.departmentId3 !== undefined) {
                            $scope.userParams.departmentId = $scope.userParams.departmentId3;
                        } else if ($scope.userParams.departmentId2 !== undefined) {
                            $scope.userParams.departmentId = $scope.userParams.departmentId2;
                        } else if ($scope.userParams.departmentId1 !== undefined) {
                            $scope.userParams.departmentId = $scope.userParams.departmentId1;
                        }

                        $.when(roleUserAddService.sendRequest($scope.userParams))
                            .done(function (result) {
                                alert(result.msg);
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

