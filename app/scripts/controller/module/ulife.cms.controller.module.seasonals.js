/**
 * Created by Ulife on 2015/12/23.
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

        app.controller('SeasonalsModule', [
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

                $scope.activityType = [
                    {key:'限时抢', type:'LIMIT'},
                    {key:'普通活动', type:'NORMAL'}
                ];

                $.when(moduleService.init()).
                    done(function(returnObj){
                        angular.extend(returnObj.contentHandle, {
                            "oriContent": {
                                "type": "LIMIT",
                                "key": "限时抢"
                            },
                            "content": {
                                "type": "LIMIT",
                                "key": "限时抢"
                            },
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
                    }
                }
            }
        ]);
    });
