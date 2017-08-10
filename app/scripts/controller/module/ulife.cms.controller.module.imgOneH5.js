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
        "ulife.cms.service.authority",

        "ulife.cms.directive.imgformat"
    ],
    function(moment, _, app, MenuConfig) {

        app.controller('ImgOneH5Module', [
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
                $scope.allName={};
                $scope.allImg={};
                $scope.allUrl = {};
                var arrSomeName = [];
                var arrSomeImg = [];
                var arrSomeUrl =[];

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
                        $scope.allName={};
                        $scope.allImg={};
                        $scope.allUrl = {};
                        $scope.editModule.contentHandle.add();
                        this.dialog.open();

                    },
                    "edit": function(index) {
                        $scope.editModule.contentHandle.edit(index);
                        $scope.allName = $scope.editModule.contentHandle.content.name;
                        $scope.allImg = $scope.editModule.contentHandle.content.image;
                        $scope.allUrl = $scope.editModule.contentHandle.content.url;
                        this.dialog.open();
                    },
                    "getImgWH": function(getDone) {
                        var imgs = [];
                        var newImgs = [];
                        if(/http:/.test($scope.allImg.image)
                          && !/uheight/.test($scope.allImg.image)
                          && !/uwidth/.test($scope.allImg.image)) {
                            imgs.push('image')
                        }
                        if(/http:/.test($scope.allImg.image1)
                          && !/uheight/.test($scope.allImg.image1)
                          && !/uwidth/.test($scope.allImg.image1)) {
                            imgs.push('image1')
                        }
                        if(/http:/.test($scope.allImg.image2)
                          && !/uheight/.test($scope.allImg.image2)
                          && !/uwidth/.test($scope.allImg.image2)) {
                            imgs.push('image2')
                        }
                        _.each(imgs, function(item) {
                            var img_url = $scope.allImg[item];

                            var img = new Image();
                            var imgsrc = img_url;
                            imgsrc += /\?/.test(img_url) ? '&' : '?';
                            //imgsrc += Date.parse(new Date());
                            img.src = imgsrc;

                            var returnimgurl = '';
                            img.onload = _.bind(function(){
                                returnimgurl = imgsrc + 'uwidth=' + img.width + '&uheight=' + img.height;
                                newImgs.push(returnimgurl);
                                if (imgs.length == newImgs.length) {
                                    _.each(imgs, function(img, index) {
                                        $scope.allImg[img] = newImgs[index]
                                    })
                                    getDone();
                                }
                                console.log(newImgs);
                            });
                            img.onerror = function(){
                                console.log('图片不存在');
                            }
                        })

                        if (imgs.length == 0) {
                            getDone();
                        }
                    },
                    "save": function() {
                        if (!validService.valid($scope.contentForm)) {
                            return;
                        }
                        $scope.editModule.contentHandle.content.name = $scope.allName;
                            $scope.editModule.contentHandle.content.image = $scope.allImg;
                            $scope.editModule.contentHandle.content.url = $scope.allUrl;
                        $scope.editModule.contentHandle.save();
                            this.dialog.close();

                        // this.getImgWH(_.bind(function() {
                            
                            
                        // }, this))
                    },
                    "delete": function(index) {
                        $scope.editModule.contentHandle.delete(index);
                    }
                }
            }
        ]);
    });
