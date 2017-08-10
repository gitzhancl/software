/**
 * Created by Ulife on 2016/3/29.
 */
define([
    'moment',
    'underscore',
    'ulife.cms.module.myApp',
    'ulife.cms.menu.config',

    'ulife.api.vod.cms.info',

    "ulife.cms.service.module",
    "ulife.cms.service.valid",
    "ulife.cms.service.authority"
],
function(moment, _, app, MenuConfig, vodCmsInfo) {

    vodCmsInfo.injectTo(app);

    app.controller('VideoPCModule', [
        '$scope',
        '$route',
        '$filter',
        'moduleService',
        'validService',
        'vodCmsInfoService',
        'authorityService',
        function($scope, $route, $filter, moduleService, validService, vodCmsInfoService) {
        
            $scope.menuConfig = MenuConfig.menu;

            $.when(moduleService.init())
                .done(function(returnObj){
                    angular.extend(returnObj.contentHandle, {
                        oriContent: {
                        },
                        content: {
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
                "getVideoDetail": function(data) {

                    $.when(vodCmsInfoService.sendRequest({
                            videoId : data.id
                        }))
                        .done(function(vidoeDetail) {
                            data.id = vidoeDetail.videoInfo.id
                            data.title = vidoeDetail.videoInfo.title
                            data.subTitle = vidoeDetail.videoInfo.subTitle
                            data.previewSmall = vidoeDetail.videoInfo.previewSmall
                            $scope.$apply();
                        })
                }
            }


        }
    ]);
});

