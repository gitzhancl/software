/**
 * @author zhanchanglei
 * @date 2016-05-09
 */

define([
        'ulife.cms.module.myApp',
        'ulife.framework.services',
        'ulife.cms.business.config',
        'ulife.cms.menu.config',

        'ulife.api.cms.userBlackList.list',
        'ulife.api.cms.userBlackList.delete',
        'ulife.api.cms.userBlackList.add',

        'ulife.cms.directive.datepicker',
        'ulife.cms.directive.tooltip',
        'ulife.cms.directive.dateformat',
        "ulife.cms.service.valid",
        "ulife.cms.service.authority"

    ],
    function (app, services, BizConfig, MenuConfig, cmsUserBlackListList, cmsUserBlackListDelete, cmsUserBlackListAdd) {

        cmsUserBlackListList.injectTo(app);
        cmsUserBlackListDelete.injectTo(app);
        cmsUserBlackListAdd.injectTo(app);

        app.controller('userBlackListCtrl', ['$scope', '$location', '$route',
            'cmsUserBlackListListService', 'validService', 'cmsUserBlackListDeleteService', 'cmsUserBlackListAddService',
            'authorityService',

            function ($scope, $location, $route, cmsUserBlackListListService, validService, cmsUserBlackListDeleteService, cmsUserBlackListAddService) {

                $scope.menuConfig = MenuConfig.menu;
                $scope.addSaveParams = {
                    "loginName": '',
                    "description": '',
                    "newCreator": ''

                };
                $('.checkAll').click(function () {
                    var that = this;
                    _.each($scope.renderObj, function (item, index) {
                        item.checked = $(that).prop("checked")
                    })
                    $scope.$apply();
                });
                $(".clientList").click(function () {

                    $('.checkAll').prop('checked', ($(".clientList").length == $(".clientList:checked").length));

                })

                $scope.searchPage = {
                    "pageSize": 15,  //页大小
                    "pageNum": 1,   //当前页码
                    "pageTotal": 1,  //页面数量
                    "pageCount": 1, //数据个数
                    //"pageShow": [],
                    "params": {
                        "loginName": '',
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
                        $.when(cmsUserBlackListListService.sendRequest(tmpParams))
                            .done(function (result) {
                                $scope.renderObj = result.userBlackListInfos;
                                if($scope.renderObj){
                                    _.each($scope.renderObj, function (user, index) {
                                        user.checked=false;
                                    });
                                }

                                //处理分页信息
                                that.pageCount = result.count;
                                that.pageTotal = Math.ceil(result.count / that.pageSize);

                                $scope.$apply();
                            })
                            .fail(function () {
                            })
                    },
                    "cmsUserBlackListDel": function () {
                        $scope.ids1=[];
                         _.filter($scope.renderObj, function (item, index) {
                            if (item.checked != undefined && item.checked) {
                                $scope.ids1.push(item.id);
                            } else {
                                return false
                            }

                        })
                        $scope.ids1 = $scope.ids1.join(",");
                        //alert($scope.ids1)
                        $.when(cmsUserBlackListDeleteService.sendRequest({"ids": $scope.ids1}))
                            .done(function (result) {
                                alert(result.msg);
                                window.location.reload();
                            })
                            .fail(function (code, msg) {
                                alert(msg);
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
                    "modal": $("#addMJModal"),
                    "open": function () {

                        this.modal.modal({});
                    },
                    "save": function () {

                        if (!validService.valid($scope.addUserFrom)) {
                            return;
                        }

                        $.when(cmsUserBlackListAddService.sendRequest($scope.addSaveParams))
                            .done(function (result) {
                                alert(result.msg)
                                window.location.reload();
                            })
                            .fail(function (code, msg) {
                                alert(msg);
                            })

                    }


                };

                $scope.btns1 = {
                    "modal": $("#delMJModal"),
                    "open": function (id) {
                        $scope.deleteId = id;

                        this.modal.modal({});
                    },
                    "save": function () {
                        $scope.ids = [];
                        if ($scope.deleteId) {
                            $scope.ids.push($scope.deleteId);
                        }

                        $scope.ids = $scope.ids.join(",");
                        $.when(cmsUserBlackListDeleteService.sendRequest({"ids": $scope.ids}))
                            .done(function (result) {
                                alert(result.msg);
                                window.location.reload();
                            })
                            .fail(function (code, msg) {
                                alert(msg);
                            })

                    }

                };

                $scope.searchPage.search();


            }
        ]);

    });

