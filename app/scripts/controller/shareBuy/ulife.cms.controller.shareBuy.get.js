/**
 * Created by Ulife on 2016/1/15.
 * 发布状态： -1-未发布 1-取消发布 2-已发布
 */

define([
        'ulife.cms.module.myApp',
        'ulife.framework.services',
        'ulife.cms.business.config',
        'ulife.cms.menu.config',

        'ulife.api.share.buy.get',

        'ulife.cms.directive.datetimepicker',
        'ulife.cms.directive.dateformat',
        'ulife.cms.directive.tooltip',
        "ulife.cms.service.valid",
        "ulife.cms.service.authority"

    ],
    function(app, services, BizConfig, MenuConfig, shareBuyGet) {

        shareBuyGet.injectTo(app);

        app.filter('groupStatus', function () {
            return function (val) {
                switch (val) {
                    case 1 :
                        return '已创建';
                    case 2 :
                        return '未开始';
                    case 3 :
                        return '进行中';
                    case 4 :
                        return '已结束';
                    case 5 :
                        return '已取消';
                }
            }
        });

        app.filter('deptType', function () {
            return function (val) {
                switch (val) {
                    case 1 :
                        return '运营部';
                    case 2 :
                        return '市场部';
                    case 3 :
                        return '商品部';
                    case 4 :
                        return '用户体验部';
                    case 5 :
                        return '财务部';
                    case 6 :
                        return '技术部';
                    case 7 :
                        return '产品部';
                    case 8 :
                        return '大客户部';
                    case 9 :
                        return '新媒体营销部';
                }
            }
        });

        app.controller('shareBuyGetCtrl', ['$scope', '$location', '$route','$filter',
            'shareBuyGetService',
            'authorityService',

            function($scope, $location, $route,$filter,
                     shareBuyGetService) {

                $scope.menuConfig = MenuConfig.menu;

                $.when(shareBuyGetService.sendRequest({"id": $route.current.params.id}))
                    .done(function(result) {
                        $scope.group = result;
                        $scope.$apply();

                    })
                    .fail(function(code, msg) {
                        alert(msg);
                    })
            }
        ]);

    });

