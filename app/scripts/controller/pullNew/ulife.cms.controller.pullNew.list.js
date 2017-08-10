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

        'ulife.api.cms.pullNew.list',
        'ulife.api.group.activity.groupCount',

        'ulife.cms.directive.datepicker',
        'ulife.cms.directive.tooltip',
        'ulife.cms.directive.dateformat',
        "ulife.cms.service.authority"

    ],
    function(app, services, BizConfig, MenuConfig, cmsPullNewList,groupCount) {

        cmsPullNewList.injectTo(app);
        groupCount.injectTo(app);

        app.filter('pullNewStatus', function () {
            return function (val) {
                switch (val) {
                    case 1 :
                        return '未开始';
                    case 2 :
                        return '进行中';
                    case 3 :
                        return '已结束';
                }
            }
        });

        app.controller('PullNewListCtrl', ['$scope', '$location', '$route',
            'cmsPullNewListService','groupActivityGroupCountService', 'authorityService',

            function($scope, $location, $route, cmsPullNewListService,groupActivityGroupCountService) {

                $scope.menuConfig = MenuConfig.menu;

                $scope.renderObj = {};

                $scope.groupStatus = [
                    {'key': '不限', 'value': 0},
                    {'key': '未开始', 'value': 1},
                    {'key': '进行中', 'value': 2},
                    {'key': '已结束', 'value': 3}
                ];
                $scope.searchPage = {
                    "pageSize": 15,  //页大小
                    "pageNum": 1,   //当前页码
                    "pageTotal": 1,  //页面数量
                    "pageCount": 1, //数据个数
                    "pageShow": [],
                    "params": {
                        "id": null,
                        "startTime": null,
                        "endTime": null,
                        "activityName": "",
                        "status": 0
                    },
                    "search": function() {
                        this.params.page = 1;
                        this.params.rows = this.pageSize;
                        this.getData();
                    },
                    "getData": function() {
                        var tmpParams = {};
                        _.each(this.params, function(value, key, list) {
                            if(!!value) {
                                tmpParams[key] = value;
                            }
                        });
                        tmpParams.size = this.pageSize;
                        tmpParams.from = (this.pageNum - 1) * this.pageSize;
                        var that = this;
                        //获取页面列表
                        $.when(cmsPullNewListService.sendRequest(tmpParams))
                            .done(function(result) {
                                $scope.renderObj = result;

                                //处理分页信息
                                that.pageCount = result.count;
                                that.pageTotal = Math.ceil(result.count / that.pageSize);

                                $scope.$apply();
                            })
                            .fail(function() {
                            })
                    },
                    "goto": function(pageNum) {
                        this.pageNum = pageNum;
                        if (!!pageNum && _.isNumber(pageNum) && pageNum > 0) {
                            this.params.from = this.pageSize * (pageNum - 1);
                        }
                        this.getData()

                    },
                    "pre": function() {
                        if (this.pageNum == 1) {
                            this.params.page = this.pageTotal;
                        }else{
                            this.params.page--;
                        }
                        this.pageNum = this.params.page;
                        this.getData();
                    },
                    "next": function() {
                        if (this.pageNum == this.pageTotal) {
                            this.params.page = 1;
                        }else {
                            this.params.page++;
                        }
                        this.pageNum = this.params.page;
                        this.getData();
                    },

                    "modal": $("#addMJModal"),
                    "open": function (activityId) {
                        this.modal.modal({});
                        $.when(groupActivityGroupCountService.sendRequest({"activityId": activityId}))
                            .done(function (result) {
                                $scope.groupCount = result;
                                $scope.$apply();
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

