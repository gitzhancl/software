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

        'ulife.api.promotion.log',
        'ulife.api.bonus.log',
        'ulife.api.product.log',
        'ulife.api.search.log',
        'ulife.api.cart.log',

        'ulife.cms.directive.datepicker',
        'ulife.cms.directive.tooltip',
        'ulife.cms.directive.dateformat',
        "ulife.cms.service.authority"

    ],
    function(app, services, BizConfig, MenuConfig, 
        promotionLog, bonusLog, productLog, searchLog, cartLog) {

        promotionLog.injectTo(app);
        bonusLog.injectTo(app);
        productLog.injectTo(app);
        searchLog.injectTo(app);
        cartLog.injectTo(app);

        app.controller('LogListCtrl', ['$scope', '$location', '$route',
            'promotionLogService',
            'bonusLogService',
            'productLogService',
            'searchLogService',
            'cartLogService',
            'authorityService',

            function($scope, $location, $route, 
                promotionLogService,
                bonusLogService,
                productLogService,
                searchLogService,
                cartLogService) {

                $scope.menuConfig = MenuConfig.menu;

                $scope.renderObj = {};

                $scope.sysType = [
                    {'key': '优惠', 'value': 'promotionLog'},
                    {'key': '抽奖', 'value': 'bonusLog'},
                    {'key': '商品', 'value': 'productLog'},
                    {'key': '搜索', 'value': 'searchLog'},
                    {'key': '购物车', 'value': 'cartLog'}
                ];


                $scope.searchPage = {
                    'sysment': 'productLog',
                    "params": {
                    },
                    "search": function() {
                        this.getData();
                    },
                    "getData": function() {
                        var tmpParams = {};
                        _.each(this.params, function(value, key, list) {
                            if(!!value) {
                                tmpParams[key] = value;
                            }
                        });

                        var that = this;

                        serviceMap = {
                            'promotionLog': function() {
                                return promotionLogService;
                            },
                            'bonusLog': function() {
                                return bonusLogService;
                            },
                            'productLog': function() {
                                return productLogService;
                            },
                            'searchLog': function() {
                                return searchLogService;
                            },
                            'cartLog': function() {
                                return cartLogService;
                            }
                        }
                        //获取页面列表
                        $.when(serviceMap[this.sysment]().sendRequest(tmpParams))
                            .done(function(result) {
                                $scope.renderObj = result;

                                $scope.$apply();
                            })
                            .fail(function() {
                            })
                    }
                }

            }
        ]);

    });

