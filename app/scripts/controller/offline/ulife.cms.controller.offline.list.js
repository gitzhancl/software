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

        'ulife.api.bonuscms.offline.list',

        'ulife.cms.directive.datepicker',
        'ulife.cms.directive.tooltip',
        'ulife.cms.directive.dateformat',
        "ulife.cms.service.authority"

    ],
    function(app, services, BizConfig, MenuConfig,bonuscmsOfflineList) {

        bonuscmsOfflineList.injectTo(app);

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

        app.controller('OfflineListCtrl', ['$scope', '$location', '$route', 'bonuscmsOfflineListService', 'authorityService',

            function($scope, $location, $route, bonuscmsOfflineListService) {

                $scope.menuConfig = MenuConfig.menu;

                $scope.renderObj = {};

                $scope.searchPage = {
                    "pageSize": 15,  //页大小
                    "pageNum": 1,   //当前页码
                    "pageTotal": 1,  //页面数量
                    "pageCount": 1, //数据个数
                    "pageShow": [],
                    "params": {
                        "activityName": null,
                        "activityId": null,
                        "activityStartTime": null,
                        "activityEndTime": null
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
                        $.when(bonuscmsOfflineListService.sendRequest(tmpParams))
                            .done(function(result) {
                                if(result.status=='success'){
                                    $scope.offline =JSON.parse( result.message);
                                }

                                //处理分页信息
                                that.pageCount = result.debugMessage;
                                that.pageTotal = Math.ceil(result.debugMessage / that.pageSize);

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
                    }
                };

                $scope.searchPage.search();


            }
        ]);

    });

