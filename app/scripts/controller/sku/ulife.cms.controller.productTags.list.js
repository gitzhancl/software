/**
 * Created by Ulife on 2016/1/15.
 */
/**
 * Created by zhanchanglei on 2016/03/24
 */

define([
        'ulife.cms.module.myApp',
        'ulife.framework.services',
        'ulife.cms.business.config',
        'ulife.cms.menu.config',

        'ulife.api.cms.item.tags.edit',

        'ulife.cms.directive.datetimepicker',
        'ulife.cms.directive.dateformat',

        'ng-file-upload-all',
        "ulife.cms.service.authority"
    ],
    function (app, services, BizConfig, MenuConfig, cmsItemTagsEdit) {

        cmsItemTagsEdit.injectTo(app);

        app.controller('CmsItemTagsEdit', ['$scope', '$location', '$route', '$filter',
            'cmsItemTagsEditService', 'authorityService',

            function ($scope, $location, $route, $filter, cmsItemTagsEditService) {

                $scope.menuConfig = MenuConfig.menu;

                $scope.isEditDetailtag = false;
                $scope.detailTag = "";
                $scope.isEditTag = false;
                $scope.tag = "";
                $scope.idsFile = "";
                $scope.cmsItem = {};

                // upload on file select or drop
                $scope.upload = function (file) {
                    //debugger;
                        if (file.name && file.name.split(".")[1] != "txt") {
                            alert("本次上传文件格式：【" + file.name.split(".")[1] + "】上传文件格式错误！只允许txt格式文件上传！");
                            return;
                        }
                    var reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = function (e) {
                        console.log("start upload file")
                        //  $scope.base64 = encodeURIComponent(e.target.result.replace("data:text/plain;base64,",""));
                        $scope.base64 = e.target.result.replace(/data:(text\/plain)?(;base64,)?/, "");
                       /* if ($scope.base64 == "data:") {
                            alert("上传文件内容不对，请重新上传！");
                            return;
                        }*/
                    };
                };


                // upload on file select or drop
                $scope.beachSend = function () {
                    if ($scope.isEditTag == true && $scope.tag == "" & $scope.isEditDetailtag == true && $scope.detailTag == "") {
                        if (confirm("本次将清除【文字标签】和【图片标签】！点击确定将执行清除文字标签和图片标签操作，点击取消不操作！")) {
                            implementation();
                        }
                    } else if ($scope.isEditTag == true && $scope.tag == "") {
                        if (confirm("本次将清除【图片标签】！点击确定将执行清除图片标签操作，点击取消不操作！")) {
                            implementation();
                        }
                    } else if ($scope.isEditDetailtag == true && $scope.detailTag == "") {
                        if (confirm("本次将清除【文字标签】！点击确定将执行清除文字标签操作，点击取消不操作！")) {
                            implementation();
                        }
                    } else {
                        implementation();
                    }


                    function implementation() {
                        $.when(cmsItemTagsEditService.sendRequest({
                            info: JSON.stringify({
                                "idsFile": $scope.base64,
                                "tag": $scope.tag,
                                "isEditTag": $scope.isEditTag,
                                "detailTag": $scope.detailTag,
                                "isEditDetailtag": $scope.isEditDetailtag
                            })
                        })).done(function (result) {
                                if (!result.result) {
                                    alert(result.message)
                                } else {
                                    $scope.cmsItem.total = result.total;
                                    $scope.cmsItem.successTotal = result.successTotal;
                                    $scope.cmsItem.message = result.message;
                                    $scope.$apply();
                                }
                            })
                            .fail(function (code, msg) {
                                alert(msg);
                            });
                    }
                };
            }
        ]);

    });

