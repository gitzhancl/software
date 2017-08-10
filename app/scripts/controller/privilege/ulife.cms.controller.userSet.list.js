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
        'ulife.api.role.user.query',
        'ulife.api.role.pwd.reset',
        'ulife.api.role.user.get',
        'ulife.api.role.user.update',
        'ulife.api.role.dept.query.role',

        'ulife.cms.directive.datepicker',
        'ulife.cms.directive.tooltip',
        'ulife.cms.directive.dateformat',
        "ulife.cms.service.valid",
        'ulife.cms.service.authority'

    ],
    function (app, services, BizConfig, MenuConfig, roleUserQuery, rolePwdReset, roleDeptList, roleUserGet, roleUserUpdate, roleDeptQueryRole) {

        roleUserQuery.injectTo(app);
        rolePwdReset.injectTo(app);
        roleDeptList.injectTo(app);
        roleUserGet.injectTo(app);
        roleUserUpdate.injectTo(app);
        roleDeptQueryRole.injectTo(app);

        app.filter('isBusiness', function () {
            return function (val) {
                switch (val) {
                    case 1 :
                        return '是';
                    case 0 :
                        return '否';
                }
            }
        });
        app.filter('isDelete', function () {
            return function (val) {
                switch (val) {
                    case 0 :
                        return '有效';
                    case 1 :
                        return '无效';
                }
            }
        });

        app.filter('isEpiboly', function () {
            return function (val) {
                switch (val) {
                    case 0 :
                        return '否';
                    case 1 :
                        return '是';
                }
            }
        });

        app.controller('UserSetCtrl', ['$scope', '$location', '$route',
            'roleUserQueryService', 'rolePwdResetService', 'roleDeptListService', 'roleUserGetService', 'roleUserUpdateService', 'roleDeptQueryRoleService',
            'validService',     'authorityService',

            function ($scope, $location, $route, roleUserQueryService, rolePwdResetService, roleDeptListService,
                      roleUserGetService, roleUserUpdateService, roleDeptQueryRoleService,validService) {

                $scope.menuConfig = MenuConfig.menu;


                $scope.isEpiboly = [
                    {'key': '否', 'value': 0},
                    {'key': '是', 'value': 1}
                ];
 $scope.isDelete = [
                    {'key': '请选择', 'value': null},
                    {'key': '有效', 'value': 0},
                    {'key': '无效', 'value': 1}
                ];

                $scope.isBusiness = [
                    {'key': '请选择', 'value': null},
                    {'key': '是', 'value': 1},
                    {'key': '否', 'value': 0}
                ];
                $.when(roleDeptListService.sendRequest())
                    .done(function (result) {

                        $scope.dataForTheTree = result.value;
                        _.each($scope.dataForTheTree, function (dept1, index) {
                            if (_.isArray(dept1.second)) {
                                dept1.second.unshift({
                                    id: 0,
                                    name: '请选择'
                                })
                            }
                            $scope.deptMap[dept1.id] = dept1;

                            $scope.department2[dept1.id] = dept1.second;
                            _.each(dept1.second, function (dept2) {
                                if (_.isArray(dept2.second)) {
                                    dept2.second.unshift({
                                        id: 0,
                                        name: '请选择'
                                    })
                                }
                                $scope.department3[dept2.id] = dept2.second;

                                $scope.deptMap2[dept2.id] = dept2;

                                _.each(dept2.second, function (dept3) {
                                    $scope.deptMap3[dept3.id] = dept3;
                                })

                            })
                        })

                        $scope.deptMap && $scope.deptMap2 && ($scope.deptMap = $.extend({}, $scope.deptMap, $scope.deptMap2));
                        $scope.deptMap && $scope.deptMap3 && ($scope.deptMap = $.extend({}, $scope.deptMap, $scope.deptMap3));

                        $scope.$apply();
                    })
                    .fail(function (code, msg) {
                        alert(msg);
                    })

                $scope.department2 = {};
                $scope.department3 = {};

                $scope.deptMap = {};
                $scope.deptMap2 = {};
                $scope.deptMap3 = {};

                $scope.res = {
                    loginName: "",
                    isBusiness: 0,
                    isDelete: 0,
                    deptId: 0,
                    departmentId: '',
                    departmentId1: 0,
                    departmentId2: 0,
                    departmentId3: 0,
                    roleId: 0,
                    isEpiboly:null,
                    email:""

                };


                $scope.searchRoles = function (deptId) {
                    if ($scope.res.departmentId3 !== undefined) {
                        $scope.res.departmentId = $scope.res.departmentId3;
                    } else if ($scope.res.departmentId2 !== undefined) {
                        $scope.res.departmentId = $scope.res.departmentId2;
                    } else if ($scope.res.departmentId1 !== undefined) {
                        $scope.res.departmentId = $scope.res.departmentId1;
                    }


                    var resList = []
                    $.when(roleDeptQueryRoleService.sendRequest({"deptId": deptId}))
                        .done(function (result) {
                            var roleList = [];
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
                $scope.userEditForm={};
                $scope.editPage = {

                    "modal": $("#editMJModal"),
                    "open": function (id) {


                        $.when(roleUserGetService.sendRequest({"id": id}))
                            .done(function (result) {
                                $scope.res = result;

                                if ($scope.res.deptId !== 0) {
                                    $scope.res.departmentId3 = $scope.res.deptId;
                                    $scope.res.departmentId2 = $scope.res.deptId;
                                    $scope.res.departmentId1 = $scope.res.deptId;


                                    $scope.deptMap[$scope.res.deptId] &&
                                    $scope.deptMap[$scope.res.deptId].parentId > 0 &&
                                    ($scope.res.departmentId1 = $scope.deptMap[$scope.res.deptId].parentId) &&
                                    $scope.deptMap[$scope.deptMap[$scope.res.deptId].parentId] && $scope.deptMap[$scope.deptMap[$scope.res.deptId].parentId].parentId > 0 &&
                                    ($scope.res.departmentId1 = $scope.deptMap[$scope.deptMap[$scope.res.deptId].parentId].parentId) &&
                                    ($scope.res.departmentId2 = $scope.deptMap[$scope.res.deptId].parentId);


                                    $.when(roleDeptQueryRoleService.sendRequest({"deptId": $scope.res.deptId}))
                                        .done(function (result) {
                                            $scope.roleList = result.value;
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
                        this.modal.modal({});

                    },

                    "edit": function () {

                        if ($scope.res.departmentId1 !== undefined) {
                            $scope.res.departmentId = $scope.res.departmentId1;
                        }
                        if ($scope.res.departmentId1 && $scope.department2[$scope.res.departmentId1].length > 1 && $scope.res.departmentId2 !== undefined) {
                            $scope.res.departmentId = $scope.res.departmentId2;

                            if ($scope.res.departmentId2 && $scope.department3[$scope.res.departmentId2].length > 1 && $scope.res.departmentId3 !== undefined) {
                                $scope.res.departmentId = $scope.res.departmentId3;
                            }
                        }

                        if (!validService.valid($scope.userEditForm)) {
                            return;
                        }

                        $.when(roleUserUpdateService.sendRequest($scope.res))
                            .done(function (result) {
                                alert(result.msg)
                                window.location.reload()
                            })
                            .fail(function (code, msg) {
                                alert(msg);
                            })
                    }
                };

                $scope.addPage = {
                    "modal": $("#delModal"),
                    "open": function (loginName) {
                        $scope.res.loginName = loginName;
                        this.modal.modal({});
                    },
                    "resetPwd": function () {
                        $.when(rolePwdResetService.sendRequest({"loginName": $scope.res.loginName}))
                            .done(function (result) {
                                alert(result.msg)
                                window.location.reload();
                            })
                            .fail(function (code, msg) {
                                alert(msg);
                            })
                    }

                }
                $scope.renderObj = {

                    loginName: "",
                    isBusiness: 0,
                    isDelete: 0,
                    deptId: 0,
                    departmentId: '',
                    departmentId1: 0,
                    departmentId2: 0,
                    departmentId3: 0,
                    roleId: 0,
                    isEpiboly:null,
                    email:""
                };
                $scope.searchPage = {
                    "pageSize": 10,  //页大小
                    "pageNum": 1,   //当前页码
                    "pageTotal": 1,  //页面数量
                    "pageCount": 1, //数据个数
                    "pageShow": [],
                    "params": {
                        //"deptId": null,
                        "departmentId": null,
                        "roleId": null,
                        "name": "",
                        "loginName": "",
                        "isDelete": null,
                        "page": 1,
                        rows: 10
                    },

                    "search": function () {
                        this.params.page = 1;
                        this.params.rows = this.pageSize;
                        this.getData();
                    },
                    "getData": function () {
                        var tmpParams = {};
                        _.each(this.params, function (value, key, list) {
                            if (!!value) {
                                tmpParams[key] = value;
                            }
                        });

                        if ($scope.searchPage.departmentId3 !== undefined) {
                            $scope.searchPage.params.departmentId = $scope.searchPage.departmentId3;
                        } else if ($scope.searchPage.departmentId2 !== undefined) {
                            $scope.searchPage.params.departmentId = $scope.searchPage.departmentId2;
                        } else if ($scope.searchPage.departmentId1 !== undefined) {
                            $scope.searchPage.params.departmentId = $scope.searchPage.departmentId1;
                        }


                        tmpParams.rows = this.pageSize;
                        tmpParams.page = this.pageNum;

                        var that = this;
                        //获取页面列表
                        $.when(roleUserQueryService.sendRequest(tmpParams))
                            .done(function (result) {
                                $scope.renderObj = result;

                                //处理分页信息
                                that.pageCount = result.count;
                                that.pageTotal = Math.ceil(that.pageCount / that.pageSize);

                                $scope.$apply();
                            })
                            .fail(function (code, msg) {
                                alert(msg);
                            })
                    },
                    "goto": function (pageNum) {
                        this.pageNum = pageNum;
                        if (!!pageNum && _.isNumber(pageNum) && pageNum > 0) {
                            this.params.from = this.pageSize * (pageNum - 1);
                        }
                        this.getData()

                    },
                    "pre": function () {
                        if (this.pageNum == 1) {
                            this.params.page = this.pageTotal;
                        } else {
                            this.params.page--;
                        }
                        this.pageNum = this.params.page;
                        this.getData();
                    },
                    "next": function () {
                        if (this.pageNum == this.pageTotal) {
                            this.params.page = 1;
                        } else {
                            this.params.page++;
                        }
                        this.pageNum = this.params.page;
                        this.getData();
                    }
                }

                $scope.searchPage.search();

            }
        ]);

    });

