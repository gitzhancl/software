/**
 * Created by Ulife on 2015/12/24
 * @author zhangke
 */
define([
        'moment',
        'underscore',
        'ulife.cms.module.myApp',
        'ulife.cms.menu.config',

        "ulife.cms.service.module",
        "ulife.cms.service.valid",
        "ulife.cms.service.authority"
    ],
    function(moment, _, app, MenuConfig) {

        app.controller('ProductAreaH5Module', [
            '$scope',
            '$route',
            '$filter',
            'moduleService',
            'validService',
            'authorityService',
            function($scope, $route, $filter, moduleService, validService) {

                $scope.menuConfig = MenuConfig.menu;
                $scope.Tops = [
                    {key:'0', value:'0'},
                    {key:'10', value:'10'}
                ];

                $.when(moduleService.init()).
                    done(function(returnObj){
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
                        "moduleInfoContentModal": $("#contentModal"),
                        "open": function() {
                            this.moduleInfoContentModal.modal({});
                        },
                        "close": function() {
                            this.moduleInfoContentModal.modal('hide');
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
                        $.when($scope.editModule.getProdcutInfo(data.itemId))
                            .done(function(productInfo) {
                                data.title = productInfo.item.title;
                                data.image = productInfo.item.mediaInfos[0];
                                data.price = productInfo.item.retailPrice;
                            })

                    }
                }


                $scope.editListContent = {
                    "itemIds": '',
                    "dialog": {
                        "moduleInfoContentModal": $("#contentListModal"),
                        "open": function () {
                            this.moduleInfoContentModal.modal({});
                        },
                        "close": function () {
                            this.moduleInfoContentModal.modal('hide');
                        }
                    },
                    "add": function () {
                        var that = this;
                        that.itemIds = '';
                        _.each($scope.editModule.moduleInfo.content, function (item) {
                            that.itemIds += item.itemId + ',';
                        });
                        that.itemIds = that.itemIds.substr(0, that.itemIds.length - 1);
                        this.dialog.open();

                    },
                    "save": function () {
                        if (!validService.valid($scope.contentListForm)) {
                            return;
                        }

                        $scope.editModule.contentHandle.clear();
                        var itemIds = this.itemIds.split(',');

                        $.when($scope.editModule.getProdcutListInfo(itemIds))
                            .done(function (result) {
                                var products = result.result;
                                var tempContentArr = [];
                                var tempProductMap = {};

                                _.each(products, function (product) {
                                    tempProductMap[product.id] = {
                                        'itemId': product.id,
                                        'title': product.title,
                                        'image': product.image,
                                        'price': product.retailPrice,
                                        'stock': product.stock
                                    }
                                });
                                _.each(itemIds, function(itemId){
                                    if (tempProductMap[itemId]) {
                                        tempContentArr.push(tempProductMap[itemId])
                                    }
                                })
                                $scope.editModule.contentHandle.save(tempContentArr);

                                this.dialog.close();
                            }).fail(function () {
                            alert("商品数据拉取失败！");
                        });


                    }
                }
            }
        ]);
    });
