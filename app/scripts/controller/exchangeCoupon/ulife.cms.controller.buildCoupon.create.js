/**
 * Created by Ulife on 2016/1/22.
 */

define([
        'ulife.cms.module.myApp',
        'ulife.framework.services',
        'ulife.cms.business.config',
        'ulife.cms.menu.config',

        'ulife.api.ticket.queryTicketNameById',
        'ulife.api.ticket.createTickeCode',
        'ulife.api.ticket.codeDetail',
        'ulife.api.ticket.createOrUpdateCode',

        'ulife.cms.directive.datepicker',
        'ulife.cms.directive.datetimepicker',
        'ulife.cms.directive.tooltip',
        'ulife.cms.directive.dateformat',
        "ulife.cms.service.authority",
        "ulife.cms.service.valid"

    ],
    function (app, services, BizConfig, MenuConfig,ticketQueryTicketNameById,ticketCreateTickeCode,ticketCodeDetail,ticketCreateOrUpdateCode) {

        ticketQueryTicketNameById.injectTo(app);
        ticketCreateTickeCode.injectTo(app);
        ticketCodeDetail.injectTo(app);
        ticketCreateOrUpdateCode.injectTo(app);

        app.controller('buildCouponCreate', ['$scope', '$location', '$route','ticketQueryTicketNameByIdService', 'ticketCreateTickeCodeService','ticketCodeDetailService','ticketCreateOrUpdateCodeService',
            'authorityService','validService',

            function ($scope, $location, $route,ticketQueryTicketNameByIdService,ticketCreateTickeCodeService,ticketCodeDetailService,ticketCreateOrUpdateCodeService,
                cmsPageAddService,validService) {

                $scope.menuConfig = MenuConfig.menu;

                $scope.params = {
                    id : 0,
                    ticketId : 0,
                    departmentId : "",
                    demandMan : "",
                    count : '',
                }

                $scope.permission = {
                    CloseEditId : false
                }

                // 拉取详情
                $scope.ticketCodeDetail = function(){
                    $.when(ticketCodeDetailService.sendRequest({
                            'id' : $route.current.params.id
                        }))
                        .done(function(data){
                            angular.extend($scope.params,data);
                            $scope.departmentId = data.departmentId;
                            $scope.ticketQueryTicketNameById();
                            $scope.$apply();
                        })
                        .fail(function (code, msg) {
                            alert(msg);
                        })
                }

                if($location.url().indexOf('create') > 0){
                    $scope.currentStatus = '新建';
                    //添加默认部门
                    // setTimeout(function() {
                    //     debugger;
                    //     $scope.departmentId = $scope.deptType[0].id;  
                    //     $scope.$apply();           
                    // }, 1000);
                }else{
                    $scope.ticketCodeDetail();
                    $scope.permission.CloseEditId = true;
                    $scope.currentStatus = $route.current.params.id;                       
                }

                // 查询单号
                $scope.ticketQueryTicketNameById = function(){
                    $.when(ticketQueryTicketNameByIdService.sendRequest({
                            'ticketId' : $scope.params.ticketId
                        }))
                        .done(function(data){
                            $scope.ticketName = data.value;
                            $scope.$apply();
                        })
                        .fail(function (code, msg) {
                            alert(msg);
                        })
                }

                // 修改或者创单
                $scope.ticketCreateOrUpdateCode = function(){

                    if(!$scope.params.demandMan.match(/^[\u4e00-\u9fa5]+$/)){
                        alert('申请人请填写中文');
                        return;
                    }
                    if($scope.departmentId){
                        $scope.params.departmentId = $scope.departmentId;
                    }else{
                        alert('请选择部门');
                        return;
                    }
                    
                    if (!validService.valid($scope.param)) {
                            return;
                        }
                    $.when(ticketCreateOrUpdateCodeService.sendRequest({
                            'codeCreateRequest' : JSON.stringify($scope.params)
                        }))
                        .done(function(data){
                            if(data.result){
                                alert('保存成功');
                                window.location.href = "index.html#/exchangeCoupon/buildCouponList"
                            }else{
                                alert('添加失败')
                            }
                        })
                        .fail(function (code, msg) {
                            alert(msg);
                        })
                }
            }
        ]);

    });

