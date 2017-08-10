/**
 * Created by Ulife on 2016/3/29.
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


    app.controller('VideoH5Module', [
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

            $.when(moduleService.init())
                .done(function(returnObj){

                    $scope.editModule = returnObj;
                    !$scope.editModule.moduleInfo.content && ($scope.editModule.moduleInfo.content = {})

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

            $scope.addVideo = {
                "dialog": {
                    "addVideoModal": $("#videoModal"),
                    "open": function() {
                        this.addVideoModal.modal({});
                    },
                    "close": function() {
                        this.addVideoModal.modal('hide');
                    }
                },
                "add" : function(videoSize){
                    $scope.isEdit = false;
                    $scope.videoSize = videoSize;
                    $scope.tmpContent = {};
                    $scope.editModule.contentHandle.add();

                    this.dialog.open();
                },
                "save" : function(videoSize){
                    if (!validService.valid($scope.contentForm)) {
                        return;
                    }

                    var videoContent = $scope.editModule.moduleInfo.content;

                    if(!_.isArray(videoContent[videoSize])){
                        videoContent[videoSize] = [];
                    }

                    var tmpVideo = {};
                    _.each($scope.tmpContent, function(value, key, list) {
                        if(!!value) {
                            tmpVideo[key] = value;
                        }
                    });

                    videoContent[videoSize].push(tmpVideo)



                    $scope.editModule.saveContent();
                }
            }

            $scope.editItem = {
                "delete" : function(parentIndex,index){
                    var key = parentIndex == 0 ? 'big' : 'small';

                    delete $scope.editModule.moduleInfo.content[key][index];

                    $scope.editModule.moduleInfo.content[key] = _.compact($scope.editModule.moduleInfo.content[key]);
                    $scope.editModule.saveContent();
                },
                "edit": function(parentIndex,index) {
                    var key = parentIndex == 0 ? 'big' : 'small';

                    $scope.isEdit = true;
                    $scope.saveKey = key;
                    $scope.saveIndex = index;

                    $scope.tmpContent = $scope.editModule.moduleInfo.content[key][index]
                    $scope.addVideo.dialog.open();

                },
                "save": function() {
                    if (!validService.valid($scope.contentForm)) {
                        return;
                    }

                    var tmpVideo = {};
                    _.each($scope.tmpContent, function(value, key, list) {
                        if(!!value) {
                            tmpVideo[key] = value;
                        }
                    });

                    $scope.editModule.moduleInfo.content[$scope.saveKey][$scope.saveIndex] = tmpVideo;
                    $scope.editModule.saveContent();

                }
            }

        }
    ]);
});
