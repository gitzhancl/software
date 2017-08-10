/**
 * Created by Ulife on 2016/1/22.
 */

define([
        'ulife.cms.module.myApp',
        'store',
        'ulife.framework.services',
        'ulife.cms.business.config',
        'ulife.cms.menu.config',

        'ulife.api.restore.getoutrecord',
        'ulife.api.restore.add',
        'ulife.api.restore.get',
        'ulife.api.restore.export',
        'ulife.api.restore.list.delete',
        'ulife.api.restore.list.manual',
        'ulife.api.restore.list.upload',

        'ulife.cms.directive.datepicker',
        'ulife.cms.directive.datetimepicker',
        'ulife.cms.directive.tooltip',
        'ulife.cms.directive.dateformat',
        "ulife.cms.service.authority",
        'ng-file-upload-all'

    ],
    function (app, store, services, BizConfig, MenuConfig, restoreGetCord, restoreAdd,restoreGet, restoreExport,restoreListDelete,restoreListManual,restoreListUpload) {

        restoreGetCord.injectTo(app);
        restoreAdd.injectTo(app);
        restoreGet.injectTo(app);
        restoreExport.injectTo(app);
        restoreListDelete.injectTo(app);
        restoreListManual.injectTo(app);
        restoreListUpload.injectTo(app);
        var deportmentList = store.get('setDeptList');

        app.controller('baskStoreCreateCtrl', ['$scope', '$location', '$route',
            'restoreGetoutrecordService',
            'restoreAddService',
            'restoreGetService',
            'restoreExportService',
            'restoreListDeleteService',
            'restoreListManualService',
            'restoreListUploadService',
            'authorityService',

            function ($scope, $location, $route, restoreGetoutrecordService, restoreAddService,restoreGetService, restoreExportService, restoreListDeleteService,restoreListManualService,restoreListUploadService,authorityService) {

                $scope.menuConfig = MenuConfig.menu;

                $scope.params = {
                    id : 0,
                    ticketId : 0,
                    departmentId : "",
                    demandMan : "",
                    count : 0,
                }

                $scope.permission = {
                    CloseEditId : false
                }

                //状态配置
                $scope.showBtn = {
                    importBtn : false, //导入按钮
                    importManual : false, // 手动导入按钮
                    exportBtn : false, // 导出按钮
                    downLoadBtn :false, // 下载表格按钮
                    createInstoreBtn : true, // 创建入库单按钮
                    isQueryEdit : true,
                    deleteItem : false
                };

                // 生成退库单
                $scope.restoreAdd = function(){
                    if(_.isEmpty($scope.params.orderNo)){
                        alert('请填写领用出库单号并查询');
                        return;
                    }
                    if(_.isEmpty($scope.purpose)){
                        alert('请填写领用出库单号并查询');
                        return;
                    }
                    $.when(restoreAddService.sendRequest({
                            'outStoreCode' : $scope.params.orderNo
                        }))
                        .done(function(datas){
                            alert('生成退库单成功'+datas.id);
                            $scope.showlist = true;
                            $scope.backStoreCreateSuccessId = datas.id;
                            $scope.$apply();
                        })
                        .fail(function (code, msg) {
                            alert(msg);
                        })
                }

                // 查询出库单
                $scope.restoreGetOutRecord = function(){
                    $.when(restoreGetoutrecordService.sendRequest({
                            'orderNo' : $scope.params.orderNo
                        }))
                        .done(function(data){
                            if(data.status == 'success'){
                                $scope.purpose = JSON.parse(data.message).purpose;
                                $scope.department = JSON.parse(data.message).departmentName;
                                $scope.demandMan = JSON.parse(data.message).demandMan;
                                $scope.count = JSON.parse(data.othermsg);
                                if($location.url().indexOf('create') > 0){
                                    $scope.showBtn.createInstoreBtn = true;
                                }
                            }else{
                                alert(data.debugString)
                            }
                            $scope.$apply();
                        })
                        .fail(function (code, msg) {
                            //alert(msg);
                        })
                }

                $scope.btn = {
                    // 手动导入券号
                    'backStoreDetailImportManual' : {
                        "modal": $("#addItemsModal"),
                        "open": function () {
                            this.modal.modal({});
                        },
                        "save": function() {
                            $.when(restoreListManualService.sendRequest({
                                    "id" : $scope.backStoreCreateSuccessId,
                                    "codeString" : $scope.needImportIds
                                }))
                                .done(function(datas){
                                    if(datas.status == "success"){
                                        alert(datas.message+","+datas.remark);
                                        if($location.url().indexOf('create') > 0){
                                            window.location.href = "index.html?#/exchangeCoupon/backStockList/edit/" + $scope.backStoreCreateSuccessId;
                                        }else{
                                            window.location.reload();
                                        }
                                       // window.location.href = "index.html?#/exchangeCoupon/backStockList/edit/" + $scope.backStoreCreateSuccessId;
                                    }else{
                                        alert(datas.debugString);
                                    }
                                })
                                .fail(function(code,msg){
                                    alert(msg)
                                })
                        },

                    },
                    // 导入退库单券号
                    'backStoreDetailImport' : function(file){

                        var reader = new FileReader();
                        reader.readAsDataURL(file);
                        reader.onload = function(e){
                            $.when(restoreListUploadService.sendRequest({
                                    "fileString":encodeURIComponent(e.target.result.replace(/data:(application\/vnd\.ms-excel)?;base64,/g,"")),
                                    "id": $scope.backStoreCreateSuccessId
                                }))
                                .done(function(datas){
                                    if(datas.status == "success"){
                                        alert(datas.message+","+datas.remark);
                                        if($location.url().indexOf('create') > 0){
                                            window.location.href = "index.html?#/exchangeCoupon/backStockList/edit/" + $scope.backStoreCreateSuccessId;
                                        }else{
                                            window.location.reload();
                                        }
                                       // window.location.href = "index.html?#/exchangeCoupon/backStockList/edit/" + $scope.backStoreCreateSuccessId;
                                    }else {
                                        alert(datas.debugString);
                                    }
                                })
                                .fail(function(code,msg){
                                    alert(msg)
                                })
                        };
                    },
                    // 导出退库单
                    'userEmailExport' : {
                        "modal": $("#downloadModal"),
                        "open": function () {
                            this.modal.modal({});
                        },
                        "save": function () {
                            if (!$scope.backStoreCreateSuccessId) {
                                alert("请先创建退库单");
                                return;
                            }
                            if ($scope.exportUserEmail == null) {
                                alert("请输入邮箱");
                                return;
                            }
                            this.modal.modal('hide');
                            this.export();
                        },
                        export: function () {
                            $.when(restoreExportService.sendRequest({
                                "id": $scope.backStoreCreateSuccessId,
                                "userEmail": $scope.exportUserEmail
                            })).done(function (datas) {
                                    if (datas.status == "success") {
                                        alert('导出成功请到邮箱查看');
                                    } else {
                                        alert(datas.debugString);
                                    }
                                    $scope.$apply();
                                })
                                .fail(function (errCode, errMsg) {
                                    alert(errMsg)
                                })
                        }
                    },

                    deleteItem : function(id){
                        var rlt = confirm("确认删除该项吗?");
                        if (rlt != true) {
                            return;
                        }
                        $.when(restoreListDeleteService.sendRequest({
                            "id": id
                        })).done(function(datas) {
                                if(datas.status == "success"){
                                    window.location.reload();
                                }else{
                                    alert(datas.debugString);
                                }
                                $scope.$apply();
                            })
                            .fail(function(errCode,errMsg) {
                                alert(errMsg)
                            })
                    }
                }

                $scope.status = {
                    // 获取退库单信息
                    'restoreGet' : function(){
                        $.when(restoreGetService.sendRequest({
                                "id": $scope.backStoreCreateSuccessId
                            }))
                            .done(function(datas){
                                $scope.params.orderNo = JSON.parse(datas.outStoreInfo).orderNo;
                                $scope.purpose = JSON.parse(datas.outStoreInfo).purpose;
                                $scope.department = deportmentList[JSON.parse(datas.outStoreInfo).departmentId];
                                $scope.demandMan = JSON.parse(datas.outStoreInfo).demandMan;
                                $scope.count = JSON.parse(datas.outStoreCount);
                                $scope.detailList = datas.items;
                                $scope.$apply();
                            })
                            .fail(function(code,msg){
                                alert(msg)
                            })
                    },
                }

                if($location.url().indexOf('create') > 0){
                    $scope.showBtn = {
                        importBtn : true,
                        importManual : true,
                        downLoadBtn :true,
                        isQueryEdit : true,
                        deleteItem : true
                    }

                    $scope.titleValue = '新建退库单';

                }else if($route.current.params.method == 'edit'){
                    $scope.backStoreCreateSuccessId = $route.current.params.id
                    $scope.titleValue = '编辑' + $scope.backStoreCreateSuccessId;

                    $scope.showlist = true;
                    $scope.showBtn = {
                        importBtn : true,
                        importManual : true,
                        exportBtn : true,
                        downLoadBtn :true,
                        deleteItem : true,
                        createInstoreBtn : false,
                        isQueryEdit : false
                    };
                    $scope.status.restoreGet();
                    //$scope.status.instoreDetailList();

                }else{
                    $scope.backStoreCreateSuccessId = $route.current.params.id;
                    $scope.showBtn = {
                        isQueryEdit : false,
                        createInstoreBtn : false,
                        deleteItem : false,
                        exportBtn : true
                    }
                    $scope.titleValue = '查看' + $scope.backStoreCreateSuccessId;
                    $scope.showlist = true;
                    $scope.status.restoreGet();
                    //$scope.status.instoreDetailList();
                }
            }
        ]);

    });

