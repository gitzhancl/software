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

        app.controller('ImgPCModule', [
            '$scope',
            '$route',
            '$filter',
            'moduleService',
            'validService',
            'authorityService',
            function($scope, $route, $filter, moduleService, validService) {

                $scope.menuConfig = MenuConfig.menu;

                $.when(moduleService.init()).
                    done(function(returnObj){
                        angular.extend(returnObj.contentHandle, {
                            oriContent: {
                                ALLSome:[{},{},{},{},{}]
                            },
                            content: {
                                ALLSome:[{},{},{},{},{}]
                            }
                        })
                        $scope.editModule = returnObj;
                        $scope.$apply();
                    })

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


                $scope.editAttr = {
                    "modal": $("#attrModal"),
                    "open" : function () {
                        this.modal.modal({});
                    },
                    "save" : function () {
                        if (!validService.valid($scope.attrForm)) {
                            return;
                        }
                        this.modal.modal('hide');
                        $scope.editModule.saveAttr();

                    }
                }
            }
        ]);
    });
