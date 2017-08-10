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
        'ulife.api.role.menu.list',
        'ulife.api.role.menu.control.add',
        'ulife.api.role.menu.query.control',

        'ulife.cms.directive.datepicker',
        'ulife.cms.directive.tooltip',
        'ulife.cms.directive.dateformat',

        "ulife.cms.service.authority"

    ],
    function (app, services, BizConfig, MenuConfig, roleMenuList, roleControlList, roleMenuControlAdd,roleMenuQueryControl) {

        roleMenuList.injectTo(app);
        roleControlList.injectTo(app);
        roleMenuControlAdd.injectTo(app);
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

        app.controller('pageCtrl', ['$scope', '$location', '$route', 'roleMenuListService',
            'roleControlListService', 'roleMenuControlAddService','roleMenuQueryControlService', 'authorityService',

            function ($scope, $location, $route, roleMenuListService, roleControlListService, roleMenuControlAddService,roleMenuQueryControlService) {


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
                };
                $scope.roleControlList = {};
                $.when(roleMenuListService.sendRequest())
                  /*  .done(function (result) {
                        $scope.dataForTheTree = result.value;
                        $scope.$apply();
                    })*/
                    .done(function (result) {
                        $scope.menuTheTree=result.value;
                        if ($scope.menuTheTree.length > 0) {
                            for (var i = 0; $scope.menuTheTree.length > i; i++) {

                                $scope.menuTheTree[i].layer = 1;
                                if ($scope.menuTheTree[i].isDelete === 1) {
                                    //第二层
                                    if ($scope.menuTheTree[i].children.length > 0) {
                                        for (var j = 0; $scope.menuTheTree[i].children.length > j; j++) {
                                            $scope.menuTheTree[i].children[j].layer = 2;
                                            if ($scope.menuTheTree[i].children[j].isDelete === 1) {
                                                //第三层
                                                if ($scope.menuTheTree[i].children[j].children.length > 0) {
                                                    for (var s = 0; $scope.menuTheTree[i].children[j].children.length > s; s++) {
                                                        $scope.menuTheTree[i].children[j].children[s].layer = 3;
                                                        $scope.menuTheTree[i].children[j].children[s].isDelete = 1;
                                                    }
                                                }
                                            } else {
                                                $scope.menuTheTree[i].children[j].isDelete = 1;
                                            }
                                        }
                                    }
                                }else{
                                    //第一层启用后第二层
                                    if ($scope.menuTheTree[i].children.length > 0) {
                                        for (var j = 0; $scope.menuTheTree[i].children.length > j; j++) {
                                            $scope.menuTheTree[i].children[j].layer = 2;
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
                $.when(roleControlListService.sendRequest())
                    .done(function (result) {
                        $scope.roleControlList = result.value;

                        _.each($scope.roleControlList, function (role, index) {
                                role.selected = false;
                        });

                        $scope.$apply();
                    })
                    .fail(function (code, msg) {
                        alert(msg);
                    })


                $scope.menuConfig = MenuConfig.menu;


                // 默认展开的叶子
                /*          $scope.expandedNodes = [
                 $scope.dataForTheTree[0],
                 $scope.dataForTheTree[1],
                 $scope.dataForTheTree[2],
                 $scope.dataForTheTree[3],
                 $scope.dataForTheTree[4],
                 $scope.dataForTheTree[5]
                 ];
                 */

                 var nodeList = {};
                 $scope.showSelected = function (node, selected) {
                 $scope.selectedNodes = [];
                 if (!selected) {
                 delete nodeList[node.name];
                 } else {
                 nodeList[node.name] = node.id;
                 }
                 };


                $scope.btns1 = {

                    "modal": $("#delModal"),
                    "del": function () {

                        this.modal.modal({});
                    }
                };
                $scope.btns = {
                    "modal": $("#addMJModal"),
                    "open": function () {
                        this.modal.modal({});
                    },

                    "reset": function () {
                        _.each($scope.roleControlList, function (role, index) {
                            if (role.selected == true) {
                                role.selected = false;
                                //role.isDelete = 1;
                            }
                        });
                        //$scope.$apply();
                    },
                    "accredit": function (id, name) {
                        $.when(roleMenuQueryControlService.sendRequest({"menuId":id}))
                            .done(function (result) {
                                $scope.res = result.value;

                                _.each($scope.roleControlList, function (role, index) {

                                            role.selected = false;

                                });
                                _.each($scope.roleControlList, function (role, index) {
                                    _.each($scope.res , function (res, index) {
                                        if(role.id==res.id){
                                            role.isDelete=0;
                                            role.selected = true;
                                        }

                                    });
                                });
                                $scope.$apply();

                            })
                            .fail(function (code, msg) {
                                alert(msg);
                            })
                        $scope.menuId =null;
                        $scope.menuId = id;
                    },
                    "save": function () {
                        $scope.ids = [];
                        _.each($scope.roleControlList, function (role, index) {
                            if (role.selected == true) {
                                $scope.ids.push(role.id) ;
                            }
                        });
                        $scope.ids =  $scope.ids.join(",");
                        if($scope.menuId ==null){
                            alert("请选择要配置的页面！")
                            return;
                        }
                        $.when(roleMenuControlAddService.sendRequest({"menuId": $scope.menuId, "ids": $scope.ids}))
                            .done(function (result) {
                                alert(result.msg)

                                $.when(roleMenuQueryControlService.sendRequest({"menuId":$scope.menuId}))
                                    .done(function (result) {
                                        $scope.res = result.value;

                                        _.each($scope.roleControlList, function (role, index) {

                                            role.selected = false;

                                        });
                                        _.each($scope.roleControlList, function (role, index) {
                                            _.each($scope.res , function (res, index) {
                                                if(role.id==res.id){
                                                    role.isDelete=0;
                                                    role.selected = true;
                                                }

                                            });
                                        });
                                        $scope.$apply();

                                    })
                                    .fail(function (code, msg) {
                                        alert(msg);
                                    })
                                $scope.menuId =null;
                                $scope.menuId = id;
                                //window.location.reload();
                            })
                            .fail(function (code, msg) {
                                alert(msg);
                            })

                    }


                };

            }
        ]);

    });

