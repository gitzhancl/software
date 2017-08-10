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

        'ulife.api.vod.add',
        'ulife.api.product.list',

        'ulife.cms.directive.datetimepicker',
        'ulife.cms.directive.tooltip',
        'ulife.cms.directive.dateformat',
        "ulife.cms.service.valid",
        "ulife.cms.service.authority"

    ],
    function(app, services, BizConfig, MenuConfig, vodAdd, productList) {

        vodAdd.injectTo(app);
        productList.injectTo(app);

        app.controller('VideoCreateCtrl', ['$scope', '$location', '$route',
            'vodAddService','productListService','validService', 'authorityService',

            function($scope, $location, $route, vodAddService, productListService,validService) {

                $scope.menuConfig = MenuConfig.menu;

                $scope.video = {
                    "typeId" : 2,
                    "startDate" : moment().format("x")
                };

                $scope.videoType = [
                    {'key': '全民食谱', 'value': 2},
                    {'key': '做道菜', 'value': 3},
                    {'key': '寻食记', 'value': 4},
                    {'key': '食验室', 'value': 5}
                ];

                $scope.productType = [
                    {'key': '主料', 'value': '主料'},
                    {'key': '辅料', 'value': '辅料'},
                    {'key': '配料', 'value': '配料'},
                    {'key': '其他', 'value': '其他'}
                ];

                $scope.getProductList = function(){

                    var ids = _.isArray($scope.productIds) ? $scope.productIds : $scope.productIds.split(',');
      
                    if(!ids.length){
                        alert('请输入关联商品');
                        return;
                    }

                    $.when(productListService.sendRequest({
                            "qurey" : JSON.stringify({
                                "ids" : ids
                            }),
                            page:1,
                            rows: 999
                        }))
                        .done(function(productList){
                            $scope.productList = [];
                            var i = 0;

                            // 字段映射
                            _.each(ids,function(id,index){
                                _.each(productList.products,function(product){
                                    if(ids[index] == product.id){
                                        $scope.productList[i] = {};
                                        $scope.productList[i].itemId = product.id;
                                        $scope.productList[i].productName = product.title;
                                        $scope.productList[i].sort = i;
                                        $scope.productList[i].material = '';
                                        i++;
                                    }
                                })
                            })
                            $scope.$apply();
                          
                        })
                        .fail(function(){
                            alert('商品ID格式输入错误')
                        })
                }

                $scope.btns = {
                    "save" : function(){

                        if (!validService.valid($scope.videoForm)) {
                            return;
                        }

                        if(_.contains(_.pluck($scope.productList,'material'), '')){
                            alert('请选择食材类型')
                            return;
                        }

                        $.when(vodAddService.sendRequest({
                               "voideParam" : JSON.stringify($scope.video),
                               "prodParam" : JSON.stringify($scope.productList)
                            }))
                            .done(function(){
                               alert('创建成功')
                               $location.path('video/list');
                               $scope.$apply();
                            })
                            .fail(function(){
                                alert('创建失败，请检查输入')
                            })
                       
                    }
                }


            }
        ]);

    });

