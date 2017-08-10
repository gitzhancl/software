/**
 * Created by LMF on 2016-10-09.
 */
/**
 * Created by Ulife on 2016/1/15.
 */
/**
 * Created by Zhangke on 2015/12/15.
 */

define([
        'moment',
        'ulife.cms.module.myApp',
        'ulife.framework.services',
        'ulife.cms.business.config',
        'ulife.cms.menu.config',

        'ulife.api.promotion.activity.publish',
        'ulife.api.promotion.activity.cancel',
        'ulife.api.promotion.activity.get',
        'ulife.api.promotion.activity.save',
        'ulife.api.promotion.card.getlist',
        "ulife.api.common.paytype",

        'ulife.cms.directive.datetimepicker',
        'ulife.cms.directive.dateformat',
        'ulife.cms.directive.tooltip',
        "ulife.cms.service.valid",
        "ulife.cms.service.authority"
    ],
    function(moment, app, services, BizConfig, MenuConfig,activityPublish, activityCancel, activityGet, activitySave, cardList,commonPaytype) {
        activityPublish.injectTo(app);
        activityCancel.injectTo(app);
        activityGet.injectTo(app);
        activitySave.injectTo(app);
        cardList.injectTo(app);
        commonPaytype.injectTo(app);

        app.controller('PromotionActivityBankCreateCtrl', ['$scope', '$location', '$route','$filter',
            'promotionActivityPublishService',
            'promotionActivityCancelService',
            'promotionActivityGetService',
            'promotionActivitySaveService',
            'promotionCardGetlistService',
            'validService',
            'commonPaytypeService',
            'authorityService',

            function($scope, $location, $route,$filter,
                     promotionActivityPublishService,
                     promotionActivityCancelService,
                     promotionActivityGetService,
                     promotionActivitySaveService,
                     promotionCardGetlistService,
                     validService,commonPaytypeService) {

                $scope.id = $route.current.params.id;
                $scope.menuConfig = MenuConfig.menu;

                $scope.renderObj = {};

                $scope.today = new Date();


                $scope.rules = [];
                $scope.rulesRoot = {"ALL":[],"REDUCE":[],"POSTAGEREDUCE":[],"GROUPREDUCE":[]};
                $scope.week = [];
                $scope.paymeth = [];

                $scope.week=[{
                    "monday": false,
                    "tuesday": false,
                    "wednesday": false,
                    "thursday": false,
                    "friday": false,
                    "saturday": false,
                    "sunday": false,
                    "all": false
                }];
                $scope.terminal = [];

                $scope.checkAllCycle = function(index){
                    if($scope.week[index].all){
                        $scope.week[index].monday=true;
                        $scope.week[index].tuesday=true;
                        $scope.week[index].wednesday=true;
                        $scope.week[index].thursday=true;
                        $scope.week[index].friday=true;
                        $scope.week[index].saturday=true;
                        $scope.week[index].sunday=true;
                    }else{
                        $scope.week[index].monday=false;
                        $scope.week[index].tuesday=false;
                        $scope.week[index].wednesday=false;
                        $scope.week[index].thursday=false;
                        $scope.week[index].friday=false;
                        $scope.week[index].saturday=false;
                        $scope.week[index].sunday=false;
                    }
                };

                $scope.deptType = [
                    {'key': '请选择', 'deviceId': 0},
                    {'key': '运营部', 'deviceId': 1},
                    {'key': '市场部', 'deviceId': 2},
                    {'key': '商品部', 'deviceId': 3},
                    {'key': '用户体验部', 'deviceId': 4},
                    {'key': '财务部', 'deviceId': 5},
                    {'key': '技术部', 'deviceId': 6},
                    {'key': '产品部', 'deviceId': 7},
                    {'key': '大客户部', 'deviceId': 8},
                    {'key': '新媒体营销部', 'deviceId': 9}
                ];
                $scope.terminalType = [
                    {'key': '全部', 'deviceId': ''},
                    {'key': 'APP', 'deviceId': '1'},
                    {'key': 'H5', 'deviceId': '2'},
                    {'key': 'PC', 'deviceId': '3'}
                ];

                $.when(commonPaytypeService.sendRequest()).done(function(result) {
                    _.each(result.value, function(item, index, list) {
                        if(item.code=='ONLINE_PAY')
                            $scope.paymeth = item.payChannelList;
                    });
                    $scope.$apply();
                })
                .then(function() {
                    if($scope.id > 0){
                        $.when(promotionActivityGetService.sendRequest({"id":$scope.id}))
                            .done(function(result) {
                                $scope.params = result;
                                $scope.params.cartPackage = JSON.parse(result.cartPackage);

                                _.each($scope.params.cartPackage, function(item, index, list) {
                                    weekType(item.cycle, index);
                                })
                                terminalType(result.terminal);

                                $scope.$apply();
                            })
                            .fail(function() {
                            })
                    }
                })
                .fail(function(msg) {
                    alert(msg);
                })

                function weekType(val, index) {
                    if(val.indexOf("1")>=0)
                        $scope.week[index].monday=true;
                    if(val.indexOf("2")>=0)
                        $scope.week[index].tuesday=true;
                    if(val.indexOf("3")>=0)
                        $scope.week[index].wednesday=true;
                    if(val.indexOf("4")>=0)
                        $scope.week[index].thursday=true;
                    if(val.indexOf("5")>=0)
                        $scope.week[index].friday=true;
                    if(val.indexOf("6")>=0)
                        $scope.week[index].saturday=true;
                    if(val.indexOf("0")>=0)
                        $scope.week[index].sunday=true;
                }

                function terminalType(val) {
                    $scope.terminal.wap = false;
                    $scope.terminal.web = false;
                    $scope.terminal.app = false;
                    if(val == 1){
                        $scope.terminal.web = true;
                    }else if(val == 2){
                        $scope.terminal.wap = true;
                    }else if(val == 3){
                        $scope.terminal.web = true;
                        $scope.terminal.wap = true;
                    }else if(val == 4){
                        $scope.terminal.app = true;
                    }else if(val == 5){
                        $scope.terminal.web = true;
                        $scope.terminal.app = true;
                    }else if(val == 6){
                        $scope.terminal.wap = true;
                        $scope.terminal.app = true;
                    }else if(val == 7) {
                        $scope.terminal.web = true;
                        $scope.terminal.wap = true;
                        $scope.terminal.app = true;
                    }
                }

                $scope.params ={
                    "id": null,
                    "productFrom": "",
                    "title": "",
                    "type":4,
                    "departmentId": 0,
                    "demandMan": "",
                    "description": "",
                    "startTime": moment().format("x"),
                    "endTime": moment().add(7, 'days').format("x"),
                    "count": 0,
                    "isPublic": '',
                    "perLimit":0,
                    "pcUrl": "",
                    "mobileUrl": "",
                    "remarks": "",
                    "oaNumber": "",
                    "cartPackage": []
                };

                $scope.params.cartPackage=[{
                    "cycle": "",
                    "channelNo": "",
                    "type": "REDUCE",
                    "limit": 0,
                    "preferential": 0,
                    "daylimit": 0,
                    "dayuserlimit": 0
                }];


                $scope.createActivity = {
                    "save": function() {
                        if (!validService.valid($scope.attrForm)) {
                            return;
                        }
                        if(!this.validSave()){
                            alert("缺少必填项");
                            return;
                        }
                        if($scope.params.count == null || $scope.params.count === ""||$scope.params.count<=0){
                            alert("请输入投放总次数！");
                            return false;
                        }
                        if($scope.params.perLimit == null || $scope.params.perLimit === ""||$scope.params.perLimit<=0){
                            alert("请输入每会员享受次数！");
                            return false;
                        }
                        if($scope.params.startTime > $scope.params.endTime){
                            alert("活动开始时间不能大于结束时间");
                            return false;
                        }
                        for(var index=0;index<$scope.params.cartPackage.length;index++) {
                            var item=$scope.params.cartPackage[index];
                            item.cycle = "";
                            if($scope.week[index].sunday){
                                item.cycle += "0,";
                            }
                            if($scope.week[index].monday){
                                item.cycle += "1,";
                            }
                            if($scope.week[index].tuesday){
                                item.cycle += "2,";
                            }
                            if($scope.week[index].wednesday){
                                item.cycle += "3,";
                            }
                            if($scope.week[index].thursday){
                                item.cycle += "4,";
                            }
                            if($scope.week[index].friday){
                                item.cycle += "5,";
                            }
                            if($scope.week[index].saturday){
                                item.cycle += "6,";
                            }
                            if(item.cycle==""){
                                alert("请勾选触发周期！");
                                return false;
                            }
                            if(item.limit== null || item.limit === ""||item.limit<=0){
                                alert("请输入规则满减值！");
                                return false;
                            }
                            if(item.preferential== null || item.preferential === ""||item.preferential<=0){
                                alert("请输入规则满减值！");
                                return false;
                            }
                            if(item.daylimit== null || item.daylimit === ""||item.daylimit<=0){
                                alert("请输入单日限制次数！");
                                return false;
                            }
                            if(item.dayuserlimit== null || item.dayuserlimit === ""||item.dayuserlimit<=0){
                                alert("请输入每用户日限制次数！");
                                return false;
                            }

                            item.cycle=item.cycle.substring(0,item.cycle.lastIndexOf(","));
                        }

                        $scope.params.terminal = 0;
                        if($scope.terminal.web){
                            $scope.params.terminal += 1;
                        }
                        if($scope.terminal.wap){
                            $scope.params.terminal += 2;
                        }
                        if($scope.terminal.app){
                            $scope.params.terminal += 4;
                        }
                        if($scope.params.terminal == 0){
                            alert("请选择应用终端！")
                            return false;
                        }
                        debugger;
                        this.addPage();
                    },
                    validSave: function(){
                        if($scope.params.title == null || $scope.params.title == ""){
                            return false;
                        }
                        if($scope.params.departmentId == null || $scope.params.departmentId == ""){
                            return false;
                        }
                        if($scope.params.demandMan == null || $scope.params.demandMan == ""){
                            return false;
                        }
                        if($scope.params.oaNumber == null || $scope.params.oaNumber == ""){
                            return false;
                        }
                        if($scope.params.startTime == null || $scope.params.startTime === ""){
                            return false;
                        }
                        if($scope.params.endTime == null || $scope.params.endTime === ""){
                            return false;
                        }
                        if($scope.params.cartPackage == null || $scope.params.cartPackage == ""){
                            return false;
                        }
                        return true;
                    },
                    addPage: function() {
                        $.when(promotionActivitySaveService.sendRequest({"json": angular.toJson($scope.params)})).done(function(result) {
                            if(result.success) {
                                if ($scope.id > 0) {
                                    $location.path('promotionActivityBank/list');
                                } else {
                                    $location.path('promotionActivityBank/list');
                                }
                            }else{
                                alert(result.message);
                            }
                            $scope.$apply();
                        })
                            .fail(function() {
                            })
                    }
                }
                //发布优惠
                $scope.publishPromotion = {
                    "modal": $("#publishModal"),
                    "open": function () {
                        this.modal.modal({});
                    },
                    "publish": function(id) {
                        this.modal.modal('hide');
                        $.when(promotionActivityPublishService.sendRequest({"id":id})).done(function(result) {
                            alert(result.value);
                            $location.path('promotionActivityBank/list');
                            $scope.$apply();
                        })
                        .fail(function() {
                            alert("发布失败");
                        })
                    }
                }

                //作废优惠
                $scope.cancelPromotion = {
                    "modal": $("#cancelModal"),
                    "open": function () {
                        this.modal.modal({});
                    },
                    "cancel": function(id) {
                        this.modal.modal('hide');
                        $.when(promotionActivityCancelService.sendRequest({"id":id})).done(function(result) {
                            alert(result.value);
                            $location.path('promotionActivityBank/list');
                            $scope.$apply();
                        })
                        .fail(function() {
                            alert("作废优惠失败");
                        })
                    }
                }
            }
        ]);

    });

