define([
        'ulife.cms.module.myApp',
        'ulife.framework.services',
        'ulife.cms.business.config',
        'ulife.cms.menu.config',

        'ulife.api.ticket.category.list',
        'ulife.api.ticket.category.mainedit',

        'ulife.cms.directive.datepicker',
        'ulife.cms.directive.tooltip',
        "ulife.cms.service.valid",
        "ulife.cms.service.authority"

    ],
    function (app, services, BizConfig, MenuConfig, ticketCategoryList, ticketCategoryEdit) {

        ticketCategoryList.injectTo(app);
        ticketCategoryEdit.injectTo(app);

        app.filter('categoryH5L', function () {
            return function (val) {
                if (val == 0){
                    return '';
                }else {
                    return 'H5';
                }
            }
        });

        app.filter('categoryPcL', function () {
            return function (val) {
                if (val == 0){
                    return '';
                }else {
                    return 'PC';
                }
            }
        });

        app.filter('showRemark', function () {
            return function (val) {
                if (val == '启用'){
                    return '禁用';
                }else {
                    return '启用';
                }
            }
        });

        app.filter('showColor', function () {
            return function (val) {
                if (val == '启用'){
                    return 'btn-danger';
                }else {
                    return 'btn-success';
                }
            }
        });

        app.controller('SalesCategoryListCtrl', ['$scope', '$location', '$route',
            'ticketCategoryListService', 'ticketCategoryMaineditService','authorityService',

            function ($scope, $location, $route, ticketCategoryListService, ticketCategoryMaineditService,authorityService) {


                $scope.menuConfig = MenuConfig.menu;

                $scope.renderObj = {};

                $scope.param = {
                    "categoryName":'',
                    "showPc":-1,
                    "showH5":-1,
                    "categoryIconUrl":'',
                    "sortNumber":-1,
                    "validDesc":"",
                    "otherMsg":"ignore-sub",
                    "recId":''
                };

                $scope.searchPage = {
                    "pageSize": 10,  //页大小
                    "pageNum": 1,   //当前页码
                    "pageTotal": 1,  //页面数量
                    "pageCount": 1, //数据个数
                    "pageShow": [],
                    "otherMsg": "",
                    "search": function () {
                        this.getData();
                    },
                    "getData": function () {
                        var that = this;
                        //获取页面列表
                        $.when(ticketCategoryListService.sendRequest($scope.searchPage.otherMsg))
                            .done(function (result) {
                                console.log(JSON.parse(result.message));

                                $scope.renderObj = JSON.parse(result.message);

                                $scope.$apply();
                            })
                            .fail(function () {
                            })
                    },


                };

                $scope.btn = {
                    'changeStatus':function(recId,event){
                        var target=event.target;
                        var val = $(target).html();

                        if (val == '禁用'){
                            $(target).html('启用');
                            $(target).removeClass('btn-danger');
                            $(target).addClass('btn-success');
                        }else {
                            $(target).html('禁用');
                            $(target).removeClass('btn-success');
                            $(target).addClass('btn-danger');
                        }

                        $scope.param.action = 'find';
                        $scope.param.showPc = -1;
                        $scope.param.showH5 = -1;
                        $scope.param.sortNumber = -1;
                        $scope.param.validDesc = '';
                        $scope.param.recId = recId;

                        //获取页面列表
                        $.when(ticketCategoryMaineditService.sendRequest($scope.param))
                            .done(function (result) {
                                var categoryData = JSON.parse(result.message);

                                $scope.param.categoryName = categoryData.main.categoryName;
                                $scope.param.showPc = categoryData.main.showPc;
                                $scope.param.showH5 = categoryData.main.showH5;
                                $scope.param.sortNumber = categoryData.main.sort;
                                $scope.param.validDesc = categoryData.main.remark;
                                $scope.param.categoryIconUrl = categoryData.main.categoryIconUrl;


                                $scope.$apply();
                            })
                            .fail(function () {

                            })
                            .then(function(){
                                $scope.param.action = 'edit';
                                if (val == '禁用'){
                                    $scope.param.validDesc = '禁用';
                                }else {
                                    $scope.param.validDesc = '启用';
                                }


                                $.when(ticketCategoryMaineditService.sendRequest($scope.param))
                                    .done(function (result) {
                                        console.log(result);
                                    })
                            })



                    }
                }


                $scope.searchPage.search();
            }
        ]);

    });

