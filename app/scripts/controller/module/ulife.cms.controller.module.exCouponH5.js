/**
 * Created by Ulife on 2016/3/29.
 */
define([
    'moment',
    'underscore',
    'ulife.cms.module.myApp',
    'ulife.cms.menu.config',

    'ulife.api.promotion.getbypubliccode',

    "ulife.cms.service.module",
    "ulife.cms.service.valid",
    "ulife.cms.service.authority"
],
function(moment, _, app, MenuConfig, promotionGetbypubliccode) {

    promotionGetbypubliccode.injectTo(app);

    app.controller('exCouponH5Module', [
        '$scope',
        '$route',
        '$filter',
        'moduleService',
        'validService',
        'promotionGetbypubliccodeService',
        'authorityService',
        function($scope, $route, $filter, moduleService, validService, promotionGetbypubliccodeService) {

            $scope.menuConfig = MenuConfig.menu;
            $scope.Tops = [
                {key:'0', value:'0'},
                {key:'10', value:'10'}
            ];

            $.when(moduleService.init())
                .done(function(returnObj){
                    angular.extend(returnObj.contentHandle, {
                        oriContent: {
                        },
                        content: {
                        }
                    })
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

            $scope.editContent = {
                "dialog": {
                    "addVideoModal": $("#videoModal"),
                    "open": function() {
                        this.addVideoModal.modal({});
                    },
                    "close": function() {
                        this.addVideoModal.modal('hide');
                    }
                },

                "add": function() {
                    $scope.editModule.contentHandle.add();
                    this.dialog.open();

                },
                "edit": function(index) {
                    $scope.editModule.contentHandle.edit(index);
                    this.dialog.open();
                },
                "save": function() {
                    if (!validService.valid($scope.contentForm)) {
                        return;
                    }
                    $scope.editModule.contentHandle.save();
                    this.dialog.close();
                },
                "delete": function(index) {
                    $scope.editModule.contentHandle.delete(index);
                },
                "getProductInfo": function(data) {
                    var couponCode;
                    $.when($scope.editModule.getProdcutInfo(data.itemId))
                        .done(function(productInfo) {
                            data.title = productInfo.item.title;
                            data.couponImage = productInfo.item.mediaInfos[0];
                            data.retailPrice = productInfo.item.retailPrice;
                            data.magicPrice = productInfo.item.magicPrice;
                            couponCode = productInfo.item.wesen
                            $scope.$apply()
                        })
                        .then(function(){
                            return promotionGetbypubliccodeService.sendRequest({
                                "code" : couponCode
                            })
                        })
                        .done(function(couponDetail){
                            data.couponIcon = couponDetail.brandimg;
                            data.couponTime = moment(couponDetail.start).format('YYYY.MM.DD') + "-" + moment(couponDetail.end).format('YYYY.MM.DD')
                            $scope.$apply()
                        })
                        .fail(function(){
                            alert('不存在该商品或者优惠码错误')
                        })

                }
            }


        }
    ]);
});
