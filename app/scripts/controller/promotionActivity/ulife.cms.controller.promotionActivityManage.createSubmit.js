/**
 * Created by Ulife on 2016/1/15.
 */

define([
        'ulife.cms.module.myApp',
        'ulife.framework.services',
        'ulife.cms.business.config',
        'ulife.cms.menu.config',

        'ulife.api.cms.page.getList',
        'ulife.api.cms.page.add',

        'ulife.api.promotion.whitelist.getlist',
        'ulife.api.promotion.whitelist.deleteitems',
        'ulife.api.promotion.whitelist.Import',
        'ulife.api.promotion.whitelist.export',
        'ulife.api.promotion.whitelist.addItem',
        'ulife.api.promotion.activity.get',
        'ulife.api.promotion.cms.deleteConflictWhitelistProduct',
        'ulife.api.promotion.cms.checkWhitelistProduct',

        'ulife.cms.directive.datetimepicker',
        'ulife.cms.directive.dateformat',
        "ulife.cms.service.authority",
        'ng-file-upload-all'
    ],
    function(app, services, BizConfig, MenuConfig,
             getPageList, addPage,
             whitelistGetlist, whitelistDeleteitems, promotionWhitelistImport, promotionWhitelistExport, promotionWhitelistAddItem, promotionActivityGet,
             promotionCmsDeleteConflictWhitelistProduct,promotionCmsCheckWhitelistProduct) {

        getPageList.injectTo(app);
        addPage.injectTo(app);
        whitelistGetlist.injectTo(app);
        whitelistDeleteitems.injectTo(app);
        promotionWhitelistImport.injectTo(app);
        promotionWhitelistExport.injectTo(app);
        promotionWhitelistAddItem.injectTo(app);
        promotionActivityGet.injectTo(app);
        promotionCmsDeleteConflictWhitelistProduct.injectTo(app);
        promotionCmsCheckWhitelistProduct.injectTo(app);

        app.filter('promotionType', function () {
            return function (val) {
                switch (val) {
                    case 'REDUCE' :
                        return '满x元减n元';
                    case 'GIVE' :
                        return '满x元赠A商品n件';
                    case 'PIECEREDUCE' :
                        return 'A商品满n件减y元';
                    case 'PIECEGIVE' :
                        return 'A商品满n件赠B商品m件';
                    case 'OPTIONALLY' :
                        return 'x元选m件';
                    case 'FIRSTREDUCE' :
                        return '首单满x元减n元';
                    case 'FIRSTGIVE' :
                        return '首单满x元赠A商品n件';
                    case 'SPECIAL' :
                        return '限时特价';
                    case 'PANICBUY' :
                        return '限时抢购';
                }
            }
        });

        app.controller('PromotionActivityManageCreateSubmitCtrl', ['$scope', '$location', '$route','$filter','UploadBase',
            'cmsPageGetListService',
            'cmsPageAddService',
            'promotionWhitelistGetlistService',
            'promotionWhitelistDeleteitemsService',
            'promotionWhitelistImportService',
            'promotionWhitelistExportService',
            'promotionWhitelistAddItemService',
            'promotionActivityGetService',
            'promotionCmsDeleteConflictWhitelistProductService',
            'promotionCmsCheckWhitelistProductService',
            'authorityService',

            function($scope,$location, $route,$filter,UploadBase,cmsPageGetListService, cmsPageAddService,promotionWhitelistGetlistService,
                     promotionWhitelistDeleteitemsService,promotionWhitelistImportService,promotionWhitelistExportService,
                     promotionWhitelistAddItemService,
                     promotionActivityGetService,
                     promotionCmsDeleteConflictWhitelistProductService,
                     promotionCmsCheckWhitelistProductService) {

                $scope.document = {};

                $scope.menuConfig = MenuConfig.menu;

                $scope.renderObj = {};

                $scope.pType = '';
                $scope.prodType = '';
                $scope.termType = '';
                $scope.dept = '';
                $scope.ruleType = '';
                $scope.useDateType = '';
                $scope.startTime = '';
                $scope.publicPromType = '';
                $scope.execConditinType = '';
                $scope.promotionType = '';
                $scope.productLengthFlag = false;
                $scope.resultMsg = '';

                var activityId = $route.current.params.activityId;
                $scope.activityId = activityId;

                $scope.whitelistId = null;

                $scope.ruleData = [

                ];

                $scope.addRule = function () {
                    $scope.ruleData.push({
                        "promotionType":"",
                        "rules":"",
                        "useData":"1",
                        "startDate":"",
                        "endDate":"",
                        "useDay":0,
                        "promotionCount":1,
                        "title":""
                    });
                };

                $scope.removeRule = function (index, id) {
                    $scope.ruleData.splice(index, 1);
                };

                $scope.itemClass = 3;

                $scope.nextItem ={
                    "confirmProduct": function(){
                        /*$scope.itemClass=4;*/
                        //校验商品
                        $scope.searchPage.validProduct();
                    },
                    "checkProduct":function(){
//                        alert("checkProduct");
                        $.when(promotionCmsCheckWhitelistProductService.sendRequest({
                            id: $scope.whitelistId
                        }))
                        .done(function(result) {
                            alert(result.message);
                            $scope.resultMsg=result.message.replace(/<br\/>/g,"\r\n");
                            $scope.$apply();
                        })
                        .fail(function(code, msg) {
                            alert(msg);
                        })
                    },
                    "deleteProduct":function(){
//                        alert("deleteProduct");
                        $.when(promotionCmsDeleteConflictWhitelistProductService.sendRequest({
                            id: $scope.whitelistId
                        }))
                        .done(function(result) {
                            $scope.searchPage.search();
                            alert(result.message);
                            $scope.resultMsg=result.message.replace(/<br\/>/g,"\r\n");
                            $scope.$apply();
                        })
                        .fail(function(code, msg) {
                            alert(msg);
                        })
                    }
                }

                // upload on file select or drop
                $scope.upload = function (file) {
                    var reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = function(e){
                        $.when(promotionWhitelistImportService.sendRequest({
                            "base64":encodeURIComponent(e.target.result.replace(/data:(application\/vnd\.ms-excel)?;base64,/g,"")),
                            "actid":$scope.activityId, 
                            "id":$scope.whitelistId})).done(function(result) {
//                                $scope.searchPage.search();
//                                alert(result.value);
//                                $scope.resultMsg=result.value.replace(/<br\/>/g,"\r\n");
//                                $location.path('promotionActivityManage/createSubmit/'+$scope.activityId);
//                                /*console.log(e.target.result);*/
//                                $scope.$apply();
                                alert(result.message);
                                if (result.success) {
                                    $scope.searchPage.search();
                                } else {
                                    $scope.resultMsg = '上传失败\r\n' + result.message.replace(/<br\/>/g, "\r\n");
                                    $scope.$apply();
                                }
                            })
                            .fail(function() {
                            })
                    };
                };

                $scope.tesarry=[];//初始化数据


                $scope.choseArr=[];//定义数组用于存放前端显示
                var str="";//
                var flag='';//是否点击了全选，是为a
                $scope.x=false;//默认未选中

                $scope.all= function (c,v) {//全选
                    if(c==true){
                        $scope.x=true;
                        $scope.choseArr=v;
                    }else{
                        $scope.x=false;
                        $scope.choseArr=[""];
                    }
                    flag='a';
                };
                $scope.chk= function (z,x) {//单选或者多选
                    if(flag=='a') {//在全选的基础上操作
                        str = $scope.choseArr.join(',') + ',';
                    }
                    if (x == true) {//选中
                        str = str + z + ',';
                    } else {
                        str = str.replace(z + ',', '');//取消选中
                    }
                    $scope.choseArr=(str.substr(0,str.length-1)).split(',');
                };

                $scope.exportParams = {
                    "id":"",
                    "mailAdress": ""
                }

                $scope.productEx ={
                    "modal": $("#downloadModal"),
                    "delmodal": $("#delModuleModal"),
                    "export": function(){
                        $.when(promotionWhitelistExportService.sendRequest($scope.exportParams))
                            .done(function(result) {
                                alert(result.value);
                                $scope.$apply();
                            })
                            .fail(function() {
                            })
                    },
                    "open": function () {
                        this.modal.modal({});
                    },
                    "opendel": function () {
                        this.delmodal.modal({});
                    },
                    "delete":function(){
                        if($scope.choseArr[0]==""||$scope.choseArr.length==0){
                            alert("请至少选中一条数据再操作！")
                            return false;
                        };
                        $.when(promotionWhitelistDeleteitemsService.sendRequest({"ids":$scope.choseArr.join(",")}))
                            .done(function(result) {
                                /*$location.path('promotionActivityManage/createSubmit/'+$scope.activityId);*/
                                $scope.searchPage.search();
                                $scope.$apply();
                                /*return false;*/
                                /*$scope.$apply();*/
                            })
                            .fail(function() {
                            })

                    }
                }

                $scope.addItemsModal = {
                    modal: $("#addItemsModal"),
                    itemIds: "",
                    open: function () {
                        this.modal.modal({});
                    },
                    ok: function() {
                        var that = this;
                        if (!$scope.whitelistId) {
                            alert("缺少白名单")
                            return;
                        }
                        if (!that.itemIds) {
                            alert("缺少itemId")
                            return;
                        }
                        $.when(promotionWhitelistAddItemService.sendRequest({
                            actid: $scope.activityId,
                            id: $scope.whitelistId,
                            items: that.itemIds
                        }))
                            .done(function(result) {
                                if (result.success) {
                                    $scope.searchPage.search();
                                } else {
                                    alert(result.message);
                                    $scope.resultMsg='添加失败\r\n'+result.message.replace(/<br\/>/g,"\r\n");
                                    $scope.$apply();
                                }
                            })
                            .fail(function(code, msg) {
                                alert(msg);
                            })
                    }
                }

                $scope.searchPage = {
                    "pageSize": 20,  //页大小
                    "pageNum": 1,   //当前页码
                    "pageTotal": 1,  //页面数量
                    "pageCount": 1, //数据个数
                    "pageShow": [],
                    "params": {
                        "itemId":null,
                        "actid": $scope.activityId,
                        "id":$scope.whitelistId,
                        "page": 1,
                        "rows": 10
                    },
                    "search": function() {
                        this.params.page = 1;
                        this.params.rows = this.pageSize;
                        this.params.id = $scope.whitelistId;
                        this.params.actid = $scope.activityId,
                        this.getData();
                    },
                    "getData": function() {
                        var tmpParams = {};
                        _.each(this.params, function(value, key, list) {
                            if(!!value) {
                                tmpParams[key] = value;
                            }
                        });
                        var that = this;
                        //获取页面列表
                        $.when(promotionWhitelistGetlistService.sendRequest(tmpParams))
                            .done(function(result) {
                                $scope.renderObj = result;

                                angular.forEach($scope.renderObj.promoWhitelistProducts, function(data){
                                    $scope.tesarry.push(data.id);
                                });

                                $scope.previewLinks = BizConfig.setting['preview_links'];

                                //处理分页信息
                                that.pageCount = result.count;
                                that.pageTotal = Math.ceil(result.count / that.pageSize);
                                $scope.$apply();
                            })
                            .fail(function() {
                            })
                    },
                    "validProduct": function() {
                        var tmpParams1 = {};
                        _.each(this.params, function(value, key, list) {
                            if(!!value) {
                                tmpParams1[key] = value;
                            }
                        });
                        var that = this;
                        //获取页面列表
                        $.when(promotionWhitelistGetlistService.sendRequest(tmpParams1))
                            .done(function(result) {
                                    if(result.promoWhitelistProducts == undefined||result.promoWhitelistProducts.length<1){
                                        alert("请导入商品！");
                                        return false;
                                    }else {
                                        $location.path('promotionActivityManage/createSuccess/'+$scope.activityId);
                                    }
                                $scope.$apply();
                            })
                            .fail(function() {
                            })
                    },
                    "goto": function(pageNum) {
                        this.pageNum = pageNum;
                        if (!!pageNum && _.isNumber(pageNum) && pageNum > 0) {
                            this.params.from = this.pageSize * (pageNum - 1);
                        }
                        this.getData()

                    },
                    "pre": function() {
                        $scope.tesarry=[];//清除商品数据
                        if (this.pageNum == 1) {
                            this.params.page = this.pageTotal;
                        }else{
                            this.params.page--;
                        }
                        this.pageNum = this.params.page;
                        this.getData();
                    },
                    "next": function() {
                        $scope.tesarry=[];//清除商品数据
                        if (this.pageNum == this.pageTotal) {
                            this.params.page = 1;
                        }else {
                            this.params.page++;
                        }
                        this.pageNum = this.params.page;
                        this.getData();
                    }
                }


                $scope.initWhitelistId = function () {
                    $.when(promotionActivityGetService.sendRequest({"id":activityId}))
                        .done(function(result) {
                            $scope.whitelistId = result.whitelistId;
                            $scope.exportParams.id = result.whitelistId;
                            $scope.$apply();
                        })
                        .then(function(result) {
                            $scope.exportParams.id = result.whitelistId;
                            $scope.promotionType = result.promoRule.type;
                            $scope.searchPage.search();
                        })
                        .fail(function() {
                        })
                }
                $scope.initWhitelistId();



            }
        ]);

    });

