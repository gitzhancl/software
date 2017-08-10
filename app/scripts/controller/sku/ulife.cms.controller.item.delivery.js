/**
 * Created by Ulife on 2016/1/15.
 * 发布状态： -1-未发布 1-取消发布 2-已发布
 */


define([
        'ulife.cms.module.myApp',
        'ulife.framework.services',
        'ulife.cms.business.config',
        'ulife.cms.menu.config',

        'ulife.api.cms.item.deliveryconfig.get',
        'ulife.api.cms.item.delivery.config',
        'ulife.cms.directive.datepicker',
        'ulife.cms.directive.dateformat',
        'ulife.cms.directive.tooltip',
        "ulife.cms.service.valid",
        "ulife.cms.service.authority",
        'ulife.cms.directive.wangEditor',
        "ulife.cms.service.authority"

    ],



    function (app, services, BizConfig, MenuConfig, cmsDeliveryGet, cmsDeliveryConfig) {

        cmsDeliveryGet.injectTo(app);
        cmsDeliveryConfig.injectTo(app);

        app.controller('deliveryParamIsView', ['$scope', '$location', '$route', '$filter',
            'cmsItemDeliveryconfigGetService', 'cmsItemDeliveryConfigService',
            'validService',
            'authorityService',

            function ($scope, $location, $route, $filter, cmsItemDeliveryconfigGetService, cmsItemDeliveryConfigService, validService) {

                $scope.menuConfig = MenuConfig.menu;


                $scope.delivery = {
                    "timeType":"APPOINTED",
                    "status" :0
                }

                $scope.status = [
                    {'key': '有效', 'value': 0},
                    {'key': '无效', 'value': 1}
                ];

                $scope.timeType = [
                    {'key': '时间范围', 'value': 'APPOINTED'},
                    {'key': '延迟天数', 'value': 'DELAY'}
                ];

                $scope.changType=function(value){

                    if(value=='APPOINTED'){
                        $("#betTime_id").show();
                        $("#outTime_id").hide();
                    }else{
                        $("#outTime_id").show();
                        $("#betTime_id").hide();
                    }
                }
                $.when(cmsItemDeliveryconfigGetService.sendRequest({"id": $route.current.params.id}))
                    .done(function (result) {
                        if(result.id!=null) {
                            $scope.delivery = result;
                            var obj = JSON.parse($scope.delivery.config);
                            $scope.delivery.timeType = obj.type;
                            $scope.delivery.status=result.status;
                            if (obj.type == 'APPOINTED') {
                                $scope.delivery.startDate = obj.startDate;
                                $scope.delivery.endDate = obj.endDate;
                                $("#betTime_id").show();
                            } else {
                                $scope.delivery.timeOutDate = obj.startDate;
                                $("#outTime_id").show();
                            }
                        }else {
                            $("#betTime_id").show();
                        }
                        $scope.$apply();

                    })
                    .fail(function (code, msg) {
                        alert(msg)
                    });

                //保存按钮
                $scope.btns = {
                    "save": function () {
                        var deliveryOutForm=$scope.deliveryOutForm;
                        var display=$("#betTime_id").is(":visible");
                        var buffer = new StringBuffer();
                        buffer.append("{\"type\":\""+$scope.delivery.timeType+"\",");
                        if(display==true) {
                            deliveryOutForm = $scope.deliveryBetForm;
                            if(typeof ($scope.delivery.startDate) == "undefined" && typeof ($scope.delivery.endDate)=="undefined"){
                                alert("开始时间与结束时间必填一个");
                                return false;
                            }
                            if($scope.delivery.startDate > $scope.delivery.endDate){
                                alert("开始时间不能大于结束时间");
                                return false;
                            }

                            if($scope.delivery.startDate!=null && $scope.delivery.endDate!=null){
                                buffer.append("\"startDate\":\""+$scope.delivery.startDate+"\",\"endDate\":\""+$scope.delivery.endDate+"\"}");
                            }
                            if($scope.delivery.startDate!=null && $scope.delivery.endDate==null){
                                buffer.append("\"startDate\":\""+$scope.delivery.startDate+"\"}");
                            }
                            if($scope.delivery.endDate!=null && $scope.delivery.startDate==null){
                                buffer.append("\"endDate\":\""+$scope.delivery.endDate+"\"}");
                            }

                        }else{
                            buffer.append("\"startDate\":\""+$scope.delivery.timeOutDate+"\"}");

                        }
                        if (!validService.valid(deliveryOutForm)) {
                            return;
                        }
                        $scope.delivery.config=buffer.toString();

                        var itemId=$scope.delivery.itemId;
                        if(typeof (itemId)=="undefined"){
                            itemId=$route.current.params.id
                        }

                        $scope.delivery.id=itemId;
                        $.when(cmsItemDeliveryConfigService.sendRequest({
                                "info": angular.toJson($scope.delivery)
                            }))
                            .done(function (result) {
                                if(result.result==false){
                                    alert( result.message);
                                }else{
                                    alert('保存成功');
                                    window.location.reload();

                                }

                            })
                            .fail(function (code, msg) {
                                alert(msg);
                            })
                    }
                }

            }

        ]);

        function StringBuffer() {
            this.__strings__ = [];
        };
        StringBuffer.prototype.append = function(str) {
            this.__strings__.push(str);
        };
        StringBuffer.prototype.toString = function() {
            return this.__strings__.join('');
        };

    });
