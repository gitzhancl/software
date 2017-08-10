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

        'ulife.api.promotion.activity.get',
        'ulife.api.promotion.activity.save',
        'ulife.api.promotion.card.getlist',

        'ulife.cms.directive.datetimepicker',
        'ulife.cms.directive.dateformat',
        'ulife.cms.directive.tooltip',
        "ulife.cms.service.valid",
        "ulife.cms.service.authority"
    ],
    function(moment, app, services, BizConfig, MenuConfig, activityGet, activitySave, cardList) {

        activityGet.injectTo(app);
        activitySave.injectTo(app);
        cardList.injectTo(app);

        app.controller('PromotionActivityCreateCtrl', ['$scope', '$location', '$route','$filter',
            'promotionActivityGetService',
            'promotionActivitySaveService',
            'promotionCardGetlistService',
            'validService',
            'authorityService',


            function($scope, $location, $route,$filter,
                     promotionActivityGetService,
                     promotionActivitySaveService,
                     promotionCardGetlistService,
                     validService) {

                $scope.id = $route.current.params.id;
                $scope.menuConfig = MenuConfig.menu;

                $scope.renderObj = {};

                $scope.today = new Date();


                $scope.rules = [];
                $scope.rulesRoot = {"ALL":[],"REDUCE":[],"POSTAGEREDUCE":[],"GROUPREDUCE":[]};
                $scope.terminals = [];

                $scope.ruleList = function(type, index){
                    $.when(promotionCardGetlistService.sendRequest({"type":type})).done(function(result) {
                            $scope.rules[index] = result.value;
                            $scope.$apply();
                        })
                        .fail(function() {
                        })
                };

                $.when(promotionCardGetlistService.sendRequest({"type":""}))
                    .done(function(REDUCE) {
                        $scope.rulesRoot["ALL"] = REDUCE.value;
                        _.each(REDUCE.value, function(item, index, list){
                            if(item.type == "REDUCE"){
                                $scope.rulesRoot["REDUCE"].push(item);
                            }else if(item.type == "POSTAGEREDUCE"){
                                $scope.rulesRoot["POSTAGEREDUCE"].push(item);
                            }else if(item.type == "GROUPREDUCE"){
                                $scope.rulesRoot["GROUPREDUCE"].push(item);
                            }
                        });
                    })
                    .then(function() {
                        if($scope.id > 0){
                            $.when(promotionActivityGetService.sendRequest({"id":$scope.id}))
                                .done(function(result) {
                                    $scope.params = result;
                                    terminalType(result.terminal);
                                    $scope.params.cartPackage = JSON.parse(result.cartPackage);

                                    _.each($scope.params.cartPackage, function(item, index, list) {
                                        $scope.rules.push($scope.rulesRoot[item.type]);
                                        $scope.terminals.push({
                                            "pc": false,
                                            "h5": false,
                                            "app": false
                                        });
                                        terminalType(item.terminal, index);
                                    })

                                    $scope.nextItem(2);
                                    $scope.$apply();
                                })
                                .fail(function() {
                                })
                        }
                    })
                    .fail(function() {
                    })

                function terminalType(val, index) {
                    if(val == 1){
                        $scope.terminals[index].pc = true;
                    }else if(val == 2){
                        $scope.terminals[index].h5 = true;
                    }else if(val == 3){
                        $scope.terminals[index].pc = true;
                        $scope.terminals[index].h5 = true;
                    }else if(val == 4){
                        $scope.terminals[index].app = true;
                    }else if(val == 5){
                        $scope.terminals[index].pc = true;
                        $scope.terminals[index].app = true;
                    }else if(val == 6){
                        $scope.terminals[index].h5 = true;
                        $scope.terminals[index].app = true;
                    }else if(val == 7) {
                        $scope.terminals[index].pc = true;
                        $scope.terminals[index].h5 = true;
                        $scope.terminals[index].app = true;
                    }
                }

                $scope.productType = [
                    {'key': '请选择活动商品类型', 'deviceId': ''},
                    {'key': '菜园自营', 'deviceId': 'SELF'},
                    {'key': '产地直采', 'deviceId': 'consignation'}
                ];

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

                $scope.promotionType = [
                    {'key': '请选择', 'deviceId': ''},
                    {'key': '满减券', 'deviceId': 'REDUCE'},
                    {'key': '免邮券', 'deviceId': 'POSTAGEREDUCE'},
                    {'key': '团购满减券', 'deviceId': 'GROUPREDUCE'}
                ];

                $scope.useDate = [
                    {'key': '请选择', 'deviceId': ''},
                    {'key': '固定日期区间', 'deviceId': 'date'},
                    {'key': '固定有效时长', 'deviceId': 'days'}
                ];
                $scope.publicProm = [
                    {'key': '请选择', 'deviceId': ''},
                    {'key': '公券', 'deviceId': 1},
                    {'key': '私券', 'deviceId': 0}
                ];


                $scope.addRule = function () {
                    $scope.params.cartPackage.push({
                        "cardId": "",
                        "type": "",
                        "cycleType": "date",
                        "start": moment().format("x"),
                        "end": moment().add(14, 'days').format("x"),
                        "quantity": 1,
                        "display": "",
                        "whitelistId": null,
                        "is_blacklist": 0,
                        "terminal": 0
                    });

                    $scope.terminals.push({
                        "pc": false,
                        "h5": false,
                        "app": false
                    });
                };

                $scope.removeRule = function (index, length) {
                    $scope.params.cartPackage.splice(index, length);
                };

                $scope.itemClass = 1;

                $scope.nextItem = function(i){
                    if($scope.params.productFrom == null || $scope.params.productFrom == ""){
                        alert("缺少必填项");
                        return;
                    }
                    if($scope.id > 0 && i ==1){
                        return;
                    }
                    $scope.itemClass=i;
                }

                $scope.params ={
                    "id": null,
                    "productFrom": "",
                    "title": "",
                    "type":1,
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
                    "cartPackage": []
                };

                $scope.createActivity = {
                    "save": function() {
                        
                        if (!validService.valid($scope.attrForm)) {
                            return;
                        }
                        if(!this.validSave()){
                            alert("缺少必填项");
                            return;
                        }
                        var flag = true;
                        _.each($scope.params.cartPackage, function(item, index, list){
                            if(item.start >= item.end){
                                flag = false;
                                alert("第"+(index+1)+"条规则活动开始时间不能大于结束时间");
                            }
                        });
                        if(!flag) return false;
                        if($scope.params.startTime > $scope.params.endTime){
                            alert("活动开始时间不能大于结束时间");
                            return false;
                        }
                        this.addPage();
                    },
                    validSave: function(){
                        if($scope.params.productFrom == null || $scope.params.productFrom == ""){
                            return false;
                        }
                        if($scope.params.title == null || $scope.params.title == ""){
                            return false;
                        }
                        if($scope.params.departmentId == null || $scope.params.departmentId == ""){
                            return false;
                        }
                        if($scope.params.demandMan == null || $scope.params.demandMan == ""){
                            return false;
                        }
                        if($scope.params.startTime == null || $scope.params.startTime === ""){
                            return false;
                        }
                        if($scope.params.endTime == null || $scope.params.endTime === ""){
                            return false;
                        }
                        if($scope.params.count == null || $scope.params.count === ""){
                            return false;
                        }
                        if($scope.params.perLimit == null || $scope.params.perLimit === ""){
                            return false;
                        }
                        if($scope.params.isPublic == null || $scope.params.isPublic === ""){
                            return false;
                        }
                        if($scope.params.cartPackage == null || $scope.params.cartPackage == ""){
                            return false;
                        }
                        return true;

                    },
                    addPage: function() {
                        _.each($scope.params.cartPackage, function(item, index, list) {
                            item.terminal = 0;
                            if($scope.terminals[index].pc){
                                item.terminal += 1;
                            }
                            if($scope.terminals[index].h5){
                                item.terminal += 2;
                            }
                            if($scope.terminals[index].app){
                                item.terminal += 4;
                            }
                        })

                        $.when(promotionActivitySaveService.sendRequest({"json": angular.toJson($scope.params)})).done(function(result) {
                                if(result.success) {
                                    if ($scope.id > 0) {
                                        $location.path('promotionActivity/createSuccess/' + result.message);
                                    } else {
                                        $location.path('promotionActivity/createSubmit/' + result.message);
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

            }
        ]);

    });

