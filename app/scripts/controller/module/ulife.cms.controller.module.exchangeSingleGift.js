/**
 * Created by Ulife on 2017/01/10
 * @author Yu
 */
define([
        'moment',
        'underscore',
        'ulife.cms.module.myApp',
        'ulife.cms.menu.config',
        'ulife.api.cms.sku.list',

        "ulife.cms.service.module",
        "ulife.cms.service.valid",
        "ulife.cms.service.authority"
    ],
    function (moment, _, app, MenuConfig, skuList) {
        skuList.injectTo(app);
        app.controller('exchangeSingleGift', [
            '$scope',
            '$route',
            '$filter',
            'cmsSkuListService',
            'moduleService',
            'validService',
            'authorityService',
            function ($scope, $route, $filter, cmsSkuListService,moduleService, validService) {

                $scope.menuConfig = MenuConfig.menu;
                $scope.Tops = [{
                        key: '0',
                        value: '0'
                    },
                    {
                        key: '10',
                        value: '10'
                    }
                ];

                $.when(moduleService.init()).done(function (returnObj) {
                    angular.extend(returnObj.contentHandle, {
                        oriContent: {},
                        content: {}
                    });
                    $scope.editModule = returnObj;
                    if(returnObj.moduleInfo.content){
                        $scope.itemId = returnObj.moduleInfo.content[0].id;
                    }
       
                    //楼层组件高度默认值
                    if ($scope.editModule.moduleInfo.attr) {
                        $scope.editModule.moduleInfo.attr.top = $scope.editModule.moduleInfo.attr.top ? $scope.editModule.moduleInfo.attr.top : $scope.Tops[1].value;
                    } else {
                        $scope.editModule.moduleInfo.attr = {
                            top: $scope.Tops[1].value
                        };
                    }
                    $scope.$apply();
                });


                $scope.editAttr = {
                    "modal": $('#attrModal'),
                    "open": function () {
                        this.modal.modal({});
                    },
                    "save": function () {
                        if (!validService.valid($scope.attrForm)) {
                            return;
                        }
                        this.getImgWH($scope.editModule.moduleInfo.attr.image);
                        this.modal.modal('hide');
                        $scope.editModule.saveAttr();
                    },
                    "getImgWH": function (sImgUrl) {
                        var returnimgurl;
                        var imgsrc;
                        var img = new Image();
                        var imgurl = sImgUrl;
                        img.src = imgurl;
                        if (!/uwidth/.test(imgurl) && !/uheight/.test(imgurl)) {
                            imgsrc = imgurl;
                            imgsrc += /\?/.test(imgurl) ? '&' : '?';
                            img.onload = function () {
                                returnimgurl = imgsrc + 'uwidth=' + img.width + '&uheight=' + img.height;
                                $scope.editModule.moduleInfo.attr.image = returnimgurl;
                                $scope.$apply();
                                $scope.editModule.saveAttr();
                            };
                            img.onerror = function () {
                                console.log('图片不存在');
                                $scope.editModule.saveAttr();
                            };
                        } else {
                            $scope.editModule.saveAttr();
                        }
                    }
                };

                $scope.editContent = {
                    "dialog": {
                        "moduleInfoContentModal": $("#contentModal"),
                        "open": function () {
                            this.moduleInfoContentModal.modal({});
                        },
                        "close": function () {
                            this.moduleInfoContentModal.modal('hide');
                        }
                    },
                    "add": function () {
                        $scope.editModule.contentHandle.add();
                        this.dialog.open();

                    },
                    "edit": function () {
                        $scope.editModule.contentHandle.edit();
                        this.dialog.open();
                    },
                    "save": function () {
                        if (!validService.valid($scope.contentForm)) {
                            return;
                        }
                        this.getProductInfo();
                        this.dialog.close();
                    },
                    "delete": function (index) {
                        $scope.editModule.contentHandle.delete(index);
                    },
                    "getProductInfo": function () {
                        var itemId = $scope.itemId;
                        var tempContentArr = [];
                        var tempProductMap = {};
                        $.when($scope.editModule.getGiftListInfo(itemId))
                            .done(function (result) {
                                if(($scope.editModule.pageInfo.deviceId == '4' && result.salePc == '2') ||($scope.editModule.pageInfo.deviceId == '3' && result.saleH5 == '2')){
                                    _.each(JSON.parse(result.items),function(items){
                                        if(items.combination == 1){
                                            var tmpParams ={
                                            'page':1,
                                            'rows':99,
                                            'query':angular.toJson({'superId':items.itemId})
                                        };
                                            $.when(cmsSkuListService.sendRequest(tmpParams,false,false))
                                            .done(function(data){
                                                _.each(data.skus,function(singleData){
                                                    singleData.itemId = singleData.id;
                                                    singleData.name = singleData.title;
                                                    singleData.id = itemId;
                                                    tempContentArr.push(singleData);
                                                })
                                            })
                                            .fail(function(err, msg){
                                                console.log(msg);
                                            })
                                        }else{
                                            debugger;
                                            items.id = itemId;
                                            tempContentArr.push(items);
                                        }
                                    })
                                    $scope.editModule.contentHandle.save(tempContentArr);
                                } else {
                                    alert('礼包下架，无法保存');
                                }
                                //var product = result.result[0];
                                // if(product){
                                //     data.title = product.title;
                                //     data.image = product.image;
                                //     data.price = product.retailPrice;
                                //     data.stock = product.stock;
                                // }else{
                                //     console.log('没有匹配到相关商品');
                                // }
                            })

                    }
                }

            }
        ]);
    });