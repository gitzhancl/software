/**
 * Created by Ulife on 2016/1/15.
 * 发布状态： -1-未发布 1-取消发布 2-已发布
 */

define([
        'ulife.cms.module.myApp',
        'ulife.framework.services',
        'ulife.cms.business.config',
        'ulife.cms.menu.config',


        'ulife.api.bonuscms.offline.load',
        'ulife.api.bonuscms.offline.edit',


        'ulife.cms.directive.datetimepicker',
        'ulife.cms.directive.dateformat',
        'ulife.cms.directive.tooltip',
        "ulife.cms.service.valid",
        "ulife.cms.service.authority"

    ],
    function (app, services, BizConfig, MenuConfig,bonuscmsOfflineEdit,bonuscmsOfflineLoad) {

        bonuscmsOfflineEdit.injectTo(app);
        bonuscmsOfflineLoad.injectTo(app);

        app.controller('OfflineEditCtrl', ['$scope', '$location', '$route', '$filter',
            'bonuscmsOfflineEditService',
            'bonuscmsOfflineLoadService',
            'validService',
            'authorityService',

            function ($scope, $location, $route, $filter,  bonuscmsOfflineEditService, bonuscmsOfflineLoadService,
                      validService) {

                $scope.menuConfig = MenuConfig.menu;

                $scope.offline = {
                    "id": 0,
                    "activity_name": '',
                    "old_to_new_id": 0,
                    "share_count": 0,
                    "activity_rule": '',
                    "reg_count": 0,
                    "activity_win_url": '',
                    "oa_flow_number": 0,
                    "activity_id": 0,
                    "activity_win_pic_url": '',
                    "activity_status": 0,
                    "activity_start_time": moment().format("x"),
                    "activity_end_time": moment().add(7, 'days').format("x"),
                    "activity_create_time": moment().format("x"),
                    "status": 0,
                    "prize":[
                        {"prom_code_id":0,"quantity":0,"level":1,"probability":0,"pic_url":''},
                        {"prom_code_id":0,"quantity":0,"level":2,"probability":0,"pic_url":''},
                        {"prom_code_id":0,"quantity":0,"level":3,"probability":0,"pic_url":''},
                        {"prom_code_id":0,"quantity":0,"level":4,"probability":0,"pic_url":''},
                        {"prom_code_id":0,"quantity":0,"level":5,"probability":0,"pic_url":''}
                    ]
                };
                $.when(bonuscmsOfflineLoadService.sendRequest({"activityId": $route.current.params.id}))
                    .done(function (result) {
                        if(result.status=='success'){
                            $scope.offline =JSON.parse( result.message);
                        }
                        $scope.$apply();

                    })
                    .fail(function (code, msg) {
                        alert(msg);
                    });


                $scope.btns = {
                    "save": function () {
                        if (!validService.valid($scope.offlineEditForm)) {
                            return;
                        }

                        //if ($scope.pullNew.endTime< $scope.oldEndTime) {
                        //    alert("结束时间仅能往后改，不能往前改,谢谢配合!")
                        //    return false;
                        //}
                        if ($scope.offline.activity_end_time < $scope.offline.activity_start_time) {
                            alert("结束时间不能小于开始时间,请检查!")
                            return false;
                        }
                        if ($scope.offline.activity_end_time < new Date()) {
                            alert("结束时间不能小于当前时间,请检查!")
                            return false;
                        }
                        $.when(bonuscmsOfflineEditService.sendRequest({"action":'edit',"json": angular.toJson($scope.offline)}))
                            .done(function (result) {
                                alert(result.debugMessage+"!")
                                //if(result.code==1){
                                //    $location.path('offline/list/');
                                //    $scope.$apply();
                                //}
                                window.location.reload();
                            })
                            .fail(function (code, msg) {
                                alert(msg);
                            })
                    },
                    "publish": function (num) {
                        if(num==1){
                            var condition='publish';
                            var rlt = confirm("是否发布该活动?");
                            if (rlt != true) {
                                return false;
                            }
                        }
                        if(num==2){
                            condition='cancel';
                            rlt = confirm("是否取消该活动?");
                            if (rlt != true) {
                                return false;
                            }
                        }
                        if (!validService.valid($scope.offlineEditForm)) {
                            return;
                        }

                        $.when(bonuscmsOfflineEditService.sendRequest({"action":condition,"json": angular.toJson($scope.offline)}))
                            .done(function (result) {
                                alert(result.debugMessage);
                                //window.location.reload();
                            })
                            .fail(function (code, msg) {
                                alert(msg);
                            })
                    }
                };
            }
        ]);

    });

