/**
 * Created by Ulife on 2016/1/15.
 */
/**
 * Created by Zhangke on 2015/12/15.
 */

define([
        'ulife.cms.module.myApp',
        'ulife.framework.services',
        'ulife.cms.business.config',
        'ulife.cms.menu.config',

        'ulife.api.promotion.source.getlist',
        'ulife.api.promotion.trigger.getlist',
        'ulife.api.promotion.trigger.save',

        'ulife.cms.directive.datetimepicker',
        'ulife.cms.directive.datepicker',
        'ulife.cms.directive.dateformat',
        'ulife.cms.directive.tooltip',
        "ulife.cms.service.valid",
        "ulife.cms.service.authority"
    ],
    function(app, services, BizConfig, MenuConfig, getTriggerList,promotionSourceGetlist, addPage) {

        getTriggerList.injectTo(app);
        addPage.injectTo(app);
        promotionSourceGetlist.injectTo(app);

        app.filter('triggerType', function () {
            return function (val) {
                switch (val) {
                    case 'REGISTERED' :
                        return '注册成功';
                    case 'ORDERED' :
                        return '订单支付成功';
                    case 'DELIVERIED' :
                        return '订单配送完成';
                }
            }
        });

        app.filter('terminalType', function () {
            return function (val) {
                switch (val) {
                    case 1 :
                        return 'PC';
                    case 2 :
                        return 'H5';
                    case 3 :
                        return 'PC、H5';
                    case 4 :
                        return 'App';
                    case 5 :
                        return 'PC、APP';
                    case 6 :
                        return 'H5、APP';
                    case 7 :
                        return 'PC、H5、APP';
                }
            }
        });

        app.controller('PromotionAutoSendListCtrl', ['$scope', '$location', '$route',
            'promotionTriggerGetlistService',
            'promotionTriggerSaveService',
            'promotionSourceGetlistService',
            'validService',
            'authorityService',

            function($scope, $location, $route, promotionTriggerGetlistService, promotionTriggerSaveService,promotionSourceGetlistService,validService) {

                $scope.menuConfig = MenuConfig.menu;

                $scope.gotoPageEdit = function(index) {
                    $location.path('page/edit/' + index);
                }
                $scope.renderObj = {};

                $scope.execConditin = [
                    {'key': '请选择', 'deviceId': ''},
                    {'key': '注册成功', 'deviceId': 'REGISTERED'},
                    {'key': '订单支付成功', 'deviceId': 'ORDERED'},
                    {'key': '订单配送成功', 'deviceId': 'DELIVERIED'}
                ];

                $scope.orderType = [
                    {'key': '请选择', 'deviceId': ''},
                    {'key': '普通订单', 'deviceId': '普通订单'},
                    {'key': '团购订单', 'deviceId': '团购订单'},
                    {'key': '虚拟商品订单', 'deviceId': '虚拟商品订单'}
                ];

                $scope.activitySource = [
                    {'key': '所有渠道', 'deviceId': ""}
                ];

                $scope.params ={
                    id : "",
                    activityId : "",
                    type : "",
                    startTime : "",
                    endTime : "",
                    terminal : "",
                    id : "",
                    "rule":{
                        "limit":"",
                        "desc":""
                    },
                    sourceCode:""
                };
                $scope.app = false;
                $scope.pc = false;
                $scope.h5 = false;


                $scope.addAutoSendModal = {
                    "modal": $("#autoSendModal"),
                    "app":false,
                    "pc":false,
                    "h5":false,
                    fastOrder:false,
                    "open": function (id) {
                        this.modal.modal({});
                        if(id){
                            $.when(promotionTriggerGetlistService.sendRequest({"page":1,"rows":1,"id":id}))
                                .done(function(result) {
                                    var rendObj = result.promoTrigger[0];
                                    var rule = JSON.parse(rendObj.rule);
                                    $scope.params.id = rendObj.id;
                                    $scope.params.activityId = rendObj.activityId;
                                    $scope.params.type = rendObj.triggerType;
                                    $scope.params.startTime = rendObj.startTime;
                                    $scope.params.endTime = rendObj.endTime;
                                    $scope.params.terminal = rendObj.terminal;
                                    $scope.params.rule.limit = rule.limit;
                                    $scope.params.rule.desc = "";
                                    $scope.params.rule.orderType = rule.orderType;
                                    $scope.fastOrder = false;
                                    if(rule.fastOrder==1)
                                        $scope.fastOrder = true;
                                    $scope.sendMsg = false;
                                    if(rule.sendMsg==1) {
                                        $scope.sendMsg = true;
                                        $scope.params.rule.msg = rule.msg;
                                    }

                                    $scope.params.sourceCode = rendObj.sourceCode;
                                    $scope.params.mobileUrl = rendObj.mobileUrl;
                                    $scope.params.pcUrl = rendObj.pcUrl;
                                    terminalType(rendObj.terminal);
                                    $scope.$apply();
                                })
                                .fail(function(msg,date) {
                                    alert(msg+date);
                                })
                        }else{
                            $scope.params.id = "";
                            $scope.params.activityId = "";
                            $scope.params.type = "";
                            $scope.params.startTime = "";
                            $scope.params.endTime = "";
                            $scope.params.terminal = "";
                            $scope.params.rule.limit = "";
                            $scope.params.rule.desc = "";
                            $scope.params.rule.orderType = "";
                            $scope.params.rule.fastOrder = "0";

                            $scope.params.sourceCode = "";
                            $scope.params.mobileUrl = "";
                            $scope.params.pcUrl = "";
                            $scope.app = false;
                            $scope.pc = false;
                            $scope.h5 = false;
                            $scope.fastOrder = false;
                            $scope.sendMsg = false;
                        }
                    },
                    "save": function() {
                        if (!validService.valid($scope.attrForm)) {
                            return;
                        }
                        if($scope.params.type != "REGISTERED" && ($scope.params.rule.limit == null || $scope.params.rule.limit == "")
                            && ($scope.params.rule.orderType == null || $scope.params.rule.orderType == "")){
                            alert("缺少必填项！");
                            return;
                        }
                        if(!$scope.pc && !$scope.h5 && !$scope.app ){
                            alert("缺少必填项！");
                            return;
                        }
                        if($scope.sendMsg&&!$scope.params.rule.msg){
                            alert("请填写短信内容！");
                            return;
                        }
                        if(!!$scope.params.rule.msg &&$scope.params.rule.msg.trim().length>50){
                            alert("短信内容不能超过50个字！");
                            return;
                        }
                        this.addPage();
                    },
                    addPage: function() {
                        $scope.params.terminal = 0;
                        $scope.params.rule.fastOrder=0;
                        if($scope.pc){
                            $scope.params.terminal += 1;
                        }
                        if($scope.h5){
                            $scope.params.terminal += 2;
                        }
                        if($scope.app){
                            $scope.params.terminal += 4;
                        }
                        if($scope.params.type == 'REGISTERED'){
                            $scope.params.rule.limit = 0;
                        }
                        if($scope.fastOrder){
                            $scope.params.rule.fastOrder=1;
                        }
                        if($scope.sendMsg){
                            $scope.params.rule.sendMsg=1;
                        }

                        $scope.params.id = parseInt($scope.params.id);
                        $scope.params.startTime = parseInt($scope.params.startTime);
                        $scope.params.endTime = parseInt($scope.params.endTime);
                        if($scope.params.startTime >= $scope.params.endTime){
                            alert("执行开始日期不能大于结束日期");
                            return;
                        }
                        this.modal.modal('hide');
                        $.when(promotionTriggerSaveService.sendRequest({
                            "json":JSON.stringify($scope.params)
                        })).done(function(result) {
                                $scope.searchPage.search();
                                $scope.$apply();
                            })
                            .fail(function(msg,date) {
                                alert(msg+date);
                            })
                    }
                }

                function terminalType(val) {
                    $scope.app = false;
                    $scope.pc = false;
                    $scope.h5 = false;
                    if(val == 1){
                        $scope.pc = true;
                    }else if(val == 2){
                        $scope.h5 = true;
                    }else if(val == 3){
                        $scope.pc = true;
                        $scope.h5 = true;
                    }else if(val == 4){
                        $scope.app = true;
                    }else if(val == 5){
                        $scope.pc = true;
                        $scope.app = true;
                    }else if(val == 6){
                        $scope.h5 = true;
                        $scope.app = true;
                    }else if(val == 7) {
                        $scope.pc = true;
                        $scope.h5 = true;
                        $scope.app = true;
                    }
                }

                $scope.searchPage = {
                    "pageSize": 20,  //页大小
                    "pageNum": 1,   //当前页码
                    "pageTotal": 1,  //页面数量
                    "pageCount": 1, //数据个数
                    "pageShow": [],
                    "params": {
                        "id":"",
                        "name": "",
                        "start_date": null,
                        "end_date": null,
                        "type": "",
                        "page":"1",
                        "rows":"20"
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
                        var that = this;
                        //获取页面列表
                        //tmpParams.id = "6";
                        $.when(promotionTriggerGetlistService.sendRequest(tmpParams))
                            .done(function(result) {
                                $scope.renderObj = result;
                                $scope.previewLinks = BizConfig.setting['preview_links'];

                                //处理分页信息
                                that.pageCount = result.count;
                                that.pageTotal = Math.ceil(result.count / that.pageSize);

                                $scope.$apply();
                            })
                            .fail(function(msg,date) {
                                alert(msg+date);
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
                $scope.searchPage.search();

                $scope.initactivitySource = function () {
                    var tmpParams = {};
                    $.when(promotionSourceGetlistService.sendRequest(tmpParams))
                        .done(function(result) {
                            angular.forEach(result.promoSource, function(data){
                                $scope.activitySource.push({'key':data.sourceName, 'deviceId': data.sourceCode});
                            });
                            $scope.$apply();
                        })
                        .fail(function(msg,date) {
                            alert(msg+date);
                        })
                }

                $scope.initactivitySource();

            }
        ]);

    });

