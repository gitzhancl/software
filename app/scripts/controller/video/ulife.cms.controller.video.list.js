/**
 * Created by Ulife on 2016/1/22.
 * @author lu
 * @date 2016-03-25
 */
 define([
        'ulife.cms.module.myApp',
        'ulife.framework.services',
        'ulife.cms.business.config',
        'ulife.cms.menu.config',

        'ulife.api.vod.query',
        'ulife.api.vod.push',

        'ulife.cms.directive.datepicker',
        'ulife.cms.directive.tooltip',
        'ulife.cms.directive.dateformat',

        "ulife.cms.service.authority"

    ],
    function(app, services, BizConfig, MenuConfig, vodQuery, vodPush) {

        vodQuery.injectTo(app);
        vodPush.injectTo(app);

        app.filter('videoType', function () {
            return function (val) {
                switch (val) {
                    case 2 :
                        return '全民食谱';
                    case 3 :
                        return '做道菜';
                    case 4 :
                        return '寻食记';
                    case 5 :
                        return '食验室';
                    default : 
                        return '未知';
                }
            }
        });
        app.filter('videoStatus', function () {
            return function (val) {
                switch (val) {
                    case 0 :
                        return '已创建';
                    case 1 :
                        return '已发布';
                    case -1 :
                        return '已取消';
                    case 2 :
                        return '已上架';
                    default : 
                        return '未知';
                }
            }
        });

        app.controller('VideoListCtrl', ['$scope', '$location', '$route',
            'vodQueryService','vodPushService', 'authorityService',

            function($scope, $location, $route, vodQueryService, vodPushService) {

                $scope.menuConfig = MenuConfig.menu;

                $scope.videoType = [
                    {'key': '全民食谱', 'value': 2},
                    {'key': '做道菜', 'value': 3},
                    {'key': '寻食记', 'value': 4},
                    {'key': '食验室', 'value': 5},
                    {'key': '不限', 'value': ''}
                ];

                $scope.videoStatus = [
                    {'key': '已创建', 'value': 0},
                    {'key': '已发布', 'value': 1},
                    {'key': '已上架', 'value': 2},
                    {'key': '已取消', 'value': -1},
                    {'key': '不限', 'value': 8888}
                ];

                $scope.addPage = {
                    "modal": $("#addMJModal"),
                    "open": function () {
                        this.modal.modal({});
                    },
                    "save": function() {
                        this.modal.modal('hide');
                        this.addPage();
                        this.page = this.oriPage;
                    },
                    addPage: function() {
                        $.when(cmsPageAddService.sendRequest(this.page))
                            .done(function(result) {
                                $location.path('page/edit/' + result.pageId);
                                $scope.$apply();
                            })
                            .fail(function() {
                            })
                    }
                }

                $scope.btns = {
                    "changeStatus" : function(id,status,index){
                        $.when(vodPushService.sendRequest({
                                videoId: id,
                                op :status
                            }))
                            .done(function(){
                                alert('操作成功');
                                if(status == 1) {
                                    $scope.renderObj.respInfo[index].status = 1
                                }else{
                                    $scope.renderObj.respInfo[index].status = -1
                                }
                                $scope.$apply();
                            })
                    }
                }

                $scope.searchPage = {
                    "pageSize": 20,  //页大小
                    "pageNum": 1,   //当前页码
                    "pageTotal": 1,  //页面数量
                    "pageCount": 1, //数据个数
                    "pageShow": [],
                    "datas": {},
                    "params": {
                        "title": "",
                        "videoId": "",
                        "typeId": "",
                        "tag": "",
                        "status": 8888,
                        "beginDate" : ""
                    },
                    "search": function() {
                        this.datas.page = 1;
                        this.datas.rows = this.pageSize;
                        this.getData();
                    },
                    "getData": function() {
                        var tmpParams = {};
                        _.each(this.params, function(value, key, list) {
                            // if(!!value) {
                                tmpParams[key] = value;
                            // }
                        });
                    
                        var that = this;
                        //获取页面列表
                        that.datas.page = that.pageNum;
                        that.datas.parameter = JSON.stringify(tmpParams);
       
                        $.when(vodQueryService.sendRequest(this.datas))
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
                        this.getData()

                    },
                    "pre": function() {
                        if (this.pageNum == 1) {
                            this.pageNum = this.pageTotal;
                        }else{
                            this.pageNum--;
                        }
                        this.getData();
                    },
                    "next": function() {
                        if (this.pageNum == this.pageTotal) {
                            this.pageNum = 1;
                        }else {
                            this.pageNum++;
                        }
                        this.getData();
                    }
                }

                $scope.searchPage.search();



            }
        ]);

    });

