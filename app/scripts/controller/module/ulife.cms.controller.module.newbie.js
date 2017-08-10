/**
 * Created by Ulife on 2015/12/22.
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

        app.controller('NewbieModuleEdit', [
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

                $scope.normalType = [
                    {key:'无标', type:'EMPTY'},
                    {key:'万人团', type:'GROUP'},
                    {key:'加价购', type:'ADD'},
                    {key:'新人礼', type:'NEW'}
                ];

                $scope.activityType = [
                    {key:'无标', type:'EMPTY'},
                    {key:'万人团', type:'GROUP'},
                    {key:'加价购', type:'ADD'},
                    {key:'新人礼', type:'NEW'},
                    {key:'限时抢', type:'LIMIT'}
                ];

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

                $scope.editActiviy = {
                    "dialog": {
                        "moduleInfoContentModal": $("#editActivityModal"),
                        "open": function() {
                            this.moduleInfoContentModal.modal({});
                        },
                        "close": function() {
                            this.moduleInfoContentModal.modal('hide');
                        }
                    },
                    "add": function() {
                        $scope.editModule.contentHandle.oriContent = {
                            "type": "GROUP",
                            "key": ""
                        }
                        $scope.editModule.contentHandle.content = {
                            "type": "GROUP"
                        }
                        $scope.editModule.contentHandle.add();
                        this.dialog.open();

                    },
                    "edit": function(index) {
                        $scope.editModule.contentHandle.edit(index);
                        this.dialog.open();
                    },
                    "save": function() {
                        if (!validService.valid($scope.activityForm)) {
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
                                data.image = productInfo.item.mediaInfo;
                                data.price = productInfo.item.retailPrice;
                            })

                    }
                }

                $scope.editLimitActiviy = {
                    "data": {
                        "type": "LIMIT",
                        "data": [{
                            "itemId": "",
                            "title": "",
                            "imgUrl": "",
                            "price": "",
                            "link": "",
                            "startTime": "",
                            "endTime": ""
                        },{
                            "itemId": "",
                            "title": "",
                            "imgUrl": "",
                            "price": "",
                            "link": "",
                            "startTime": "",
                            "endTime": ""
                        },{
                            "itemId": "",
                            "title": "",
                            "imgUrl": "",
                            "price": "",
                            "link": "",
                            "startTime": "",
                            "endTime": ""
                        },{
                            "itemId": "",
                            "title": "",
                            "imgUrl": "",
                            "price": "",
                            "link": "",
                            "startTime": "",
                            "endTime": ""
                        }]
                    },
                    "dialog": {
                        "limitActivityModal": $("#editLimitActivityModal"),
                        "open": function() {
                            this.limitActivityModal.modal({});
                        },
                        "close": function() {
                            this.limitActivityModal.modal('hide');
                        }
                    },
                    "add": function() {
                        $scope.editModule.contentHandle.oriContent = {
                            "type": "LIMIT",
                            "data": [{
                                "itemId": "",
                                "title": "",
                                "imgUrl": "",
                                "price": "",
                                "link": "",
                                "startTime": "",
                                "endTime": ""
                            },{
                                "itemId": "",
                                "title": "",
                                "imgUrl": "",
                                "price": "",
                                "link": "",
                                "startTime": "",
                                "endTime": ""
                            },{
                                "itemId": "",
                                "title": "",
                                "imgUrl": "",
                                "price": "",
                                "link": "",
                                "startTime": "",
                                "endTime": ""
                            },{
                                "itemId": "",
                                "title": "",
                                "imgUrl": "",
                                "price": "",
                                "link": "",
                                "startTime": "",
                                "endTime": ""
                            }]
                        }
                        $scope.editModule.contentHandle.content = {
                            "type": "LIMIT",
                            "key": "限时抢",
                            "data": [{
                                "itemId": "",
                                "title": "",
                                "imgUrl": "",
                                "price": "",
                                "link": "",
                                "startTime": "",
                                "endTime": ""
                            },{
                                "itemId": "",
                                "title": "",
                                "imgUrl": "",
                                "price": "",
                                "link": "",
                                "startTime": "",
                                "endTime": ""
                            },{
                                "itemId": "",
                                "title": "",
                                "imgUrl": "",
                                "price": "",
                                "link": "",
                                "startTime": "",
                                "endTime": ""
                            },{
                                "itemId": "",
                                "title": "",
                                "imgUrl": "",
                                "price": "",
                                "link": "",
                                "startTime": "",
                                "endTime": ""
                            }]
                        }

                        $scope.editModule.contentHandle.add();
                        this.dialog.open();

                    },
                    "edit": function(index) {
                        $scope.editModule.contentHandle.edit(index);
                        this.dialog.open();
                    },
                    "save": function() {
                        if (!validService.valid($scope.limitActivityForm)) {
                            return;
                        }

                        $scope.editModule.contentHandle.save();
                        this.dialog.close();
                    },
                    "delete": function(index) {
                        $scope.editModule.contentHandle.delete(index);
                    },
                    "getProductInfo": function(activityItem) {
                        $.when($scope.editModule.getProdcutInfo(activityItem.itemId))
                            .done(function(productInfo) {
                                activityItem.title = productInfo.item.title;
                                activityItem.imgUrl = productInfo.item.mediaInfos[0];
                                activityItem.price = productInfo.item.retailPrice;
                            })

                    }

                }
            }
        ]);
    });
