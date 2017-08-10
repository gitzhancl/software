/**
 * Created by liuyuefeng on 2016/02/25.
 */

define([
        'ulife.cms.module.myApp',
        'ulife.framework.services',
        'ulife.cms.business.config',
        'ulife.cms.menu.config',

        'ulife.api.promotion.card.getlist',
        'ulife.api.promotion.card.save',
        "ulife.cms.service.valid",
        "ulife.cms.service.authority"
    ],
    function(app, services, BizConfig, MenuConfig, getPageList, cardSave) {

        getPageList.injectTo(app);
        cardSave.injectTo(app);

        app.filter('promotionType', function () {
            return function (val) {
                switch (val) {
                    case 'REDUCE' :
                        return '满X元减N元';
                    case 'POSTAGEREDUCE' :
                        return '满X元包邮';
                    case 'GROUPREDUCE' :
                        return '团购满减券';
                }
            }
        });
        app.controller('PromotionTypeListCtrl', ['$scope', '$location', '$route',
            'promotionCardGetlistService',
            'promotionCardSaveService',
            "authorityService",

            function($scope, $location, $route, promotionCardGetlistService, promotionCardSaveService) {

                $scope.menuConfig = MenuConfig.menu;

                $scope.renderObj = {};

                $scope.pType = '';

                $scope.promotionType = [
                    {'key': '全部', 'deviceId':''},
                    {'key': '满X元减N元', 'deviceId':'REDUCE'},
                    {'key': '满X元包邮', 'deviceId': 'POSTAGEREDUCE'},
                    {'key': '团购满减券', 'deviceId': 'GROUPREDUCE'}
                ];

                $scope.addPage = {
                    "modal": $("#addMJModal"),
                    "open": function () {
                        if($scope.pType == ""){
                            alert("请选择类型");
                            return;
                        }
                        this.modal.modal({});
                        this.params.limit = 0;
                        this.params.preferential = 0;
                    },
                    "save": function() {
                        this.params.type = $scope.pType;
                        if(this.params.limit == null || this.params.limit == 0){
                            alert("缺少必填项！");
                            return false;
                        }
                        if((this.params.type == "REDUCE"||this.params.type == "GROUPREDUCE") && (this.params.preferential == null || this.params.preferential == 0)){
                            alert("缺少必填项");
                            return false;
                        }
                        this.modal.modal('hide');
                        this.addPage();

                    },
                    "params":{
                        "name":"",
                        "type":$scope.pType,
                        "limit":0,
                        "preferential":0,
                        "desc":"",
                        "ratio":"0"
                    },
                    addPage: function() {
                        if($scope.pType == 'REDUCE'){
                            this.params.name = "满"+this.params.limit+"减"+this.params.preferential+"元";
                            this.params.desc=this.params.name;
                        }else if($scope.pType == 'GROUPREDUCE'){
                            this.params.name = "满"+this.params.limit+"减"+this.params.preferential+"元";
                            this.params.desc=this.params.name;
                        }else{
                            this.params.name = "满"+this.params.limit+"元, 减运费" +this.params.preferential+"元";
                            this.params.desc="包首重";
                        }
                        //this.params.desc=this.params.name;
                        $.when(promotionCardSaveService.sendRequest({
                            "card": JSON.stringify(this.params)
                        }))
                            .done(function(result) {
                                $scope.searchPage.search();
                                $scope.$apply();
                            })
                            .fail(function(r, e) {
                                alert(e);
                            })
                    }
                }

                $scope.searchPage = {
                    "search": function() {
                        this.getData();
                    },
                    "getData": function() {
                        //获取页面列表
                        $.when(promotionCardGetlistService.sendRequest({"type":$scope.pType}))
                            .done(function(result) {
                                $scope.renderObj = result;
                                $scope.$apply();
                            })
                            .fail(function() {
                            })
                    }
                }
                $scope.searchPage.search();



            }
        ]);

    });

