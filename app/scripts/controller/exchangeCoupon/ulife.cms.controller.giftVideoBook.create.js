
/** 
 * Created by Ulife on 2016/11/29.
 * 
 * Created by Yu on 2016/11/29.
 */

define([
        'ulife.cms.module.myApp',
        'ulife.framework.services',
        'ulife.cms.business.config',
        'ulife.cms.menu.config',

        'ulife.api.cms.ticket.getSaleCompany',
        'ulife.api.ticket.giftfile.edit',

        'ulife.cms.directive.datetimepicker',
        'ulife.cms.directive.datepicker',
        'ulife.cms.directive.dateformat',
        "ulife.cms.service.authority",
        'ulife.cms.service.getDepartment',
        "ulife.cms.service.valid",
    ],
    function(app, services, BizConfig, MenuConfig, cmsTicketGetSaleCompany,ticketGiftFileEdit) {

        cmsTicketGetSaleCompany.injectTo(app);
        ticketGiftFileEdit.injectTo(app);
        

        app.controller('giftVideoBookCreateCtrl', ['$scope', '$location', '$route',
        'cmsTicketGetSaleCompanyService',
        'ticketGiftfileEditService',
        'authorityService',
        'validService',
        'deportmentService',           
            function($scope, $location, $route,
            cmsTicketGetSaleCompanyService,
            ticketGiftfileEditService,
            authorityService,
            validService,
            deportmentService) {
    
                $scope.menuConfig = MenuConfig.menu;
                $scope.id = $route.current.params.id;
                $scope.title = '新建券';
                $scope.params = {
                    validTag:'1'
                };
                if($scope.id !=0){
                    var obj = {
                        action : 'find',
                        recId : $scope.id
                    }
                    $.when(ticketGiftfileEditService.sendRequest(obj))
                    .done(function(data){
                        $scope.params = JSON.parse(data.message);
                        $scope.params.ticketIds = JSON.parse(data.message).ticketId;
                        $scope.params.startTime = moment($scope.params.startTime,"MMM D, YYYY h:mm:ss a").valueOf(); 
                        $scope.params.endTime = moment($scope.params.endTime,"MMM D, YYYY h:mm:ss a").valueOf();  

                        $scope.$apply();
                    })
                    .fail(function(err, msg){
                        console.log(msg);
                    })
                }
                //提交数据
                $scope.editData = function(state){
                    if (!validService.valid($scope.giftDataForm)) {
                        return false;
                    }

                    if(!($scope.params.videoUrl || $scope.params.imageUrl)){
                        alert('视频图片必选一个');
                        return false;
                    }
                    var obj = $scope.params;
                    obj.ticketIds = '99999';
                    obj.action = state;
                    if($scope.id !=0){
                        obj.recId = $scope.id;
                    }else{
                        obj.recId = Math.floor(Math.random()*10).toString();
                    }
                    
                    $.when(ticketGiftfileEditService.sendRequest(obj))
                    .done(function(){
                        alert('保存成功');
                        $location.path('/exchangeCoupon/giftVideoBooklist/');
                        $scope.$apply();
                    })
                    .fail(function(err,msg){
                        console.log(msg);
                    })
                }
                $scope.save = function(){
                    var state;
                    if($scope.id == 0){
                        state = 'save';
                    }else{
                        state = 'edit';
                    }
                    $scope.editData(state);
                };            
                $scope.searchConpany = {
                        params : {

                        },
                        "modal": $("#selectCompany"),
                        "open": function () {
                            this.modal.modal({});
                        },
                        "select": function(name,id) {
                            $scope.params.companyName = name;
                            $scope.params.companyId = id;
                            this.modal.modal('hide');            
                        },
                        "search" : function(){
                            var self = this;
                            $.when(cmsTicketGetSaleCompanyService.sendRequest({
                                'code' : self.params.code,
                                'name' : self.params.name
                            }))
                            .done(function(datas) {
                                if(datas.total){
                                    $scope.companyList = datas.saleCompanys;
                                }else{
                                    alert('没有搜寻到相关公司');
                                    $scope.companyList = [];
                                }
                                $scope.$apply();
                            })
                            .fail(function(errCode,errMsg) {
                                alert(errMsg)
                            })
                        }
                    }
     



            }
        ]);

    });

