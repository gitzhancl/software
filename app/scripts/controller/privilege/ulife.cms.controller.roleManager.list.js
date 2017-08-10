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

        'ulife.api.role.list',
        'ulife.api.role.add',
        'ulife.api.role.update',
        'ulife.api.role.menu.list',
        'ulife.api.role.delete',
        'ulife.api.role.relevance.Menu.list',
        'ulife.api.role.relevance.Menu.add',
        'ulife.api.role.relevance.Menu.delete',
        'ulife.api.role.relevance.menu.button.list',
        'ulife.api.role.relevance.menu.button.add',
        'ulife.api.role.control.list',
    'ulife.api.role.menu.query.control',

        'ulife.cms.directive.datepicker',
        'ulife.cms.directive.tooltip',
        'ulife.cms.directive.dateformat',

        "ulife.cms.service.authority"

    ],
    function (app, services, BizConfig, MenuConfig, roleList, roleAdd, roleUpdate, roleMenuList, roleDelete, roleRelevanceMenuList,
              roleRelevanceMenuAdd, roleRelevanceMenuDelete, roleRelevanceMenuButtonList, roleRelevanceMenuButtonAdd, roleControlList,roleMenuQueryControl) {

        roleList.injectTo(app);
        roleAdd.injectTo(app);
        roleUpdate.injectTo(app);
        roleMenuList.injectTo(app);
        roleDelete.injectTo(app);
        roleRelevanceMenuList.injectTo(app);
        roleRelevanceMenuAdd.injectTo(app);
        roleRelevanceMenuDelete.injectTo(app);
        roleRelevanceMenuButtonList.injectTo(app);
        roleRelevanceMenuButtonAdd.injectTo(app);
        roleControlList.injectTo(app);
        roleMenuQueryControl.injectTo(app);


        app.filter('isDelete', function () {
            return function (val) {
                switch (val) {
                    case 0 :
                        return '启用';
                    case 1 :
                        return '未启用';
                }
            }
        });


        app.controller('RoleManagerCtrl', ['$scope', '$location', '$route', 'roleListService', 'roleAddService',
            'roleUpdateService', 'roleMenuListService', 'roleDeleteService', 'roleRelevanceMenuListService',
            'roleRelevanceMenuAddService', 'roleRelevanceMenuDeleteService', 'roleRelevanceMenuButtonListService', 'roleRelevanceMenuButtonAddService', 'roleControlListService','roleMenuQueryControlService',
            'authorityService',

            function ($scope, $location, $route, roleListService, roleAddService, roleUpdateService, roleMenuListService,
                      roleDeleteService, roleRelevanceMenuListService, roleRelevanceMenuAddService, roleRelevanceMenuDeleteService, roleRelevanceMenuButtonListService, roleRelevanceMenuButtonAddService, roleControlListService,roleMenuQueryControlService) {

                $scope.treeOptions1 = {
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
                };

                $.when(roleListService.sendRequest())
                    .done(function (result) {
                        $scope.usersTheTree = result.value;

                        if ($scope.usersTheTree.length > 0) {
                            for (var i = 0; $scope.usersTheTree.length > i; i++) {

                                $scope.usersTheTree[i].layer = 1;
                                if ($scope.usersTheTree[i].isDelete === 1) {
                                    //第二层
                                    if ($scope.usersTheTree[i].second.length > 0) {
                                        for (var j = 0; $scope.usersTheTree[i].second.length > j; j++) {
                                            $scope.usersTheTree[i].second[j].layer = 2;
                                            if ($scope.usersTheTree[i].second[j].isDelete === 1) {
                                                //第三层
                                                if ($scope.usersTheTree[i].second[j].second.length > 0) {
                                                    for (var s = 0; $scope.usersTheTree[i].second[j].second.length > s; s++) {
                                                        $scope.usersTheTree[i].second[j].second[s].layer = 3;
                                                        $scope.usersTheTree[i].second[j].second[s].isDelete = 1;
                                                    }
                                                }
                                            } else {
                                                $scope.usersTheTree[i].second[j].isDelete = 1;
                                                for (var s = 0; $scope.usersTheTree[i].second[j].second.length > s; s++) {
                                                    $scope.usersTheTree[i].second[j].second[s].layer = 3;
                                                    $scope.usersTheTree[i].second[j].second[s].isDelete = 1;
                                                }
                                            }
                                        }
                                    }
                                } else {
                                    //第一层启用后第二层
                                    if ($scope.usersTheTree[i].second.length > 0) {
                                        for (var j = 0; $scope.usersTheTree[i].second.length > j; j++) {
                                            $scope.usersTheTree[i].second[j].layer = 2;
                                            if ($scope.usersTheTree[i].second[j].isDelete === 1) {
                                                //第三层
                                                if ($scope.usersTheTree[i].second[j].second.length > 0) {
                                                    for (var s = 0; $scope.usersTheTree[i].second[j].second.length > s; s++) {
                                                        $scope.usersTheTree[i].second[j].second[s].layer = 3;
                                                        $scope.usersTheTree[i].second[j].second[s].isDelete = 1;
                                                    }
                                                }
                                            } else {
                                                for (var s = 0; $scope.usersTheTree[i].second[j].second.length > s; s++) {
                                                    $scope.usersTheTree[i].second[j].second[s].layer = 3;
                                                }
                                            }
                                        }
                                    }
                                }

                            }
                        }

                        $scope.$apply();
                    })
                    .fail(function (code, msg) {
                        alert(msg);
                    })

                $scope.selectedDept = function (node, selected) {
                    //debugger
                    if (selected) {
                        $scope.selectedRoleList = node.role;
                    } else {

                        $scope.selectedRoleList = [];
                    }
                    //$scope.$apply();
                };

                $scope.treeOptions = {
                    nodeChildren: "children",
                    dirSelectable: true,
                    multiSelection: true,
                    injectClasses: {
                        ul: "a1",
                        li: "a2",
                        liSelected: "a7",
                        iExpanded: "a3",
                        iCollapsed: "a4",
                        iLeaf: "a5",
                        label: "a6",
                        labelSelected: "a8"
                    }
                }


                /*
                 // 默认展开的叶子
                 $scope.expandedNodes = [
                 $scope.dataForTheTree[0],
                 $scope.dataForTheTree[0].children[1],
                 $scope.dataForTheTree[0].children[1].children[0],
                 $scope.pagesList[0],
                 $scope.pagesList[1],
                 $scope.pagesList[2],
                 $scope.pagesList[3],
                 $scope.pagesList[4],
                 $scope.pagesList[5]
                 ];*/
                //所有页面列表
                $.when(roleMenuListService.sendRequest())
                    .done(function (result) {
                        $scope.pagesList = result.value;
                        $scope.$apply();

                    })
                    .fail(function (code, msg) {
                        alert(msg);
                    })
                $scope.params = {
                    "departmentName": ""
                };


                //角色显示关联页面
                $scope.changeRole = function (id, roleName) {
                    //获取要修改的角色名
                    $scope.params.departmentName = roleName;
                    $scope.isRoleId = id;
                    $.when(roleRelevanceMenuListService.sendRequest({"id": $scope.isRoleId}))
                        .done(function (result) {
                            $scope.pageSelected = result.value;
                            $scope.$apply();
                        })
                        .fail(function (code, msg) {
                            alert(msg);
                        })
                }

                //已分配权限页面

                $scope.changeMenu = function (id) {
                    $scope.isMenuId = id;


                    $.when(roleRelevanceMenuButtonListService.sendRequest({
                            "menuId": $scope.isMenuId,
                            "roleId": $scope.isRoleId
                        }))
                        .done(function (result) {
                            $scope.pageList1 = result.value;
                            if ($scope.pageList1 == undefined) {
                                //查页面按钮
                                $.when(roleMenuQueryControlService.sendRequest({
                                        "menuId": $scope.isMenuId
                                    }))
                                    .done(function (result) {
                                        $scope.pageList = result.value;

                                        _.each($scope.pageList, function (role, index) {
                                            role.selected = false;
                                        });

                                        $scope.$apply();
                                    })
                                    .fail(function (code, msg) {
                                        alert(msg);
                                    })

                               }else if($scope.pageList1.length>0){
                                $.when(roleMenuQueryControlService.sendRequest({
                                        "menuId": $scope.isMenuId
                                    }))
                                    .done(function (result) {
                                        _.each($scope.pageList1, function (role1, index) {
                                            $scope.pageList = result.value;
                                            if( $scope.pageList==undefined){
                                                //查页面按钮
                                                $.when(roleMenuQueryControlService.sendRequest({
                                                        "menuId": $scope.isMenuId
                                                    }))
                                                    .done(function (result) {
                                                        $scope.pageList = result.value;

                                                        _.each($scope.pageList, function (role, index) {
                                                            role.selected = false;
                                                        });

                                                        $scope.$apply();
                                                    })
                                                    .fail(function (code, msg) {
                                                        alert(msg);
                                                    })
                                            }else{

                                                _.each($scope.pageList, function (role, index) {
                                                    if (role1.id === role.id) {
                                                        role.selected = true;
                                                    }
                                                });
                                            }

                                            $scope.$apply();
                                        })

                                        //role.id = false;
                                    })
                                    .fail(function (code, msg) {
                                        alert(msg);
                                    })
                            }
                            $scope.$apply();
                        })
                        .fail(function (code, msg) {
                            alert(msg);
                        })
                }

                var nodeList = [];
                $scope.showSelected = function (node, selected) {
                    $scope.selectedNodes = [];
                    if (!selected) {
                        var newNodeList = [];
                        _.each(nodeList, function(nodeItem) {
                            if (nodeItem != node.id) {
                                newNodeList.push(nodeItem)
                            }
                        })

                        nodeList = newNodeList;
                        //debugger;
                    } else {
                        nodeList.push(node.id);
                    }
                    //$scope.$apply();
                };
                $scope.btns = {
                    "del": function (isDelete) {
                        if ($scope.isRoleId == undefined) {
                            alert("请选择角色！")
                            return;
                        }
                        //var id = $('[name=roleRadio]').val();
                        $.when(roleDeleteService.sendRequest({
                                "id": $scope.isRoleId,
                                "isDelete": isDelete
                            }))
                            .done(function (result) {
                                alert(result.msg)
                                window.location.reload();
                            })
                            .fail(function (code, msg) {
                                alert(msg);
                            })
                    },
                    "reset": function () {
                        _.each($scope.pageList, function (role, index) {
                            if (role.selected == true) {
                                role.selected = false;
                                role.isDelete = 1;
                            }
                        });
                        $scope.$apply();
                    },
                    "modal": $("#editMJModal"),
                    "open": function () {
                        this.modal.modal({});
                    },
                    "edit": function () {
                        if ($scope.isRoleId == undefined || $scope.params.departmentName == "") {
                            alert("本次操作失败！")
                            return;
                        }
                        //var id = $('[name=roleRadio]').val();
                        $.when(roleUpdateService.sendRequest({
                                "id": $scope.isRoleId,
                                "departmentName": $scope.params.departmentName
                            }))
                            .done(function (result) {
                                alert(result.msg)
                                window.location.reload();
                            })
                            .fail(function (code, msg) {
                                alert(msg);
                            })
                    },
                    //给角色添加页面权限
                    "accredit": function () {
                        //var id = $('[name=roleRadio]').val();
                        //return;
                        if ($scope.isRoleId == undefined) {
                            alert("请选择角色！")
                            return false;
                        }
                        if(nodeList ==undefined || nodeList.length==0){
                            alert("请选择页面！");
                            return false;
                        }
                        if (nodeList.length > 0) {
                            for (var i = 0; nodeList.length > i; i++) {
                                $.when(roleRelevanceMenuAddService.sendRequest({
                                        "id": $scope.isRoleId,
                                        "menuId": nodeList[i]
                                    }))
                                    .done(function (result) {
                                        //debugger
                                        //$scope.pageSelected = result.value;
                                        if(result.msg=="操作成功"){
                                            $.when(roleRelevanceMenuListService.sendRequest({"id": $scope.isRoleId}))
                                                .done(function (result) {
                                                    $scope.pageSelected = result.value;
                                                    $scope.$apply();
                                                })
                                                .fail(function (code, msg) {
                                                    alert(msg);
                                                })
                                        }
                                        $scope.$apply();
                                    })
                                    .fail(function (code, msg) {
                                        alert(msg);
                                    })
                                //alert(JSON.stringify(nodeList))
                            }

                   /*         for (var j = 0; 2> i; i++) {
                            $.when(roleRelevanceMenuListService.sendRequest({"id": $scope.isRoleId}))
                                .done(function (result) {
                                    $scope.pageSelected = result.value;
                                    $scope.$apply();
                                })
                                .fail(function (code, msg) {
                                    alert(msg);
                                })
                        }*/
                        }
                    },
                    "delete": function () {
                        if($scope.isMenuId==undefined||$scope.isMenuId==null){
                            alert("请选择删除的页面！")
                            return;
                        }
                        $.when(roleRelevanceMenuDeleteService.sendRequest({
                                "id": $scope.isRoleId,
                                "menuId": $scope.isMenuId
                            }))
                            .done(function (result) {
                                $scope.isMenuId=null;
                                alert(result.msg)
                                $.when(roleRelevanceMenuListService.sendRequest({"id": $scope.isRoleId}))
                                    .done(function (result) {
                                        $scope.pageSelected = result.value;
                                        $scope.$apply();
                                    })
                                    .fail(function (code, msg) {
                                        alert(msg);
                                    })
                            })
                            .fail(function (code, msg) {
                                alert(msg);
                            })

                    },
                    //ids


                    "save": function () {

                        $scope.ids = [];
                        _.each($scope.pageList, function (role, index) {
                            if (role.selected == true) {
                                $scope.ids.push(role.id);
                            }
                        });
                        $scope.ids = $scope.ids.join(",");
                        var tempParam = {
                            "roleId": $scope.isRoleId,
                            "menuId": $scope.isMenuId
                        };
                        if ( $scope.ids) {
                            tempParam.ids =  $scope.ids
                        }
                        $.when(roleRelevanceMenuButtonAddService.sendRequest(tempParam))
                            .done(function (result) {
                                alert(result.msg)
                            })
                            .fail(function (code, msg) {
                                alert(msg);
                            })

                    }

                };

                $scope.menuConfig = MenuConfig.menu;

                $scope.params = {
                    deptId: 0,
                    departmentName: ""
                }
                $scope.operate = {

                    "modal": $("#addMJModal"),
                    "open": function (id) {
                        $scope.params.deptId = id;
                        this.modal.modal({});

                    }, "save": function () {
                        $.when(roleAddService.sendRequest({
                                "deptId": $scope.params.deptId,
                                "departmentName": $scope.params.departmentName
                            }))
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

