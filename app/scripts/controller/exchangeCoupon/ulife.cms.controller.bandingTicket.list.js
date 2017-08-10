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

        'ulife.api.ticket.banding.uploadtrue',
        'ulife.api.ticket.banding.uploadvalid',

        'ulife.cms.directive.datetimepicker',
        'ulife.cms.directive.dateformat',

        'ng-file-upload-all',
        "ulife.cms.service.authority"
    ],
    function (app, services, BizConfig, MenuConfig, ticketBandingUploadtrue,ticketBandingUploadvalid) {

        ticketBandingUploadtrue.injectTo(app);
        ticketBandingUploadvalid.injectTo(app);

        app.controller('CmsBandingEdit', ['$scope', '$location', '$route', '$filter',
            'ticketBandingUploadtrueService','ticketBandingUploadvalidService', 'authorityService',

            function ($scope, $location, $route, $filter, ticketBandingUploadtrueService,ticketBandingUploadvalidService) {

                $scope.menuConfig = MenuConfig.menu;
                $scope.banding={
                    "fileString":"",
                    "id":0,
                    "valids":"",
                    "message":"",
                    "hide":true
                };

                // upload on file select or drop
                $scope.upload = function (file) {
                    if($scope.banding.id==0){
                        alert("请填写券ID！");
                        return;
                    }
                    if(file!=null){
                        var reader = new FileReader();
                        reader.readAsDataURL(file);
                        reader.onload = function(e) {
                            if($scope.banding.id==undefined){
                                alert("请填写券ID！");
                                return;
                            }
                            $scope.banding.fileString=encodeURIComponent(e.target.result.replace(/data:(application\/vnd\.ms-excel)?;base64,/g, ""));
                            $.when(ticketBandingUploadvalidService.sendRequest({
                                    "fileString": $scope.banding.fileString,
                                    "id": $scope.banding.id
                                }))
                                .done(function (datas) {
                                    if(datas.message!=""){
                                        $scope.banding.valids= datas.message;
                                        $scope.$apply();
                                    }
                                    if (datas.status=="success") {
                                        $scope.banding.valids="验证通过，可执行导入！";
                                        $scope.banding.hide=false;
                                        $scope.$apply();
                                    }
                                })
                                .fail(function (code, msg) {
                                    alert(msg)
                                })
                        }}
                };
                // upload on file select or drop
                $scope.uploads = function () {
                    if($scope.banding.id==0){
                        alert("请填写券ID！");
                        return;
                    }
                            if($scope.banding.id==undefined){
                                alert("请填写券ID！");
                                return;
                            }
                            $.when(ticketBandingUploadtrueService.sendRequest({
                                    "fileString": $scope.banding.fileString,
                                    "id": $scope.banding.id
                                }))
                                .done(function (datas) {
                                    if(datas.message!=""){
                                        $scope.banding.message= datas.message;
                                        $scope.$apply();
                                    }
                                    if (datas.status=="success") {
                                        $scope.banding.message="全部绑定成功！--"+$scope.banding.message;
                                        $scope.$apply();
                                    }
                                })
                                .fail(function (code, msg) {
                                    alert(msg)
                                })
                };

            }
        ]);

    });

