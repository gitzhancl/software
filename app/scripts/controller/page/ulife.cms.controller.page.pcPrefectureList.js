/**
 * @author zhanchanglei
 * @date 2016-05-09
 */

define([
        'ulife.cms.module.myApp',
        'ulife.framework.services',
        'ulife.cms.business.config',
        'ulife.cms.menu.config',

        'ulife.api.pc.prefecture.queryList',
        'ulife.api.pc.prefecture.get',
        'ulife.api.pc.prefecture.switch',
         'ulife.api.pc.prefecture.addOrEdit',

        'ulife.cms.directive.datepicker',
        'ulife.cms.directive.tooltip',
        'ulife.cms.directive.dateformat',
        "ulife.cms.service.authority",
        "ulife.cms.service.valid"

    ],
    function (app, services, BizConfig, MenuConfig, pcPrefectureQueryList, pcPrefectureGet, pcPrefectureSwitch,pcPrefectureAddOrEdit) {

        pcPrefectureQueryList.injectTo(app);
        pcPrefectureGet.injectTo(app);
        pcPrefectureSwitch.injectTo(app);
        pcPrefectureAddOrEdit.injectTo(app);

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
        app.controller('pcPrefecture', ['$scope', '$location', '$route',
            'pcPrefectureQueryListService', 'pcPrefectureGetService', 'pcPrefectureSwitchService', 'pcPrefectureAddOrEditService',  'validService','authorityService',

            function ($scope, $location, $route, pcPrefectureQueryListService, pcPrefectureGetService, pcPrefectureSwitchService,pcPrefectureAddOrEditService,validService) {

                $scope.status = [
                    {'key': '所有', 'value': null},
                    {'key': '启用中', 'value': 1},
                    {'key': '已停用', 'value': 2}
                ];

                $scope.spareFields = [
                    {'key': 'B2C', 'value': 'B2C'},
                    {'key': 'B2G', 'value': 'B2G'}
                ];

                $scope.menuConfig = MenuConfig.menu;
                $scope.saveParams = {
                    "id": 0,
                    "imagesUrl": null,
                    "modifyTime": moment().format("x"),
                    "status": null,
                    "title": '',
                    "sort":null,
                    "skipUrl":'',
                    "spareFields":""

                };

                $scope.editParams = {
                    "id": 0,
                    "imagesUrl": null,
                    "modifyTime": moment().format("x"),
                    "status": null,
                    "title": '',
                    "sort":null,
                    "skipUrl":'',
                    "spareFields":""

                };

                $scope.searchPage = {
                    "pageSize": 15,  //页大小
                    "pageNum": 1,   //当前页码
                    "pageTotal": 1,  //页面数量
                    "pageCount": 1, //数据个数
                    //"pageShow": [],
                    "params": {
                        "status": null,
                        "title": '',
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
                        $.when(pcPrefectureQueryListService.sendRequest(tmpParams))
                            .done(function (result) {
                                $scope.renderObj = result.pcPrefectureInfoList;

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
                            $.when(pcPrefectureGetService.sendRequest({"id":id}))
                                .done(function (result) {
                                   $scope.editParams=result;
                                    $scope.$apply();
                                })
                                .fail(function (code, msg) {
                                    alert(msg);
                                })
                        }
                        $scope.editParams.id = id;
                        this.modal.modal({});
                    },
                    "save": function () {

                        if (!validService.valid($scope.editFrom1)) {
                            return;
                        }
                        $.when(pcPrefectureAddOrEditService.sendRequest({"id": $scope.editParams.id,"sort":$scope.editParams.sort,"title":$scope.editParams.title,"imagesUrl":$scope.editParams.imagesUrl,"skipUrl":$scope.editParams.skipUrl, "spareFields":$scope.editParams.spareFields}))
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
                        this.modal.modal({});
                    },
                    "save": function () {

                        if (!validService.valid($scope.addFrom1)) {
                            return;
                        }
                        $.when(pcPrefectureAddOrEditService.sendRequest({"id": $scope.saveParams.id,"sort":$scope.saveParams.sort,"title":$scope.saveParams.title,"imagesUrl":$scope.saveParams.imagesUrl,"skipUrl":$scope.saveParams.skipUrl, "spareFields":$scope.saveParams.spareFields}))
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
                        $.when(pcPrefectureSwitchService.sendRequest({"id": $scope.saveParams.id,"status":$scope.saveParams.status}))
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

