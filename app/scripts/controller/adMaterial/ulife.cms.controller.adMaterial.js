/**
 * @author zhanchanglei
 * @date 2016-05-09
 */

define([
        'ulife.cms.module.myApp',
        'ulife.framework.services',
        'ulife.cms.business.config',
        'ulife.cms.menu.config',

        'ulife.api.ad.material.queryList',
        'ulife.api.ad.material.get',
        'ulife.api.ad.material.switch',
        'ulife.api.ad.material.delete',
    'ulife.api.ad.material.addOrEdit',

        'ulife.cms.directive.datepicker',
        'ulife.cms.directive.tooltip',
        'ulife.cms.directive.dateformat',
        "ulife.cms.service.authority",
        "ulife.cms.service.valid"

    ],
    function (app, services, BizConfig, MenuConfig, adMaterialQueryList, adMaterialGet, adMaterialSwitch, adMaterialDelete,adMaterialAddOrEdit) {

        adMaterialQueryList.injectTo(app);
        adMaterialGet.injectTo(app);
        adMaterialSwitch.injectTo(app);
        adMaterialDelete.injectTo(app);
        adMaterialAddOrEdit.injectTo(app);

        app.filter('status', function () {
            return function (val) {
                switch (val) {
                    case 1 :
                        return '启用中';
                    case 2 :
                        return '已停用';
                }
            }
        });
        app.filter('isDefault', function () {
            return function (val) {
                switch (val) {
                    case 1 :
                        return '是';
                    case 2 :
                        return '否';
                }
            }
        });
        app.filter('qqq', function () {
            return function (val) {
                switch (val) {
                    case 1 :
                        return 'blue';
                    case 2 :
                        return '';
                }
            }
        });
        app.controller('adMaterials', ['$scope', '$location', '$route',
            'adMaterialQueryListService', 'adMaterialGetService', 'adMaterialSwitchService',  'adMaterialDeleteService','adMaterialAddOrEditService',  'validService','authorityService',

            function ($scope, $location, $route, adMaterialQueryListService, adMaterialGetService, adMaterialSwitchService,
                      adMaterialDeleteService,adMaterialAddOrEditService,validService) {
                //
                $scope.bannerType = [
                    {'key': '所有', 'value': ''},
                    {'key': '注册页', 'value': '注册页'},
                    {'key': '登录页', 'value': '登录页'},
                    {'key': '404页', 'value': '404页'},
                    {'key': '置顶通栏', 'value': '置顶通栏'},
                    {'key': '吃货团', 'value': '吃货团'},
                    {'key': '卡券兑换', 'value': '卡券兑换'}
                ];
                $scope.type = [
                    {'key': '注册页', 'value': '注册页'},
                    {'key': '登录页', 'value': '登录页'},
                    {'key': '404页', 'value': '404页'},
                    {'key': '置顶通栏', 'value': '置顶通栏'},
                    {'key': '吃货团', 'value': '吃货团'},
                    {'key': '卡券兑换', 'value': '卡券兑换'}
                ];
                $scope.status = [
                    {'key': '所有', 'value': null},
                    {'key': '启用中', 'value': 1},
                    {'key': '已停用', 'value': 2}
                ];
                $scope.isDefault = [
                    {'key': '所有', 'value': null},
                    {'key': '是', 'value': 1},
                    {'key': '否', 'value': 2}
                ];
                $scope.menuConfig = MenuConfig.menu;
                $scope.saveParams = {
                    "id": 0,
                    "imagesUrl": '',
                    "isDefault": null,
                    "modifyTime": moment().format("x"),
                    "status": null,
                    "title": '',
                    "type":'',
                    "isDelete": 0,
                    "skipUrl":''

                };

                $scope.editParams = {
                    "id": 0,
                    "imagesUrl": '',
                    "isDefault": null,
                    "modifyTime": moment().format("x"),
                    "status": null,
                    "title": '',
                    "type":'',
                    "isDelete": 0,
                    "skipUrl":''

                };

                $scope.searchPage = {
                    "pageSize": 15,  //页大小
                    "pageNum": 1,   //当前页码
                    "pageTotal": 1,  //页面数量
                    "pageCount": 1, //数据个数
                    //"pageShow": [],
                    "params": {
                        "id": 0,
                        "imagesUrl": '',
                        "isDefault": null,
                        "modifyTime": moment().format("x"),
                        "status": null,
                        "title": '',
                        "isDelete": 0,
                        "skipUrl":'',
                        "type":'',
                        "page": 1,
                        "rows": 15
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
                        tmpParams.rows = this.pageSize;
                        tmpParams.page = this.params.page;

                        var that = this;
                        //获取页面列表
                        $.when(adMaterialQueryListService.sendRequest(tmpParams))
                            .done(function (result) {
                                $scope.renderObj = result.adMaterialInfos;

                                //处理分页信息
                                that.pageCount = result.count;
                                that.pageTotal = Math.ceil(result.count / that.pageSize);

                                $scope.$apply();
                            })
                            .fail(function () {
                            })
                    },
                    "goto": function (pageNum) {
                        this.pageNum = pageNum;
                        if (!!pageNum && _.isNumber(pageNum) && pageNum > 0) {
                            this.params.page = this.pageSize * (pageNum - 1);
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

                };
                $scope.btns = {
                    "modal": $("#editMJModal"),
                    "open": function (id) {
                        if(id>0){
                            $.when(adMaterialGetService.sendRequest({"id":id}))
                                .done(function (result) {
                                    $scope.type.value=result.type ;
                                   $scope.editParams=result;
                                    $scope.$apply();
                                })
                                .fail(function (code, msg) {
                                    alert(msg);
                                })
                        }
                        $scope.editParams.id = id;
                        $scope.$apply();
                        this.modal.modal({});
                    },
                    "save": function () {

                        if (!validService.valid($scope.editFrom1)) {
                            return;
                        }
                        $.when(adMaterialAddOrEditService.sendRequest({"id": $scope.editParams.id,"type":$scope.editParams.type,"title":$scope.editParams.title,"imagesUrl":$scope.editParams.imagesUrl,"skipUrl":$scope.editParams.skipUrl}))
                            .done(function (result) {
                                alert(result.msg);
                                window.location.reload();
                            })
                            .fail(function (code, msg) {
                                alert(msg);
                            })

                    }
                }

                $scope.btns1 = {
                    "modal": $("#addMJModal"),
                    "open": function (id) {
                        $scope.saveParams.id = id;
                        $scope.$apply();
                        this.modal.modal({});
                    },
                    "save": function () {

                        if (!validService.valid($scope.addFrom1)) {
                            return;
                        }
                        $.when(adMaterialAddOrEditService.sendRequest({"id": $scope.saveParams.id,"type":$scope.saveParams.type,"title":$scope.saveParams.title,"imagesUrl":$scope.saveParams.imagesUrl,"skipUrl":$scope.saveParams.skipUrl}))
                            .done(function (result) {
                                alert(result.msg);
                                window.location.reload();
                            })
                            .fail(function (code, msg) {
                                alert(msg);
                            })

                    }
                }

                $scope.isDelete = {
                    "modal": $("#delMJModal"),
                    "open": function (id,isDefault) {
                        if(isDefault==1){
                            alert("不能删除默认配置！")
                            return false;
                        }
                        $scope.saveParams.id = id;
                        $scope.$apply();
                        this.modal.modal({});
                    },
                    "del": function () {
                        $.when(adMaterialDeleteService.sendRequest({"id": $scope.saveParams.id}))
                            .done(function (result) {
                                alert(result.msg);
                                window.location.reload();
                            })
                            .fail(function (code, msg) {
                                alert(msg);
                            })

                    }
                }

                $scope.switch = {
                    "modal": $("#switchMJModal"),
                    "open": function (id,status) {
                        $scope.saveParams.id = id;
                        $scope.saveParams.status = status;
                        $scope.$apply();
                        this.modal.modal({});
                    },
                    "no": function () {
                        $.when(adMaterialSwitchService.sendRequest({"id": $scope.saveParams.id,"status":$scope.saveParams.status}))
                            .done(function (result) {
                                alert(result.msg);
                                window.location.reload();
                            })
                            .fail(function (code, msg) {
                                alert(msg);
                            })

                    }
                }


                $scope.searchPage.search();


            }
        ]);

    });

