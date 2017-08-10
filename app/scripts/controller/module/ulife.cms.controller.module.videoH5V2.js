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

    app.controller('VideoH5V2Module', [
        '$scope',
        '$route',
        '$filter',
        'moduleService',
        'validService',
        'vodCmsInfoService',
        'authorityService',
        function($scope, $route, $filter, moduleService, validService, vodCmsInfoService) {

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
