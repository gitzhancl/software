/**
 * Created by Ulife on 2016/1/22.
 */

define([
        'ulife.cms.module.myApp',
        'ulife.framework.services',
        'ulife.cms.business.config',
        'ulife.cms.menu.config',

        'ulife.api.cms.ticket.outstore.edit',
        'ulife.api.role.user.get',
        'ulife.api.cms.ticket.outstore.detail',
        'ulife.api.ticket.get',
        'ulife.api.cms.ticket.outstore.addticket',
        'ulife.api.cms.ticket.getSaleCompany',
        'ulife.api.cms.ticket.outstore.updateticket',
        'ulife.api.cms.ticket.outstore.delticket',

        'ulife.cms.directive.datepicker',
        'ulife.cms.directive.datetimepicker',
        'ulife.cms.directive.tooltip',
        'ulife.cms.directive.dateformat',
        "ulife.cms.service.authority",
        "ulife.cms.service.valid",
        'ng-file-upload-all'

    ],
    function (app, services, BizConfig, MenuConfig, cmsTicketOutstoreEdit, roleUserGet, cmsTicketOutstoreDetail, ticketGet,cmsTicketOutstoreAddticket, cmsTicketGetSaleCompany, cmsTicketOutstoreUpdateticket, cmsTicketOutstoreDelticket) {

        cmsTicketOutstoreEdit.injectTo(app);
        roleUserGet.injectTo(app);
        cmsTicketOutstoreDetail.injectTo(app);
        ticketGet.injectTo(app);
        cmsTicketOutstoreAddticket.injectTo(app);
        cmsTicketGetSaleCompany.injectTo(app);
        cmsTicketOutstoreUpdateticket.injectTo(app);
        cmsTicketOutstoreDelticket.injectTo(app);

        app.controller('takeOutStockCreate', ['$scope', '$location', '$route',
            'cmsTicketOutstoreEditService', 'roleUserGetService', 'cmsTicketOutstoreDetailService', 'ticketGetService', 'cmsTicketOutstoreAddticketService', 'cmsTicketGetSaleCompanyService', 'cmsTicketOutstoreUpdateticketService', 'cmsTicketOutstoreDelticketService',
            'authorityService','validService', 

            function ($scope, $location, $route, cmsTicketOutstoreEditService, roleUserGetService, cmsTicketOutstoreDetailService, ticketGetService, cmsTicketOutstoreAddticketService, cmsTicketGetSaleCompanyService,cmsTicketOutstoreUpdateticketService,cmsTicketOutstoreDelticketService,cmsPageAddService,validService) {

                $scope.menuConfig = MenuConfig.menu;

                $scope.params = {};

                $scope.template = {};

                $scope.companyList = [];

                $scope.btn = {
                    // 创建出库单
                    outstoreAddticket : function(){
 
                        if($scope.params.purpose != '销售' && !$scope.params.oaNo){
                            alert('请填写OA单号');
                            return;
                        }
                        if (!validService.valid($scope.outStock)) {
                            return;
                        }
                        $scope.params.departmentId = $scope.departmentId;
                        $scope.params.departmentName = $("#departmentName").find('select option:selected').text();
                        if($scope.params.departmentName==""){
                            alert('请填写领用部门');
                            return;
                        }
                        $.when(cmsTicketOutstoreEditService.sendRequest({
                            outstoreInfo : JSON.stringify($scope.params)
                        }))
                        .done(function(datas) {
                            if(datas.result){
                                alert('操作成功')
                                $scope.outStockId  = datas.message;
                                if($route.current.params.method == 'edit'){
                                    window.location.reload();
                                }else{
                                    window.location.href = "index.html#/exchangeCoupon/takeOutStockList/edit/" + $scope.outStockId
                                }

                            }else{
                                alert(datas.message);
                            }
                            $scope.$apply();
                        })
                        .fail(function(errCode,errMsg) {
                            alert(errMsg)
                        })
                    },
                    //查询并添加券
                    addTicket : {
                        params : {

                        },
                        temparams : {

                        },
                        "modal": $("#addTicketModel"),
                        "open": function () {
                            this.modal.modal({});
                            this.params = {

                            };
                        },
                        "add" : function(){
                            this.open();
                            this.promptTitle = "添加券";
                        },
                        "save": function() { 
                            var self = this;
                            if(!self.params.id){
                                alert('请填写卡券ID');
                                return;
                            }
                            if(!self.params.totalprice){
                                alert('请填写总售价');
                                return;
                            }
                            if(!self.params.number){
                                alert('请填写数量');
                                return;
                            }
                            if(self.params.number <= 0){
                                alert('数量必须大于0');
                                return;
                            }
                            
                            self.temparams = {
                                outStoreId : $scope.outStockId,
                                ticketId : self.params.id,
                                count    : self.params.number,
                                totalAmount : self.params.totalprice
                            }                        
                            var requestMethod;
                            if(self.params.editId){
                                self.temparams.id = self.params.editId;
                                self.temparams.version = self.version
                                requestMethod = cmsTicketOutstoreUpdateticketService;
                            }else{
                                requestMethod = cmsTicketOutstoreAddticketService;
                            }

                            $.when(requestMethod.sendRequest({
                                ticketInfo : JSON.stringify(self.temparams)
                            }))
                            .done(function(datas){
                                if(datas.result){
                                    alert('成功');
                                    if($route.current.params.method == 'edit'){
                                        window.location.reload();
                                    }else{
                                        window.location.href = "index.html#/exchangeCoupon/takeOutStockList/edit/" + $scope.outStockId
                                    }
                                    
                                }else{
                                   alert(datas.message) 
                                }
                                
                            })
                            .fail(function(errCode,errMsg) {
                                alert(errMsg)
                            })
                        },
                        "edit" : function(index){
                            var self = this;
                            self.open();
                            this.promptTitle = "修改券";
                            self.params.editId = $scope.params.tickets[index].id;
                            self.params.id = $scope.params.tickets[index].ticketId;
                            self.params.number = $scope.params.tickets[index].count;
                            self.params.totalprice = $scope.params.tickets[index].totalAmount;
                            self.params.name = $scope.params.tickets[index].ticketName;
                            self.params.price = $scope.params.tickets[index].retailPrice;
                            self.version = $scope.params.tickets[index].version;
                        },
                        "delete" : function(index){
                            var rlt = confirm("确认删除该项吗?");
                            if (rlt != true) {
                                return;
                            }
                            $.when(cmsTicketOutstoreDelticketService.sendRequest({
                                id :  $scope.params.tickets[index].id,
                                version : $scope.params.tickets[index].version
                            }))
                            .done(function(datas){
                                if(datas.result){
                                    alert('删除成功');
                                    if($route.current.params.method == 'edit'){
                                        window.location.reload();
                                    }else{
                                        window.location.href = "index.html#/exchangeCoupon/takeOutStockList/edit/" + $scope.outStockId
                                    }
                                    
                                }else{
                                   alert(datas.message) 
                                }
                                
                            })
                            .fail(function(errCode,errMsg) {
                                alert(errMsg)
                            })
                        },
                        "search" : function(){
                            var self = this;
                            $.when(ticketGetService.sendRequest({
                                id : self.params.id
                            }))
                            .done(function(datas) {
                                self.params.name = datas.name
                                self.params.price = datas.retailPrice
                                $scope.$apply();
                            })
                            .fail(function(errCode,errMsg) {
                                alert(errMsg)
                            })
                        }
                    },
                    // 搜索公司
                    searchConpany : {
                        params : {

                        },
                        "modal": $("#selectCompany"),
                        "open": function () {
                            this.modal.modal({});
                        },
                        "select": function(name) {
                            $scope.params.saleCompany = name;
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
                };

                $scope.status = {
                    // 拉取出库单
                    getOutstoreDetail : function(){
                        $.when(cmsTicketOutstoreDetailService.sendRequest({
                            id : $scope.outStockId
                        }))
                        .done(function(datas) {
                            _.each(datas.tickets,function(ticket){
                                if(ticket.exchangeExpireType == 1){
                                    ticket.times = '出库时间+' + ticket.exchangeExpireDate + "天";
                                }else{
                                    ticket.times = '兑换截止' + moment(ticket.exchangeExpireDate).format('YYYY.MM.DD hh:mm:ss');
                                }
                            });
                            angular.extend($scope.params, datas);
                            $scope.departmentId = datas.departmentId;
                            $scope.btn.addTicket.version = datas.version;
                            $scope.$apply();
                        })
                        .fail(function(errCode,errMsg) {
                            alert(errMsg)
                        })
                    }
                }


                if($location.url().indexOf('create') > 0){
                    $scope.template = {
                        title : '创建',
                        createBtn : true,
                        createValue : '生成领用出库单',
                        hideAddBtn :  false,
                    }
                    $scope.params.purpose = '销售'
                    $.when(roleUserGetService.sendRequest({
                            id : $.cookie('_cmsCustomId')
                        })).done(function(datas) {
                            $scope.params.createdName = datas.loginName
                            $scope.$apply();
                        })
                        .fail(function(errCode,errMsg) {
                            alert(errMsg)
                        })
                }else if($route.current.params.method == 'edit'){
                    $scope.outStockId = $route.current.params.id
                    $scope.template = {
                        title : '编辑' + $scope.outStockId,
                        createBtn : true,
                        createValue : '更新领用出库单',
                        hideAddBtn : true
                    }
                    $scope.status.getOutstoreDetail();
                    console.log($scope.template)
                }else{
                    $scope.ispreview = true;
                    $scope.outStockId = $route.current.params.id
                    $scope.template.title = '主管审核' + $scope.outStockId;
                    $scope.status.getOutstoreDetail();
                }
            }
        ]);

    });

