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

        'ulife.api.role.dept.list',
        'ulife.api.role.dept.add',
        'ulife.api.role.dept.update',
        'ulife.api.role.dept.delete',

        'ulife.cms.directive.datepicker',
        'ulife.cms.directive.tooltip',
        'ulife.cms.directive.dateformat',
        "ulife.cms.service.valid",
        "ulife.cms.service.authority"

    ],
    function (app, services, BizConfig, MenuConfig, roleDeptList, roleDeptAdd, roleDeptUpdate, roleDeptDelete) {

        roleDeptList.injectTo(app);
        roleDeptAdd.injectTo(app);
        roleDeptUpdate.injectTo(app);
        roleDeptDelete.injectTo(app);


        app.controller('DeptsCtrl', ['$scope', '$location', '$route', 'roleDeptListService',
            'roleDeptAddService', 'roleDeptUpdateService', 'roleDeptDeleteService',
            'validService', 'authorityService',

            function ($scope, $location, $route, roleDeptListService, roleDeptAddService, roleDeptUpdateService, roleDeptDeleteService,
                      validService) {


                $scope.treeOptions = {
                    nodeChildren: "second",
                    dirSelectable: true,
                    injectClasses: {
                        ul: "a1",
                        li: "a2",
                        liSelected: "a7",
                        iExpanded: "a3",
                        iCollapsed: "a4",
                        iLeaf: "a5",
                        label: "a6",
                        labelSelected: "a8"

                    },
                    isSelectable: function (node) {
                        return node.isDelete !== 1;
                    }
                }


                //$scope.$apply();
                $scope.menuConfig = MenuConfig.menu;


                $scope.dataForTheTree = [];
                $.when(roleDeptListService.sendRequest())
                    .done(function (result) {
                        $scope.dataForTheTree = result.value;

                        if ($scope.dataForTheTree.length > 0) {
                            for (var i = 0; $scope.dataForTheTree.length > i; i++) {

                                $scope.dataForTheTree[i].layer = 1;
                                if ($scope.dataForTheTree[i].isDelete === 1) {
                                    //第二层
                                    if ($scope.dataForTheTree[i].second.length > 0) {
                                        for (var j = 0; $scope.dataForTheTree[i].second.length > j; j++) {
                                            $scope.dataForTheTree[i].second[j].layer = 2;
                                            if ($scope.dataForTheTree[i].second[j].isDelete === 1) {
                                                //第三层
                                                if ($scope.dataForTheTree[i].second[j].second.length > 0) {
                                                    for (var s = 0; $scope.dataForTheTree[i].second[j].second.length > s; s++) {
                                                        $scope.dataForTheTree[i].second[j].second[s].layer = 3;
                                                        $scope.dataForTheTree[i].second[j].second[s].isDelete = 1;
                                                    }
                                                }
                                            } else {
                                                $scope.dataForTheTree[i].second[j].isDelete = 1;
                                                for (var s = 0; $scope.dataForTheTree[i].second[j].second.length > s; s++) {
                                                    $scope.dataForTheTree[i].second[j].second[s].layer = 3;
                                                    $scope.dataForTheTree[i].second[j].second[s].isDelete = 1;
                                                }
                                            }
                                        }
                                    }
                                }else{
                                    //第一层启用后第二层
                                    if ($scope.dataForTheTree[i].second.length > 0) {
                                        for (var j = 0; $scope.dataForTheTree[i].second.length > j; j++) {
                                            $scope.dataForTheTree[i].second[j].layer = 2;
                                            if ($scope.dataForTheTree[i].second[j].isDelete === 1) {
                                                //第三层
                                                if ($scope.dataForTheTree[i].second[j].second.length > 0) {
                                                    for (var s = 0; $scope.dataForTheTree[i].second[j].second.length > s; s++) {
                                                        $scope.dataForTheTree[i].second[j].second[s].layer = 3;
                                                        $scope.dataForTheTree[i].second[j].second[s].isDelete = 1;
                                                    }
                                                }
                                            } else {
                                                for (var s = 0; $scope.dataForTheTree[i].second[j].second.length > s; s++) {
                                                    $scope.dataForTheTree[i].second[j].second[s].layer = 3;
                                                }
                                            }
                                        }
                                    }
                                }

                            }
                        }
                        // 默认展开的叶子
                /*        $scope.expandedNodes = [
                            $scope.dataForTheTree[0],
                            $scope.dataForTheTree[1]
                        ];
*/
                        $scope.$apply();
                    })
                    .fail(function (code, msg) {
                        //alert(msg);
                    })


                $scope.operate = {
                    "modal": $("#addMJModal"),
                    "open": function () {
                        //if(     $scope.dataForTheTree.length>0){
                        //    alert("已有一级部门！")
                        //    return;
                        //}
                        this.modal.modal({});
                    },
                    "openSave": function () {
                        if (!validService.valid($scope.deptSet)) {
                            return;
                        }
                        $.when(roleDeptAddService.sendRequest({"id": 0, "departmentName": $scope.dept.departmentName}))
                            .done(function (result) {
                                alert(result.msg)
                                window.location.reload();
                            })
                            .fail(function (code, msg) {
                                alert(msg);
                            })
                    }
                },

                    $scope.operate1 = {
                        "modal": $("#addMJModal1"),
                        "open": function (id) {
                            $scope.id = id;
                            this.modal.modal({});
                        },
                        "create": function () {
                            if (!validService.valid($scope.deptSet1)) {
                                return;
                            }
                            $.when(roleDeptAddService.sendRequest({
                                    "id": $scope.id,
                                    "departmentName": $scope.dept.departmentName
                                }))
                                .done(function (result) {
                                    alert(result.msg)
                                    window.location.reload();
                                })
                                .fail(function (code, msg) {
                                    alert(msg);
                                })
                        }},

                    $scope.operate2 = {
                        "modal": $("#addMJModal2"),
                        "open": function (id,name) {
                            $scope.id = id;
                            $scope.dept={};
                            $scope.dept.departmentName = name;
                            this.modal.modal({});
                        },
                        "edit": function () {
                            if (!validService.valid($scope.deptSet2)) {
                                return;
                            }
                            this.modal.modal({});
                            $.when(roleDeptUpdateService.sendRequest({"id": $scope.id,"departmentName": $scope.dept.departmentName}))
                                .done(function (result) {
                                    alert(result.msg)
                                    window.location.reload();
                                })
                                .fail(function (code, msg) {
                                    alert(msg);
                                })
                        }},
                    $scope.operate3 = {
                    "delete": function (id) {

                            $.when(roleDeptDeleteService.sendRequest({"id": id,"isDelete": 1}))//	1:禁用，0：启用
                                .done(function (result) {
                                    alert(result.msg)
                                    window.location.reload();
                                })
                                .fail(function (code, msg) {
                                    alert(msg);
                                })
                        }},

                    $scope.operate4 = {
                    "start": function (id) {
                        $.when(roleDeptDeleteService.sendRequest({"id": id,"isDelete": 0}))//	1:禁用，0：启用
                            .done(function (result) {
                                alert(result.msg)
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

