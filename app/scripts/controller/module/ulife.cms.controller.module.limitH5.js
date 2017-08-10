/**
 * Created by Ulife on 2015/12/22.
 */
define([
    'moment',
    'underscore',
    'ulife.cms.module.myApp',
    'ulife.cms.menu.config',

    'ulife.api.promotion.group.info',
    'ulife.api.promotion.product.single',
    'ulife.api.product.get',
    'ulife.api.product.list',

    "ulife.cms.service.module",
    "ulife.cms.service.valid",
    "ulife.cms.service.authority"
],
function(moment, _, app, MenuConfig, promotionGroupInfo, promotionProductSingle, productGet, productList) {

    promotionGroupInfo.injectTo(app);
    promotionProductSingle.injectTo(app);
    productGet.injectTo(app);
    productList.injectTo(app);

    app.controller('LimitH5Module', [
        '$scope',
        '$route',
        '$filter',
        'moduleService',
        'validService',
        'promotionGroupInfoService',
        'promotionProductSingleService',
        'productGetService',
        'productListService',
        'authorityService',
        function($scope, $route, $filter, moduleService, validService, promotionGroupInfoService, promotionProductSingleService, productGetService, productListService) {

            $scope.menuConfig = MenuConfig.menu;
            $scope.Tops = [
                {key:'0', value:'0'},
                {key:'10', value:'10'}
            ];

            $scope.selectLimit = 0;

            $.when(moduleService.init())
                .done(function(returnObj){
                    $scope.editModule = returnObj;
                    //楼层组件高度默认值
                    if($scope.editModule.moduleInfo.attr){
                        $scope.editModule.moduleInfo.attr.top = $scope.editModule.moduleInfo.attr.top ? $scope.editModule.moduleInfo.attr.top : $scope.Tops[1].value;
                    }else{
                        $scope.editModule.moduleInfo.attr = {
                            top:$scope.Tops[1].value
                        };
                    }

                    $scope.$apply();

                    var ids =  _.pluck($scope.editModule.moduleInfo.content, 'id')

                    return productListService.sendRequest({
                        qurey : JSON.stringify({
                            "ids" : ids,

                        }),
                        "rows" : 1000
                    })
                })
                .then(function(productList){
                    console.log(productList)
                })



            $scope.editAttr = {
                "modal": $("#attrModal"),
                "open": function () {
                    this.modal.modal({});
                },
                "save": function() {
                    if (!validService.valid($scope.attrForm)) {
                        return;
                    }
                    this.modal.modal('hide');
                    $scope.editModule.saveAttr();
                }
            }

            $scope.importLimit = {
                "modal" : $("#ImportLimitModal"),
                "open" : function(){
                    this.modal.modal({});
                },
                "getData" : function(){
                    $.when(promotionGroupInfoService.sendRequest({
                            id: $scope.itemId
                        }))
                        .done(function(returnObj){
                            var newArray = [];

                            _.each(returnObj.activities,function(activity,index){
                                if(activity.type == 'PANICBUY'){
                                    _.each(activity.items,function(item,index){
                                        item.activityId = activity.id
                                    })
                                }
                                newArray.push(activity.items);
                            })
                            // 数组降维
                            function reduceDimension(arr) {
                                return Array.prototype.concat.apply([], arr);
                            }

                            //根据开始时间排序数组
                            var newDatas = reduceDimension(newArray).sort(function(a,b){
                                return a.startTime-b.startTime;
                            });

                            $scope.editModule.moduleInfo.content = newDatas;
                            $scope.editModule.saveContent();
                        })
                        .fail(function(errCode,errMsg){
                            alert(errMsg)
                        })
                }
            }

            $scope.editItem = {
                "dialog": {
                    "moduleItemContentModal": $("#editItemModal"),
                    "open": function() {
                        this.moduleItemContentModal.modal({});
                    },
                    "cose": function() {
                        this.moduleItemContentModal.modal('hide');
                    }
                },
                "edit": function(activiyItem,i) {
                    $scope.index = i
                    $.when( promotionProductSingleService.sendRequest({
                            "id" : activiyItem.id
                        }))
                        .then(function(promotionInfo) {
                            promotionProductSingle = promotionInfo;
                            return productGetService.sendRequest({
                                "id" : activiyItem.id
                            })
                        })
                        .then(function(productInfo){

                            $scope.productInfo = productInfo;

                            $scope.promotionProductSingle = promotionProductSingle;

                            $scope.specialPrice = activiyItem.specialPrice;

                            activiyItem.title && ($scope.productInfo.item.title = activiyItem.title);

                            activiyItem.image && ($scope.productInfo.item.mediaInfos[0] = activiyItem.image);

                            $scope.$apply();
                        },function(){

                        })
                    this.dialog.open();
                },
                "save": function() {
                    var currentItem = $scope.editModule.moduleInfo.content[$scope.index]
                    currentItem.title = $scope.productInfo.item.title;
                    currentItem.image = $scope.productInfo.item.mediaInfos[0];
                    $scope.editModule.saveContent();
                }
            }

        }
    ]);
});
