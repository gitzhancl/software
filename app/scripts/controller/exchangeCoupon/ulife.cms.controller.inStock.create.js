/**
 * Created by Ulife on 2016/1/22.
 */

define([
        'ulife.cms.module.myApp',
        'ulife.framework.services',
        'ulife.cms.business.config',
        'ulife.cms.menu.config',

        'ulife.api.instore.create',
        'ulife.api.instorebase.getbycodeno',
        'ulife.api.instoredetail.import',
        'ulife.api.instoredetail.add',
        'ulife.api.instore.get',
        'ulife.api.instoredetail.list',
        'ulife.api.instoredetail.export',
        'ulife.api.instoredetail.delete',

        'ulife.cms.directive.datepicker',
        'ulife.cms.directive.datetimepicker',
        'ulife.cms.directive.tooltip',
        'ulife.cms.directive.dateformat',
        "ulife.cms.service.authority",
        'ng-file-upload-all'

    ],
    function (app, services, BizConfig, MenuConfig, instoreCreate,instorebaseGetbycodeno,instoredetailImport,instoredetailAdd,instoreGet,instoredetailList,instoredetailExport,instoredetailDelete) {

        instorebaseGetbycodeno.injectTo(app);
        instoreCreate.injectTo(app);
        instoredetailImport.injectTo(app);
        instoredetailAdd.injectTo(app);
        instoreGet.injectTo(app);
        instoredetailList.injectTo(app);
        instoredetailExport.injectTo(app);
        instoredetailDelete.injectTo(app);

        app.controller('inSrockCreate', ['$scope', '$location', '$route',
            'instorebaseGetbycodenoService','instoreCreateService', 'instoredetailImportService','instoredetailAddService', 'instoreGetService', 'instoredetailListService', 'instoredetailExportService', 'instoredetailDeleteService',
            'authorityService',

            function ($scope, $location, $route, instorebaseGetbycodenoService,instoreCreateService, instoredetailImportService, instoredetailAddService, instoreGetService, instoredetailListService, instoredetailExportService, instoredetailDeleteService, cmsPageAddService) {

                $scope.menuConfig = MenuConfig.menu;

                $scope.codeDetail = {};

                $scope.page = {};

                $scope.showlist = false;

                //状态配置
                $scope.showBtn = {
                    importBtn : false, //导入按钮
                    importManual : false, // 手动导入按钮
                    exportBtn : false, // 导出按钮
                    downLoadBtn :false, // 下载表格按钮
                    createInstoreBtn : true, // 创建入库单按钮
                    isQueryEdit : true,
                    deleteItem : true
                };

                $scope.btn = {
                    // 查询券号生成单
                    getByCodeNum : function(){
                        if(_.isEmpty($scope.codeNum)){
                            alert('缺少必填字段：券号生成单');
                            return;
                        }
                        $.when(instorebaseGetbycodenoService.sendRequest({
                            'codeNo' : $scope.codeNum
                        }))
                        .done(function(datas){
                            if(_.isEmpty(datas)){
                                alert('未找到券号生成单号');
                                return;
                            }
                            $scope.codeDetail = datas;
                            $scope.departmentId = datas.departmentId;
                            if($location.url().indexOf('create') > 0){
                                $scope.showBtn.createInstoreBtn = true;
                            }   
                        })
                        .fail(function (code,msg) {
                            $scope.codeDetail = {};
                            alert(msg)
                        })
                        .always(function(){
                            $scope.$apply();
                        })
                    },
                    // 生成入库单
                    'instoreCreate' : function(){
                        $.when(instoreCreateService.sendRequest({
                            'codeId' : $scope.codeDetail.codeId
                        }))
                        .done(function(datas){
                            if(datas.result){
                                alert('生成入库单成功');
                                $scope.showlist = true;
                                $scope.instoreCreateSuccessId = datas.message;
                                $scope.$apply();
                                if($route.current.params.method == 'edit'){
                                    window.location.reload()
                                }else{
                                    window.location.href = "index.html?#/exchangeCoupon/inStockList/edit/" + $scope.instoreCreateSuccessId;
                                }

                                
                            }else{
                                alert(datas.message)
                            }
                        })
                        .fail(function (code,msg) {
                            alert(msg)
                        })
                        .always(function(){
                            $scope.$apply();
                        })
                    },
                    // 导入入库单券号
                    'instoredetailImport' : function(file){
                        var reader = new FileReader();
                        reader.readAsDataURL(file);
                        reader.onload = function(e){
                            $.when(instoredetailImportService.sendRequest({
                                "base64":encodeURIComponent(e.target.result.replace(/data:(application\/vnd\.ms-excel)?;base64,/g,"")),
                                "inStoreId": $scope.instoreCreateSuccessId
                            }))
                            .done(function(datas){
                                alert(datas.message)
                                if(datas.result){
                                    window.location.reload()
                                }
                            })
                            .fail(function(code,msg){
                                alert(msg)
                            })
                        };
                    },
                    // 手动导入券号
                    'instoredetailImportManual' : {
                        "modal": $("#addItemsModal"),
                        "open": function () {
                            this.modal.modal({});
                        },
                        "save": function() {
                            // this.modal.modal('hide');
                            $.when(instoredetailAddService.sendRequest({
                                "inStoreId" : $scope.instoreCreateSuccessId,
                                "codes" : $scope.needImportIds
                            }))
                            .done(function(datas){
                                alert(datas.message)
                                if(datas.result){
                                    window.location.reload();
                                }
                            })
                            .fail(function(code,msg){
                                alert(msg)
                            })
                        }
                    },
                    // 导出入库单
                    'userEmailExport' : {
                        "modal": $("#downloadModal"),
                        "open": function () {
                            this.modal.modal({});
                        },
                        "save": function() {
                            if(!$scope.instoreCreateSuccessId){
                                alert("请先创建入库单");
                                return;
                            }
                            if($scope.exportUserEmail == null){
                                alert("请输入邮箱");
                                return;
                            }
                            this.modal.modal('hide');
                            this.export();
                        },
                        export: function() {
                            $.when(instoredetailExportService.sendRequest({
                                    "inStoreId" :  $scope.instoreCreateSuccessId,
                                    "mailAdress": $scope.exportUserEmail
                                })).done(function(datas) {
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
                    deleteItem : function(id){
                        var rlt = confirm("确认删除该项吗?");
                        if (rlt != true) {
                            return;
                        }
                        $.when(instoredetailDeleteService.sendRequest({
                            "inStoreId" : $scope.instoreCreateSuccessId,
                            "ids": id
                        })).done(function(datas) {
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
                };


                $scope.status = {
                    // 获取入库单信息
                    'instoreGet' : function(){
                        $.when(instoreGetService.sendRequest({
                                "id": $scope.instoreCreateSuccessId
                            }))
                            .done(function(datas){
                                $scope.codeNum = datas.codeNo;
                                $scope.btn.getByCodeNum();
                                $scope.$apply();
                            })
                            .fail(function(code,msg){
                                alert(msg)
                            })   
                    },
                    'instoreDetailList' : {
                        "pageSize": 50,  //页大小
                        "pageNum": 1,   //当前页码
                        "pageTotal": 1,  //页面数量
                        "pageCount": 1, //数据个数
                        "pageShow": [],
                        "params": {
                            "inStoreId" : $route.current.params.id
                        },
                        "search": function() {
                            this.params.page = 1;
                            this.params.rows = this.pageSize;
                            this.getData();
                        },
                        "getData": function() {
                            var tmpParams = this.params;
                           
                            tmpParams.rows = this.pageSize;
                            tmpParams.page = this.pageNum;

                            //tmpParams.from = (this.pageNum - 1) * this.pageSize;
                            var that = this;
                            //获取页面列表
                            $.when(instoredetailListService.sendRequest(tmpParams))
                                .done(function(datas) {
                                    $scope.detailList = datas.cmsInStoreList;

                                    //处理分页信息
                                    that.pageCount = datas.count;
                                    that.pageTotal = Math.ceil(datas.count / that.pageSize);
                                    console.log(that)
                                    $scope.$apply();
                                })
                                .fail(function(code,msg){
                                    alert(msg)
                                })
                        },
                        "pre": function() {
                            if (this.pageNum == 1) {
                                this.params.page = this.pageTotal;
                            }else{
                                this.params.page--;
                            }
                            this.pageNum = this.params.page;
                            this.getData();
                        },
                        "next": function() {
                            if (this.pageNum == this.pageTotal) {
                                this.params.page = 1;
                            }else {
                                this.params.page++;
                            }
                            this.pageNum = this.params.page;
                            this.getData();
                        }
            
                    }
                }

                if($location.url().indexOf('create') > 0){
                    $scope.showBtn = {
                        importBtn : true,
                        importManual : true,
                        downLoadBtn :true,
                        isQueryEdit : true,
                        deleteItem : true
                    }
                    $scope.titleValue = '新建入库单';
                }else if($route.current.params.method == 'edit'){
                    $scope.instoreCreateSuccessId = $route.current.params.id
                    $scope.titleValue = '编辑' + $scope.instoreCreateSuccessId;

                    $scope.showlist = true;
                    $scope.showBtn = {
                        importBtn : true,
                        importManual : true,
                        exportBtn : true,
                        downLoadBtn :true,
                        createInstoreBtn : false,
                        isQueryEdit : false,
                        deleteItem : true
                    };
                    $scope.status.instoreGet();
                    $scope.status.instoreDetailList.search();

                }else{
                    $scope.instoreCreateSuccessId = $route.current.params.id;
                    $scope.showBtn = {
                        isQueryEdit : false,
                        createInstoreBtn : false,
                        deleteItem : false
                    }
                    $scope.titleValue = '查看' + $scope.instoreCreateSuccessId;
                    $scope.showlist = true;
                    $scope.status.instoreGet();
                    $scope.status.instoreDetailList.search();
                }


            }
        ]);

    });

