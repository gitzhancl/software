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
        'ulife.api.role.relevance.menu',
        'ulife.api.role.relevance.list',


        'ulife.cms.directive.datepicker',
        'ulife.cms.directive.tooltip',
        'ulife.cms.directive.dateformat',
        "ulife.cms.service.authority"

    ],
    function(app, services, BizConfig, MenuConfig,roleMenuList,roleRelevanceMenu,roleRelevanceList) {

        roleMenuList.injectTo(app);
        roleRelevanceMenu.injectTo(app);
        roleRelevanceList.injectTo(app);



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


        app.controller('PageAdminCtrl', ['$scope', '$location', '$route','roleMenuListService','roleRelevanceMenuService','roleRelevanceListService', 'authorityService',

            function($scope, $location, $route,roleMenuListService,roleRelevanceMenuService,roleRelevanceListService) {

                $.when(roleMenuListService.sendRequest())
                    .done(function (result) {
                        $scope.dataForTheTree = result.value;
                        $scope.$apply();
                    })
                    .fail(function (code, msg) {
                        alert(msg);
                    })

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
                    }
                };
  /*              var nodeList = [];
                $scope.selectedMenu = function (node, selected) {

                    $scope.selectedNodes = [];
                    if (!selected) {
                        delete nodeList[node.id];
                        //debugger;
                    } else {
                        nodeList.push(node.id);
                    }
                    //$scope.$apply();
                };*/
                $scope.selectedMenu={
                    id:0
                }
                $scope.selectedMenus = function (node, selected) {
                    $scope.selectedMenu.id= node.id;
                    debugger
                    if (selected) {
                        //$scope.selectedMenuList = node.role;
                        //查看页面关联角色
                        $.when(roleRelevanceMenuService.sendRequest({"menuId": $scope.selectedMenu.id}))
                            .done(function (result) {
                                $scope.menuRoles = result.value;
                                if( $scope.menuRoles===undefined){
                                    $scope.menuRoles={};
                                }
                                $scope.$apply();
                            })
                            .fail(function (code, msg) {
                                alert(msg);
                            })
                    } else {

                        //$scope.selectedRoleList = [];
                        $scope.menuRoles={};
                        $scope.$apply();
                    }

                };


//查看页面角色关联的用户和控件
                $scope.pageUser=[];
                $scope.pageList = [];
                $scope.changeMenu = function (id) {
                    $scope.isRoleId = id;
                    $.when(roleRelevanceListService.sendRequest({"menuId":$scope.selectedMenu.id,"roleId":id}))
                        .done(function (result) {
                            $scope.pageList =result.buttonList;
                            $scope.pageUser=result.userList;
                            debugger
                            //$scope.menuRoles = result.value;


                            $scope.$apply();
                        })
                        .fail(function (code, msg) {
                            alert(msg);
                        })
                }

                $scope.menuConfig = MenuConfig.menu;

/*
                // 默认展开的叶子
                $scope.expandedNodes = [
                    $scope.dataForTheTree[0],
                    $scope.dataForTheTree[1],
                    $scope.dataForTheTree[2],
                    $scope.dataForTheTree[3],
                    $scope.dataForTheTree[4],
                    $scope.dataForTheTree[5]
                ];*/
                $scope.btns = {
                    "reset": function () {

                    },
                    "del": function () {
                        alert("此条删除！")
                    }/*,
                    "accredit": function (id,name) {
                        $.when(roleRelevanceMenuService.sendRequest({"menuId":id}))
                            .done(function (result) {
                                $scope.menuRoles = result.value;
                                $scope.$apply();
                            })
                            .fail(function (code, msg) {
                                alert(msg);
                            })


                    }
*/

                };

            }
        ]);

    });

