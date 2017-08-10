/**
 * Created by Ulife on 2016/1/15.
 */
/**
 * Created by Zhangke on 2015/12/15.
 */

define([
        'ulife.cms.module.myApp',
        'ulife.framework.services',
        'ulife.cms.business.config',
        'ulife.cms.menu.config',

        'ulife.api.promotion.cms.extcode.activitylist',
        'ulife.api.cms.page.add',
        'ulife.api.promotion.cms.extcode.activityPublish',

        'ulife.cms.directive.datetimepicker',
        'ulife.cms.directive.datepicker',
        'ulife.cms.directive.dateformat',
        "ulife.cms.service.authority"
    ],
    function(app, services, BizConfig, MenuConfig, promotionCmsExtcodeActivitylist, addPage,promotionCmsExtcodeActivityPublish) {

        promotionCmsExtcodeActivitylist.injectTo(app);
        addPage.injectTo(app);
        promotionCmsExtcodeActivityPublish.injectTo(app);

        app.filter('activityStatus', function () {
            return function (val) {
                switch (val) {
                    case 0 :
                        return '已创建';
                    case 1 :
                        return '已发布';
                    case -1 :
                        return '已作废';
                }
            }
        });

        app.controller('CmsExtcodeActivitylistCtrl', ['$scope', '$location', '$route',
            'promotionCmsExtcodeActivitylistService',
            'cmsPageAddService','promotionCmsExtcodeActivityPublishService',
            'authorityService',

            function($scope, $location, $route, promotionCmsExtcodeActivitylistService, cmsPageAddService,promotionCmsExtcodeActivityPublishService) {

                $scope.menuConfig = MenuConfig.menu;

                $scope.gotoPageEdit = function(index) {
                    $location.path('page/edit/' + index);
                }
                $scope.renderObj = {};

                $scope.pType = '';
                $scope.prodType = '';
                $scope.termType = '';

                $scope.status = [
                    {'key': '全部状态', 'value': null},
                    {'key': '已创建', 'value': '0'},
                    {'key': '已发布', 'value': '1'},
                    {'key': '已作废', 'value': '-1'}
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

                $scope.searchPage = {
                    "pageSize": 10,  //页大小
                    "pageNum": 1,   //当前页码
                    "pageTotal": 1,  //页面数量
                    "pageCount": 1, //数据个数
                    "pageShow": [],
                    "params": {
                        "activityName": "",
                        "sellprice": "",
                        "brandName": "",
                        "activityStatus": null,
                        "startNumber": 0,
                        "page": 1,
                        "eachPageNumber": 10

                    },
                    "search": function() {
                        this.params.eachPageNumber = this.pageSize;
                        this.params.startNumber = 0;
                        this.getData();
                    },
                    "getData": function() {
                        var tmpParams = {};
                        _.each(this.params, function(value, key, list) {
                            if(!!value) {
                                tmpParams[key] = value;
                            }
                        });
                        //tmpParams["status"] = 99;
                        var that = this;
                        //获取页面列表
                        $.when(promotionCmsExtcodeActivitylistService.sendRequest(tmpParams))
                            .done(function(result) {
                                if( result.jsonMessage!=""){
                               var res= JSON.parse(result.jsonMessage).rs;
                                $scope.renderObj =res;
                            }else{
                            $scope.renderObj="";
                        }
                                //处理分页信息
                                $scope.pageCount = result.debugMessage;


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
                            this.params.startNumber=Math.ceil((this.params.page-1)*this.pageSize)
                        }else{
                            this.params.page--;
                            this.params.startNumber=Math.ceil((this.params.page-1)*this.pageSize)
                        }
                        this.pageNum = this.params.page;
                        this.getData();
                    },
                    "next": function() {

                        if(Math.ceil($scope.pageCount/this.pageSize)==this.pageNum){
                            this.params.page=1;
                            this.params.startNumber=this.pageSize*(this.params.page-1)
                        }

                        if (this.pageNum == this.pageTotal) {
                            this.params.page = 1;

                        }else {
                            this.params.page++;
                            this.params.startNumber=this.pageSize*(this.params.page-1)

                        }

                        this.pageNum = this.params.page;

                        this.getData();
                    }
                }
                $scope.searchPage.search();

                $scope.publishId=0;
                //发布优惠券
                $scope.publishPromotion = {
                    "modal": $("#publishModal"),
                    "open": function (id) {
                        $scope.publishId=id;
                        this.modal.modal({});
                    },
                    "publish": function() {
                        this.modal.modal('hide');
                        $.when(promotionCmsExtcodeActivityPublishService.sendRequest({"id":$scope.publishId})).done(function(result) {
                                alert(result.value);
                                //$scope.loadPromotion();
                                window.location.reload();
                                $scope.$apply();
                            })
                            .fail(function(msg) {
                                alert(msg);
                            })
                    }
                }


            }
        ]);

    });

