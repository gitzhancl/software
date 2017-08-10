/**
 * Created by Ulife on 2016/1/22.
 */

define([
        'ulife.cms.module.myApp',
        'ulife.framework.services',
        'ulife.cms.business.config',
        'ulife.cms.menu.config',

        'ulife.api.ticket.viewTicketCode',

        'ulife.cms.directive.datepicker',
        'ulife.cms.directive.datetimepicker',
        'ulife.cms.directive.tooltip',
        'ulife.cms.directive.dateformat',
        "ulife.cms.service.authority"

    ],
    function (app, services, BizConfig, MenuConfig,ticketViewTicketCode) {

        ticketViewTicketCode.injectTo(app);

        app.controller('buildCouponPreview', ['$scope', '$location', '$route','ticketViewTicketCodeService',
            'authorityService',

            function ($scope, $location, $route,ticketViewTicketCodeService,
                cmsPageAddService) {

                $scope.menuConfig = MenuConfig.menu;   

                $scope.searchPage = {
                    "pageSize": 20,  //页大小
                    "pageNum": 1,   //当前页码
                    "pageTotal": 1,  //页面数量
                    "pageCount": 1, //数据个数
                    "goto" : 0,
                    "params": {
                        'id' : $route.current.params.id
                    },
                    "search": function() {
                        this.params.startNumber = 1;
                        this.params.eachPageNumber = this.pageSize;
                        this.getData();
                    },
                    "getData": function() {
                        var tmpParams = $scope.searchPage.params;

                        tmpParams.eachPageNumber = this.pageSize;
                        tmpParams.startNumber = (this.pageNum - 1)*this.pageSize;

                        var that = this;
                        //获取页面列表
                        $.when(ticketViewTicketCodeService.sendRequest(tmpParams))
                            .done(function(result) {

                                var rs = JSON.parse(result.message).rs;

                                _.each(rs,function(data,index){
                                    data.indexId = tmpParams.startNumber++;
                                })
                                $scope.codelist = rs;

                                //处理分页信息
                                that.pageTotal = Math.ceil(result.total / that.pageSize);

                                $scope.$apply();
                            })
                            .fail(function() {
                            })
                    },
                    "goto": function() {
                        if(this.gotoNumber > this.pageTotal){
                            this.pageNum = this.pageTotal;
                        }else{
                            this.pageNum = this.gotoNumber;
                            
                        }
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
                };

                $scope.searchPage.search();

            }
        ]);

    });

