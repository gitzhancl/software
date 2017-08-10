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

        app.controller('FloorsModule', [
            '$scope',
            '$route',
            '$filter',
            'moduleService',
            'validService',
            'authorityService',
            function($scope, $route, $filter, moduleService, validService) {
             debugger;
                $scope.menuConfig = MenuConfig.menu;

                $scope.productTags = [
                    {key:'无', value:''},
                    {key:'新品尝鲜', value:'2'},
                    {key:'今日特价', value:'1'},
                    {key:'买一赠一', value:'3'},
                    {key:'第2件半价', value:'4'}
                ];

                $.when(moduleService.init()).
                    done(function(returnObj){
                        angular.extend(returnObj.contentHandle, {
                            oriContent: {
                                // categories: [{},{},{},{},{},{}],
                                // sliders: [{},{},{}],
                                products: [{},{},{},{},{},{}]
                            },
                            content: {
                                // categories: [{},{},{},{},{},{}],
                                // sliders: [{},{},{}],
                                products: [{},{},{},{},{},{}]
                            }
                        })
                        $scope.editModule = returnObj;
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
                    }
                }
            }
        ]);
    });
