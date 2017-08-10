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

        app.controller('BannersH5Module', [
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
                            $scope.editModule.moduleInfo.attr.top = $scope.Tops[0].value;
                        }else{
                            $scope.editModule.moduleInfo.attr = {
                                top:$scope.Tops[0].value
                            };
                        }
                        $scope.$apply();
                        //保存attr数据
                        $scope.editModule.saveAttr();
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
                        this.getImgWH(_.bind(function() {
                            $scope.editModule.contentHandle.save();
                            this.dialog.close();
                        }, this))
                        //this.getImgWH($scope.editModule.contentHandle.content.image);

                        //$scope.editModule.contentHandle.save();
                        //this.dialog.close();
                    },
                    "delete": function(index) {
                        $scope.editModule.contentHandle.delete(index);
                    },
                    "getImgWH":function(callback){
                        var returnimgurl;
                        var imgsrc;
                        var img = new Image();
                        var imgurl = $scope.editModule.contentHandle.content.image;
                        img.src = imgurl;
                        if(!/uwidth/.test(imgurl) && !/uheight/.test(imgurl)){
                            imgsrc = imgurl;
                            imgsrc += /\?/.test(imgurl) ? '&' : '?';
                            img.onload = function(){
                                returnimgurl = imgsrc + 'uwidth=' + img.width + '&uheight=' + img.height;
                                $scope.editModule.contentHandle.content.image = returnimgurl;
                                $scope.$apply();
                                callback();
                                //$scope.editModule.contentHandle.save();
                            }
                            img.onerror = function(){
                                console.log('图片不存在');
                            }
                        }else{
                            callback();
                            //$scope.editModule.contentHandle.save();
                        }
                    }
                }
            }
        ]);
    });
