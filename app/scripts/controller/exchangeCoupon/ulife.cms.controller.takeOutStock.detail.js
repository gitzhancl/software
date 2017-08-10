/**
 * Created by Ulife on 2016/1/22.
 */

define([
        'ulife.cms.module.myApp',
        'ulife.framework.services',
        'ulife.cms.business.config',
        'ulife.cms.menu.config',

        'ulife.api.cms.ticket.outstore.detail',
        'ulife.api.cms.ticket.outstore.addcodes',
        'ulife.api.cms.ticket.outstore.export',
        'ulife.api.cms.ticket.outstore.importcodes',
        'ulife.api.cms.ticket.outstore.delcodes',
        'ulife.api.cms.ticket.outstore.reject',
        'ulife.api.cms.ticket.outstore.aduit',


        'ulife.cms.directive.datepicker',
        'ulife.cms.directive.datetimepicker',
        'ulife.cms.directive.tooltip',
        'ulife.cms.directive.dateformat',
        "ulife.cms.service.authority",
        'ng-file-upload-all'

    ],
    function (app, services, BizConfig, MenuConfig, cmsTicketOutstoreDetail,cmsTicketOutstoreAddcodes,
              cmsTicketOutstoreExport,cmsTicketOutstoreImportcodes, cmsTicketOutstoreDelcodes,outStoreReject,outStoreAudit) {

        cmsTicketOutstoreDetail.injectTo(app);
        cmsTicketOutstoreAddcodes.injectTo(app);
        cmsTicketOutstoreExport.injectTo(app);
        cmsTicketOutstoreImportcodes.injectTo(app);
        cmsTicketOutstoreDelcodes.injectTo(app);
        outStoreReject.injectTo(app);
        outStoreAudit.injectTo(app);

        app.controller('takeOutStockDetail', ['$scope', '$location', '$route',
            'cmsTicketOutstoreDetailService', 'cmsTicketOutstoreAddcodesService', 'cmsTicketOutstoreExportService', 'cmsTicketOutstoreImportcodesService', 'cmsTicketOutstoreDelcodesService',
            'cmsTicketOutstoreRejectService','cmsTicketOutstoreAduitService','authorityService',

            function ($scope, $location, $route, cmsTicketOutstoreDetailService, cmsTicketOutstoreAddcodesService,
                      cmsTicketOutstoreExportService, cmsTicketOutstoreImportcodesService,cmsTicketOutstoreDelcodesService,OutStoreRejectService,OutStoreAuditService, cmsPageAddService) {

                $scope.menuConfig = MenuConfig.menu;

                $scope.params = {};

                $scope.showBtn = {
                    importBtn : true,
                    importManual : true,
                    exportBtn :true,
                    downLoadBtn :true,
                    deleteItemBtn : true,
                    auditRejectBtn : false,
                    auditSuccessBtn : false
                }

                if($route.current.params.status == 'preview'){
                    $scope.showBtn.importBtn = false;
                    $scope.showBtn.importManual = false;
                    $scope.showBtn.downLoadBtn = false;
                    $scope.showBtn.deleteItemBtn = false;
                }else if ($route.current.params.status == 'review'){
                    $scope.showBtn.auditRejectBtn = true;
                    $scope.showBtn.auditSuccessBtn = true;
                    $scope.showBtn.importBtn = false;
                    $scope.showBtn.importManual = false;
                    $scope.showBtn.downLoadBtn = false;
                    $scope.showBtn.deleteItemBtn = false;
                }

                $scope.outStoreId = $route.current.params.id;
                $scope.version = $route.current.params.version;


                $scope.status = {
                    // 拉取出库单
                    getOutstoreDetail : function(){
                        var count = 0;
                        $.when(cmsTicketOutstoreDetailService.sendRequest({
                            id : $route.current.params.id
                        }))
                        .done(function(datas) {
                            _.each(datas.tickets,function(ticket){
                                if(ticket.exchangeExpireType == 1){
                                    ticket.times = '出库时间+' + ticket.exchangeExpireDate + "天";
                                }else{
                                    ticket.times = '兑换截止' + moment(ticket.exchangeExpireDate).format('YYYY.MM.DD hh:mm:ss');
                                }
                                count += ticket.count;
                            });
                            datas.totalCount = count;
                            angular.extend($scope.params, datas);
                            $scope.$apply();
                        })
                        .fail(function(errCode,errMsg) {
                            alert(errMsg)
                        })
                    }
                };

                $scope.btn = {
                    'outStockImport' : function(file){
                        var reader = new FileReader();
                        reader.readAsDataURL(file);
                        reader.onload = function(e){
                            $.when(cmsTicketOutstoreImportcodesService.sendRequest({
                                "fileBase64Data":encodeURIComponent(e.target.result.replace(/data:(application\/vnd\.ms-excel)?;base64,/g,"")),
                                "id": $scope.outStoreId
                            }))
                            .done(function(datas){
                                alert(datas.message)
                                window.location.reload();
                            })
                            .fail(function(code,msg){
                                alert(msg)
                            })
                        };
                    },
                    'outStockImportManual' : {
                        "modal": $("#addItemsModal"),
                        "open": function () {
                            this.modal.modal({});
                        },
                        "save": function() {
                            // this.modal.modal('hide');
                            $.when(cmsTicketOutstoreAddcodesService.sendRequest({
                                "id" : $scope.outStoreId,
                                "ticketCodeInfos" : $scope.needImportIds
                            }))
                            .done(function(datas){
                                if(datas.result){
                                    alert(datas.message);
                                    window.location.reload();
                                }else{
                                    alert(datas.message)
                                }
                            })
                            .fail(function(code,msg){
                                alert(msg)
                            })
                        }
                    },
                    'userEmailExport' : {
                        "modal": $("#downloadModal"),
                        "open": function () {
                            this.modal.modal({});
                        },
                        "save": function() {
                            if($scope.exportUserEmail == null){
                                alert("请输入邮箱");
                                return;
                            }
                            this.modal.modal('hide');
                            this.export();
                        },
                        export: function() {
                            $.when(cmsTicketOutstoreExportService.sendRequest({
                                    "id" :  $scope.outStoreId,
                                    "userEmail": $scope.exportUserEmail
                                }))
                                .done(function(datas) {
                                    if(datas.result){
                                        alert('导出成功请到邮箱查看');
                                    }else{
                                        alert(datas.message);
                                    }
                                    $scope.$apply();
                                })
                                .fail(function(errCode,errMsg) {
                                    alert(errMsg)
                                })
                        }
                    },
                    'deleteItem' : function(id,version){
                        if(confirm("你确定删除吗?")){
                            $.when(cmsTicketOutstoreDelcodesService.sendRequest({
                                id : id,
                                version : version
                            }))
                            .done(function(datas) {
                                if(datas.result){
                                    window.location.reload();
                                }else{
                                    alert(datas.message);
                                }
                                $scope.$apply();
                            })
                            .fail(function(errCode,errMsg) {
                                alert(errMsg)
                            })                           
                        }
                    }
                }

                $scope.status.getOutstoreDetail();

                $scope.btns = {
                    "manageAudit":function(){
                        var that = this;
                        var params = {id:$scope.outStoreId,version:$scope.version};
                        if(confirm("你确定通过审核?")) {
                            $.when(OutStoreAuditService.sendRequest(params))
                                .done(function (result) {
                                    if (result.result) {
                                        alert('审核通过');
                                        //$scope.searchPage.getData();
                                        window.location = 'index.html#/exchangeCoupon/takeOutStockList';
                                    } else {
                                        alert(result.message);
                                    }
                                })
                        }
                    },
                    "manageReject":function(){
                        var that = this;
                        var params = {id:$scope.outStoreId,version:$scope.version};
                        if(confirm("你确定驳回吗?")) {
                            $.when(OutStoreRejectService.sendRequest(params))
                                .done(function (result) {
                                    if (result.result) {
                                        alert('驳回成功！');
                                        //$scope.searchPage.getData();
                                        window.location = 'index.html#/exchangeCoupon/takeOutStockList';
                                    } else {
                                        alert(result.message);
                                    }
                                })
                        }
                    },
                }

            }
        ]);

    });

