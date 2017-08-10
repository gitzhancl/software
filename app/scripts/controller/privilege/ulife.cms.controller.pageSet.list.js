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

        'ulife.api.role.menu.list',
        'ulife.api.role.menu.add',
        'ulife.api.role.menu.update',
        'ulife.api.role.menu.delete',

        'ulife.cms.directive.datepicker',
        'ulife.cms.directive.tooltip',
        'ulife.cms.directive.dateformat',
        "ulife.cms.service.valid",         
        "ulife.cms.service.authority"

    ],
    function (app, services, BizConfig, MenuConfig,roleMenuList,roleMenuAdd,roleMenuUpdate,roleMenuDelete) {

        roleMenuList.injectTo(app);
        roleMenuAdd.injectTo(app);
        roleMenuUpdate.injectTo(app);
        roleMenuDelete.injectTo(app);
        app.controller('MenuList', ['$scope', '$location', '$route','roleMenuListService','roleMenuAddService',
            'validService','roleMenuUpdateService','roleMenuDeleteService', 'authorityService',

            function ($scope, $location, $route,roleMenuListService,roleMenuAddService,validService,roleMenuUpdateService,roleMenuDeleteService) {



                $scope.treeOptions = {
                    nodeChildren: "children",
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



                $.when(roleMenuListService.sendRequest())
                    .done(function (result) {
                        $scope.dataForTheTree1=result.value;
                        if ($scope.dataForTheTree1.length > 0) {
                            for (var i = 0; $scope.dataForTheTree1.length > i; i++) {

                                $scope.dataForTheTree1[i].layer = 1;
                                if ($scope.dataForTheTree1[i].isDelete === 1) {
                                    //第二层
                                    if ($scope.dataForTheTree1[i].children.length > 0) {
                                        for (var j = 0; $scope.dataForTheTree1[i].children.length > j; j++) {
                                            $scope.dataForTheTree1[i].children[j].layer = 2;
                                            if ($scope.dataForTheTree1[i].children[j].isDelete === 1) {
                                                //第三层
                                                if ($scope.dataForTheTree1[i].children[j].children.length > 0) {
                                                    for (var s = 0; $scope.dataForTheTree1[i].children[j].children.length > s; s++) {
                                                        $scope.dataForTheTree1[i].children[j].children[s].layer = 3;
                                                        $scope.dataForTheTree1[i].children[j].children[s].isDelete = 1;
                                                    }
                                                }
                                            } else {
                                                $scope.dataForTheTree1[i].children[j].isDelete = 1;
                                            }
                                        }
                                    }
                                }else{
                                    //第一层启用后第二层
                                    if ($scope.dataForTheTree1[i].children.length > 0) {
                                        for (var j = 0; $scope.dataForTheTree1[i].children.length > j; j++) {
                                            $scope.dataForTheTree1[i].children[j].layer = 2;
                                        }
                                    }



                                }

                            }
                        }

                        $scope.$apply();
                    })
                    .fail(function (code, msg) {
                        alert(msg);
                    });


                $scope.menuConfig = MenuConfig.menu;


     /*           // 默认展开的叶子
                $scope.expandedNodes = [
                    $scope.dataForTheTree1[0],
                    $scope.dataForTheTree1[1],
                    $scope.dataForTheTree1[2],
                    $scope.dataForTheTree1[3],
                    $scope.dataForTheTree1[4],
                    $scope.dataForTheTree1[5]
                ];*/

                $scope.operate1 = {
                    "modal": $("#addMJModal1"),
                    "open": function () {
                        //if(     $scope.dataForTheTree1.length>0){
                        //    alert("已有一级部门！")
                        //    return;
                        //}
                        this.modal.modal({});
                    },
                    "save": function () {
                        if (!validService.valid($scope.menuSet1)) {
                            return;
                        }
                        $.when(roleMenuAddService.sendRequest({"menuId": 0, "menuName": $scope.menu.menuName,"sort": $scope.menu.sort}))
                            .done(function (result) {
                                alert(result.msg)
                                window.location.reload();
                            })
                            .fail(function (code, msg) {
                                alert(msg);
                            })
                    }
                },

                    $scope.operate2 = {
                        "modal": $("#addMJModal2"),
                        "create": function (id) {
                            $scope.id = id;
                            this.modal.modal({});
                        },
                        "save": function () {
                            if (!validService.valid($scope.menuSet2)) {
                                return;
                            }
                            $.when(roleMenuAddService.sendRequest({"menuId":  $scope.id ,"menuName": $scope.menu.menuName,"sort": $scope.menu.sort}))
                                .done(function (result) {
                                    alert(result.msg);
                                    window.location.reload();
                                })
                                .fail(function (code, msg) {
                                    alert(msg);
                                })
                        }
                    },
                    $scope.operate3 = {
                        "modal": $("#editMJModal3"),
                        "edit": function (id,name,sort) {
                            $scope.id = id;
                            $scope.menu={};
                            $scope.menu.menuName = name;
                            $scope.menu.sort = sort;
                            if($scope.menu.sort ===undefined){
                                $scope.menu.sort = 1;
                            }
                            this.modal.modal({});
                        },
                        "save": function () {
                            if (!validService.valid($scope.menuSet3)) {
                                return;
                            }
                            debugger
                            $.when(roleMenuUpdateService.sendRequest({"menuId":  $scope.id ,"menuName": $scope.menu.menuName,"sort": $scope.menu.sort}))
                                .done(function (result) {
                                    alert(result.msg);
                                    window.location.reload();
                                })
                                .fail(function (code, msg) {
                                    alert(msg);
                                })
                        }
                    },


                    $scope.operate4 = {
                        "delete": function (id,isDelete) {
                            $.when(roleMenuDeleteService.sendRequest({"menuId": id,"isDelete":isDelete}))
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

