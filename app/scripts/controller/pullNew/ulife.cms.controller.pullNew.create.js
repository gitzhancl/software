/**
 * Created by Ulife on 2016/1/15.
 * 发布状态： -1-未发布 1-取消发布 2-已发布
 */

define([
        'ulife.cms.module.myApp',
        'ulife.framework.services',
        'ulife.cms.business.config',
        'ulife.cms.menu.config',


        'ulife.api.cms.pullNew.createOrEdit',
        'ulife.api.cms.pullNew.publishOrCancel',


        'ulife.cms.directive.datetimepicker',
        'ulife.cms.directive.dateformat',
        'ulife.cms.directive.tooltip',
        "ulife.cms.service.valid",
        "ulife.cms.service.authority"

    ],
    function (app, services, BizConfig, MenuConfig,  cmsPullNewCreateOrEdit,  cmsPullNewPublishOrCancel) {

        cmsPullNewCreateOrEdit.injectTo(app);
        cmsPullNewPublishOrCancel.injectTo(app);

        app.controller('PullNewCreateCtrl', ['$scope', '$location', '$route', '$filter',
            'cmsPullNewCreateOrEditService',
            'cmsPullNewPublishOrCancelService',
            'validService',
            'authorityService',

            function ($scope, $location, $route, $filter,  cmsPullNewCreateOrEditService, cmsPullNewPublishOrCancelService,
                      validService) {

                $scope.menuConfig = MenuConfig.menu;
                $scope.pullNew = {
                    "id": 0,
                    "activityName": "",
                    "newCode": "",
                    "oldCode": "",
                    "oldMemberImages": "",
                    "newMemberImages": "",
                    "newCouponCedemption": "",
                    "induceImages": "",
                    "induceUrl": "",
                    "shareTitle": "",
                    "shareDescription": "",
                    "shareIcon": "",
                    "oaFlowNo": "",
                    "pullNewCount": "",
                    "activityRule": "",
                    "startTime": moment().format("x"),
                    "endTime": moment().add(7, 'days').format("x"),
                    "status": "",
                    "createTime": "",
                    "type": ""
                };
                $scope.btns = {
                    "save": function () {
                        if (!validService.valid($scope.pullNewCreateForm)) {
                            return;
                        }

                        //if ($scope.pullNew.endTime< $scope.oldEndTime) {
                        //    alert("结束时间仅能往后改，不能往前改,谢谢配合!")
                        //    return false;
                        //}
                        if ($scope.pullNew.endTime < $scope.pullNew.startTime) {
                            alert("结束时间不能小于开始时间,请检查!")
                            return false;
                        }
                        if ($scope.pullNew.endTime < new Date()) {
                            alert("结束时间不能小于当前时间,请检查!")
                            return false;
                        }
                        $.when(cmsPullNewCreateOrEditService.sendRequest({"json": angular.toJson($scope.pullNew)}))
                            .done(function (result) {
                                alert(result.msg+"！  即将返回列表...")
                                if(result.code==1){
                                    $location.path('pullNew/list/');
                                    $scope.$apply();
                                }
                                window.location.reload();
                            })
                            .fail(function (code, msg) {
                                alert(msg);
                            })
                    },
                 /*   "publishOrCancel": function () {
                        if ($scope.pullNew.type ==  1) {
                            var rlt = confirm("是否发布该活动?");
                            if (rlt != true) {
                                return false;
                            }
                        }
                        $.when(cmsPullNewPublishOrCancelService.sendRequest({"id": $scope.pullNew.id}))
                            .done(function (result) {
                                alert(result.msg);
                                window.location.reload();
                            })
                            .fail(function (code, msg) {
                                alert(msg);
                            })
                    }*/
                };
            }
        ]);

    });

