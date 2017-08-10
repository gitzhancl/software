/**
 * Created by Ulife on 2016/1/15.
 */
/**
 * Created by Zhangke on 2015/12/15.
 */

define([
        'ulife.cms.module.myApp',
        'ulife.framework.services',
        'ulife.cms.business.config',
        'ulife.cms.menu.config',
    
        'ulife.api.promotion.batchuser.Import',
        'ulife.api.promotion.batchuser.put',
    
        'ulife.cms.directive.datetimepicker',
        'ulife.cms.directive.dateformat',

        'ng-file-upload-all',
        "ulife.cms.service.authority"
    ],
    function(app, services, BizConfig, MenuConfig, getPageList, addPage) {

        getPageList.injectTo(app);
        addPage.injectTo(app);

        app.controller('PromotionActivitySendListCtrl', ['$scope', '$location', '$route','$filter',
            'promotionBatchuserImportService',
            'promotionBatchuserPutService',
            'authorityService',

            function($scope, $location, $route,$filter, promotionBatchuserImportService, promotionBatchuserPutService) {

                $scope.menuConfig = MenuConfig.menu;

                $scope.importMsg = "";
                $scope.sendMsg = "";
                $scope.actid = "";
                $scope.base64 = "";

                // upload on file select or drop
                $scope.upload = function (file) {
                    var reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = function(e){
                        $scope.base64 = encodeURIComponent(e.target.result.replace("data:application/vnd.ms-excel;base64,",""));
                        $.when(promotionBatchuserImportService.sendRequest({"base64":$scope.base64}))
                            .done(function(result) {
                                $scope.importMsg= result.value;
                                $scope.$apply();
                            })
                            .fail(function() {
                            })
                    };
                };

                // upload on file select or drop
                $scope.beachSend = function () {
                    $.when(promotionBatchuserPutService.sendRequest({"base64":$scope.base64,"actid":$scope.actid})).done(function(result) {
                            $scope.sendMsg= result.value;
                            $scope.$apply();
                        })
                        .fail(function() {
                        })
                };

            }
        ]);

    });

