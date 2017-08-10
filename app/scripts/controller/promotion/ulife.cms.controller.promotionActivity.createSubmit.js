/**
 * Created by Ulife on 2016/1/15.
 */

define([
        'ulife.cms.module.myApp',
        'ulife.framework.services',
        'ulife.cms.business.config',
        'ulife.cms.menu.config',

        'ulife.api.promotion.whitelist.getlist',
        'ulife.api.promotion.whitelist.deleteitems',
        'ulife.api.promotion.whitelist.export',
        'ulife.api.promotion.whitelist.Import',
        'ulife.api.promotion.whitelist.addItem',
        'ulife.api.promotion.activity.get',
        'ulife.api.promotion.card.getlist',

        'ulife.cms.directive.datetimepicker',
        'ulife.cms.directive.dateformat',
        'ng-file-upload-all',
        "ulife.cms.service.authority"

    ],
    function(app, services, BizConfig, MenuConfig, getList, deleteItems,exportList, importList, promotionWhitelistAddItem, getActivity, cardList) {

        getList.injectTo(app);
        deleteItems.injectTo(app);
        exportList.injectTo(app);
        importList.injectTo(app);
        getActivity.injectTo(app);
        promotionWhitelistAddItem.injectTo(app);
        cardList.injectTo(app);

        app.filter('cartType', function () {
            return function (val) {
                switch (val) {
                    case 'REDUCE' :
                        return '满减券';
                    case 'POSTAGEREDUCE' :
                        return '免邮券';
                }
            }
        });

        app.filter('itemType', function () {
            var map = {
                'REDUCE': '排除全局黑名单',
                'POSTAGEREDUCE': '导入白名单'
            }

            return function (val) {
                return map[val];
            }
        });

        app.controller('PromotionActivityCreateSubmitCtrl', ['$scope', '$location', '$route','$filter', 'UploadBase',
            'promotionWhitelistGetlistService',
            'promotionWhitelistDeleteitemsService',
            'promotionWhitelistExportService',
            'promotionWhitelistImportService',
            'promotionWhitelistAddItemService',
            'promotionActivityGetService',
            'promotionCardGetlistService', 'authorityService',

            function($scope, $location, $route,$filter, UploadBase,
                     promotionWhitelistGetlistService,
                     promotionWhitelistDeleteitemsService,
                     promotionWhitelistExportService,
                     promotionWhitelistImportService,
                     promotionWhitelistAddItemService,
                     promotionActivityGetService,
                     promotionCardGetlistService) {

                $scope.menuConfig = MenuConfig.menu;
                var id = $route.current.params.id;
                $scope.aid = id;
                $scope.renderObj = {};
                $scope.cartPackage = {};
                $scope.rulesRoot = [];
                $scope.resultMsg="";


                $scope.addItemsModal = {
                    modal: $("#addItemsModal"),
                    itemIds: "",
                    open: function () {
                        this.modal.modal({});
                    },
                    ok: function() {
                        var that = this;
                        $.when(promotionWhitelistAddItemService.sendRequest({
                            actid: $scope.aid,
                            id: $scope.exportParams.id,
                            items: that.itemIds
                        }))
                            .done(function(result) {
                                alert(result.message);
                                if (result.success) {
                                    $scope.searchPage.search();
                                } else {
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
                        "itemId": null,
                        "actid": id,
                        "id": null,
                        "page": 1,
                        "rows": 10
                    },
                    "search": function() {
                        this.params.rows = this.pageSize;
                        this.params.page = 1;
                        this.getData();
                    },
                    "getData": function() {
                        var tmpParams = {};
                        _.each(this.params, function(value, key, list) {
                            if(!!value) {
                                tmpParams[key] = value;
                            }
                        });
                        _.each($scope.exportParams, function(value, key, list) {
                            if(!!value) {
                                tmpParams[key] = value;
                            }
                        });
                        var that = this;
                        //获取页面列表
                        $.when(promotionWhitelistGetlistService.sendRequest(tmpParams))
                            .done(function(result) {
                                $scope.renderObj = result;
                                $scope.ids = [];
                                //处理分页信息
                                that.pageCount = result.count;
                                that.pageTotal = Math.ceil(result.count / that.pageSize);

                                $scope.$apply();
                            })
                            .fail(function() {
                            })
                    },
                    "pre": function() {
                        if (this.pageNum == 1) {
                            this.params.page = this.pageTotal;
                        }else{
                            this.params.page--;
                        }
                        $scope.ids = [""];
                        this.pageNum = this.params.page;
                        this.getData();
                    },
                    "next": function() {
                        if (this.pageNum >= this.pageTotal) {
                            this.params.page = 1;
                        }else {
                            this.params.page++;
                        }
                        $scope.ids = [""];
                        this.pageNum = this.params.page;
                        this.getData();
                    }
                }


                $.when(promotionCardGetlistService.sendRequest({"type":""}))
                    .done(function(REDUCE) {
                        $scope.rulesRoot = REDUCE.value;
                    })
                    .then(function() {
                        if($scope.aid > 0){
                            $.when(promotionActivityGetService.sendRequest({"id":$scope.aid}))
                                .done(function(result) {
                                    $scope.searchPage.search();
                                    $scope.cartPackage = JSON.parse(result.cartPackage);
                                    _.each($scope.cartPackage, function(items, index, list) {
                                        if(index == 0){
                                            $scope.searchPage.params.id = items.whitelistId;
                                            $scope.exportParams.id = items.whitelistId;
                                        }
                                        _.each($scope.rulesRoot, function(item, index, list) {
                                            if(items.cardId == item.id){
                                                items.display = item.name;
                                            }
                                        })
                                    })

                                    $scope.$apply();
                                })
                                .fail(function() {
                                })
                        }
                    })
                    .fail(function() {
                    })

                $.when(promotionActivityGetService.sendRequest({"id":id}))
                    .done(function(result) {
                        $scope.cartPackage = JSON.parse(result.cartPackage);
                    })
                    .fail(function() {

                    });

                $scope.params = [];

                $scope.removeRule = function (index, id) {
                    $scope.ruleData.splice(index, 1);
                };

                $scope.itemClass = 3;

                $scope.nextItem ={
                    "confirmRule": function(){
                        $scope.itemClass=4;
                    }
                }

                // upload on file select or drop
                $scope.upload = function (file) {
                    var reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = function(e){
                        $.when(promotionWhitelistImportService.sendRequest({
                            "base64":encodeURIComponent(e.target.result.replace(/data:(application\/vnd\.ms-excel)?;base64,/g,"")),
                            "actid":id, 
                            "id":$scope.exportParams.id})
                        ).done(function(result) {
                                alert(result.message);
                                if (result.success) {
                                    $scope.searchPage.search();
                                }else {
                                    $scope.resultMsg ='上传失败\r\n' +result.message.replace(/<br\/>/g, "\r\n");
                                }
                                $scope.$apply();
                            })
                            .fail(function() {
                            })
                    };
                };

                $scope.exportParams = {
                    "id":"",
                    "mailAdress": ""
                }

                $scope.createActivity = {
                    "modal": $("#downloadModal"),
                    "open": function () {
                        this.modal.modal({});
                    },
                    "save": function() {
                        if($scope.exportParams.mailAdress == "" || $scope.exportParams.id == ""){
                            return;
                        }
                        this.modal.modal('hide');
                        this.export();
                        this.page = this.oriPage;
                    },
                    export: function() {
                        $.when(promotionWhitelistExportService.sendRequest($scope.exportParams)).done(function(result) {
                                alert(result.value);
                                $scope.$apply();
                            })
                            .fail(function() {
                            })
                    }
                }

                $scope.ischeck = false;
                $scope.ids = [""];
                var str = "";
                var flag = false;//是否点击了全选
                $scope.checkAll = function(c, v){
                    $scope.ids = [];
                    if(c){
                        $scope.ischeck = true;
                        _.each(v ,function(value){
                            $scope.ids.push(value.id+"");
                        });
                        flag = true;
                    }else{
                        $scope.ischeck = false;
                        flag = false;
                    }
                }

                $scope.checkOne = function(id, x){
                    if(flag){
                        str = $scope.ids.join(',') + ',';
                    }
                    if(x){
                        str += id + ',';
                    }else{
                        str = str.replace(id + ',', '');//取消选中
                    }
                    $scope.ids=(str.substr(0,str.length-1)).split(',');
                }

                $scope.deleteWhitelist = function(){
                    if($scope.ids[0] == '' && $scope.ids.length == 0){
                        return;
                    }
                    $.when(promotionWhitelistDeleteitemsService.sendRequest({"ids":$scope.ids.join(',')})).done(function(result) {
                            alert(result.value);
                        })
                        .fail(function() {

                        });
                }



                $scope.setValue = function(id){
                    $scope.searchPage.params.id = id;
                    $scope.exportParams.id = id;
                }


            }
        ]);

    });

