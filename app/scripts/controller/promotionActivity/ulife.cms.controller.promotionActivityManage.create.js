/**
 * Created by Ulife on 2016/1/15.
 */

define([
        'ulife.cms.module.myApp',
        'ulife.framework.services',
        'ulife.cms.business.config',
        'ulife.cms.menu.config',
        'ulife.api.cms.page.getList',
        'ulife.api.promotion.activityGroup.getlist',
        'ulife.api.promotion.activity.save',
        'ulife.api.promotion.activity.get',

        'ulife.cms.directive.datetimepicker',
        'ulife.cms.directive.dateformat',
        "ulife.cms.service.valid",
        "ulife.cms.service.authority"

    ],
    function(app, services, BizConfig, MenuConfig, getPageList,promotionActivityGroupGetlist,activitySave,activityGet) {

        getPageList.injectTo(app);
        promotionActivityGroupGetlist.injectTo(app);
        activitySave.injectTo(app);
        activityGet.injectTo(app);

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

        app.controller('PromotionActivityManageCreateCtrl', ['$scope', '$location', '$route','$filter',
            'cmsPageGetListService',
            'promotionActivityGroupGetlistService',
            'promotionActivitySaveService',
            'promotionActivityGetService',
            'validService',
            'authorityService',

            function($scope, $location, $route,$filter, promotionActivityGroupGetlistService,cmsPageGetListService,promotionActivitySaveService,promotionActivityGetService,validService) {

                $scope.menuConfig = MenuConfig.menu;


                $scope.renderObj = {};
                $scope.promoact = {};
                $scope.promoact.rules = [];
                $scope.promoact.ulimit = [{}];
                $scope.promoact.itemId = '';
                $scope.promoact.description = '';

                $scope.promoact.groupId='';
                $scope.promoact.type='';
                $scope.promoact.productFrom = '';
                $scope.promoact.demandMan = '';
                $scope.promoact.startTime = [];
                $scope.promoact.endTime = [];
                $scope.promoact.pcUrl = '';
                $scope.promoact.mobileUrl = '';
                $scope.promoact.remarks = '';

                /*$scope.promoact.status = -2;*/


                $scope.isSpecial = false;

                $scope.prodType = '';
                $scope.termType = '';
                $scope.promoact.departmentId = 0;
                $scope.ruleType = '';
                $scope.pfpr = [];
                $scope.pfrr = [];

                var activityId = $route.current.params.activityId;

                if(activityId > 0){
                    $.when(promotionActivityGetService.sendRequest({"id":activityId}))
                        .done(function(result) {
                            $scope.params = result;
                            $scope.promoact = result;
                            terminalType(result.terminal);
                            $scope.editPage(2);
                            $scope.$apply();
                        })
                        .then(function(result) {
                            $scope.promoact.type = result.promoRule.type;

                            switch (result.promoRule.type) {
                             case 'REDUCE' :
                                 $scope.fullReduceRule =JSON.parse(result.promoRule.rule);
                             break;
                             case 'GIVE' :
                                 $scope.limitnum = JSON.parse(result.promoRule.rule)[0].limit;
                                 $scope.fullGiveRule =JSON.parse(result.promoRule.rule);
                             break;
                             case 'PIECEREDUCE' :
                                 $scope.pfrr.itemId = result.itemId;
                                 /*alert(result.itemId);*/
                                 $scope.productFullReduceRule =JSON.parse(result.promoRule.rule);
                             break;
                             case 'PIECEGIVE' :
                                 $scope.pfpr.itemId = result.itemId;
                                 $scope.pfpr.limit = JSON.parse(result.promoRule.rule)[0].limit;
                                 $scope.productFullPresentRule =JSON.parse(result.promoRule.rule);
                             break;
                             case 'OPTIONALLY' :
                                 $scope.fullChooseRule =JSON.parse(result.promoRule.rule);
                             break;
                             case 'FIRSTREDUCE' :
                                 $scope.fullReduceRule =JSON.parse(result.promoRule.rule);
                             break;
                             case 'FIRSTGIVE' :
                                 $scope.limitnum = JSON.parse(result.promoRule.rule)[0].limit;
                                 $scope.fullGiveRule =JSON.parse(result.promoRule.rule);
                             break;
                             case 'SPECIAL' :
                                 $scope.specialRule[0].type = JSON.parse(result.promoRule.ulimit)[0].type;
                                 $scope.specialRule =JSON.parse(result.promoRule.ulimit);
                             break;
                             case 'PANICBUY':
                                 $scope.panicbuyRule[0].type = JSON.parse(result.promoRule.ulimit)[0].type;
                                 /*alert($scope.panicbuyRule[0].type)
                                 return false;*/
                                 $scope.panicbuyRule =JSON.parse(result.promoRule.ulimit);
                             break;
                             }
                            $scope.$apply();
                        })
                        .fail(function() {
                        })
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
                $scope.activityType = [
                    {'key': '请选择活动类型', 'deviceId': ''},
                    {'key': '满x元减n元', 'deviceId': 'REDUCE'},
                    {'key': '满x元赠A商品n件', 'deviceId': 'GIVE'},
                    {'key': 'A商品满n件减y元', 'deviceId': 'PIECEREDUCE'},
                    {'key': 'A商品满n件赠B商品m件', 'deviceId': 'PIECEGIVE'},
                    {'key': 'x元选m件', 'deviceId': 'OPTIONALLY'},
//                    {'key': '首单满x元减n元', 'deviceId': 'FIRSTREDUCE'},
                    {'key': '首单满x元赠A商品n件', 'deviceId': 'FIRSTGIVE'},
                    {'key': '限时特价', 'deviceId': 'SPECIAL'},
                    {'key': '限时抢购', 'deviceId': 'PANICBUY'}
                ];
                $scope.productType = [
                    {'key': '请选择活动商品类型', 'deviceId': ''},
                    {'key': '菜园自营', 'deviceId': 'SELF'},
                    {'key': '产地直采', 'deviceId': 'consignation'}
                ];
                $scope.activityTypeChanged=function() {
                    $scope.promoact.productFrom='';
                    if($scope.promoact.type=='FIRSTGIVE'){
                        $scope.promoact.productFrom='SELF';
                    }
                }

                $scope.activityGroupType = [
                    {'key': '请选择类型', 'deviceId': ''}
                ];
                $scope.deptType = [
                    {'key': '请选择', 'deviceId': 0},
                    {'key': '运营部', 'deviceId':1},
                    {'key': '市场部', 'deviceId': 2},
                    {'key': '商品部', 'deviceId': 3},
                    {'key': '用户体验部', 'deviceId': 4},
                    {'key': '财务部', 'deviceId': 5},
                    {'key': '技术部', 'deviceId': 6},
                    {'key': '产品部', 'deviceId':7},
                    {'key': '大客户部', 'deviceId':8},
                    {'key': '新媒体营销部', 'deviceId':9}
                ];
                $scope.terminalType = [
                    {'key': '全部', 'deviceId': ''},
                    {'key': 'APP', 'deviceId': '1'},
                    {'key': 'H5', 'deviceId': '2'},
                    {'key': 'PC', 'deviceId': '3'}
                ];

                $scope.rules = [
                    {'key': '全部', 'deviceId': ''},
                    {'key': '满199减100', 'deviceId': '1'},
                    {'key': '满99减50', 'deviceId': '2'}
                ];

                $scope.ruleData = [
                ];

                $scope.fullReduceRule = [//金额满减
                    {
                        "limit": "",
                        "preferential": ""
                    }
                ]

                $scope.limitnum = [];

                $scope.fullGiveRule = [//金额满赠
                    {
                        "limit": "",
                        "preferential": ""
                    }
                ]

                $scope.pfrr.itemId = '';

                $scope.productFullReduceRule = [//商品满减
                    {
                        "limit": "",
                        "preferential": ""
                    }
                ]

                $scope.pfpr.itemId = '';
                $scope.pfpr.limit = '';
                $scope.productFullPresentRule = [//商品满赠
                    {
                        "limit": "",
                        "preferential": ""
                    }
                ]
                $scope.fullChooseRule = [//金额满选
                    {
                        "limit": "",
                        "preferential": ""
                    }
                ]

                $scope.specialRule = [//特价
                    {
                        "type": "ORDER_ITEM"
                    }
                ]

                $scope.panicbuyRule = [//限时抢
                    {
                        "type": "ORDER_ITEM"
                    }
                ]

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

                $scope.addFullReduceRule = function () {
                    $scope.fullReduceRule.push({
                        "limit":"",
                        "preferential":""
                    });
                };

                $scope.removeRule = function (index, id) {
                    $scope.ruleData.splice(index, 1);
                };

                $scope.removeFullReduceRule = function (index, id) {
                    $scope.fullReduceRule.splice(index, 1);
                };

                $scope.addFirstFullReduceRule = function () {
                    $scope.fullGiveRule.push({
                        "limit":$scope.limitnum,
                        "preferential":""
                    });
                };

                $scope.removeFirstFullReduceRule = function (index, id) {
                    $scope.fullGiveRule.splice(index, 1);
                };

                $scope.addProductFullReduceRule = function () {
                    $scope.productFullReduceRule.push({
                        "limit":"",
                        "preferential":""
                    });
                };

                $scope.removeProductFullReduceRule = function (index, id) {
                    $scope.productFullReduceRule.splice(index, 1);
                };

                $scope.addProductFullPresentRule = function () {
                    $scope.productFullPresentRule.push({
                        "limit": "",
                        "preferential": ""
                    });
                };

                $scope.removeProductFullPresentRule = function (index, id) {
                    $scope.productFullPresentRule.splice(index, 1);
                };

                $scope.addFullChooseRule=function(index,id){
                    $scope.fullChooseRule.push({
                        "limit": "",
                        "preferential": ""
                    });
                }

                $scope.removeFullChooseRule=function(index,id){
                    $scope.fullChooseRule.splice(index, 1);
                }

                $scope.itemClass = 1;
                $scope.editPage = function(i){
                    $scope.itemClass=i;
                }


                $scope.limitChange=function(rules){
                    var count=0;
                    angular.forEach(rules, function(rule){
                        count=0;
                        angular.forEach(rules, function(data){
                            if(data.limit==rule.limit||data.preferential==rule.preferential){
                                count+=1;
                            }
                        });
                    });
                    if(count>1){
                        alert("活动规则不同梯度的条件不能相同！");
                        return false;
                    }
                    return true;
                }

                $scope.terminal = [];
                $scope.nextItem ={
                    "nextItem": function(){
                        if($scope.promoact.productFrom == ''){
                            alert("请选择活动商品类型！");
                            return false;
                        }
                        if($scope.promoact.type == ''){
                            alert("请选择活动类型！");
                            return false;
                        }
                        if($scope.promoact.groupId == ''){
                            alert("请选择活动组！");
                            return false;
                        }
                        $scope.itemClass=2;
                    },
                    "confirmRule": function(){
                        if (!validService.valid($scope.activityForm)) {
                            return;
                        }
                        if($scope.promoact.departmentId ==0){
                            alert("请选择部门！");
                            return;
                        }
                        if(activityId>0){
                            $scope.promoact.id = activityId;
                        }
                        $scope.ruleFlag=false;
                        switch ($scope.promoact.type) {
                            case 'REDUCE' :
                                angular.forEach($scope.fullReduceRule, function(data){
                                    if(data.limit==""||data.preferential==""||data.limit==null||data.preferential==null){
                                        $scope.ruleFlag=true;
                                    }
                                });
                                if($scope.ruleFlag){
                                    alert("规则内数据不能为空！");
                                    return false;
                                }
                                $scope.promoact.rules = $scope.fullReduceRule;
                                if(!$scope.limitChange($scope.promoact.rules)){
                                    return false;
                                }
                                break;
                            case 'GIVE' :
//                                angular.forEach($scope.fullGiveRule, function(data){
//                                    data.limit = $scope.limitnum;
//                                });
                                angular.forEach($scope.fullGiveRule, function(data){
                                    if(data.limit==""||data.preferential==""||data.limit==null||data.preferential==null){
                                        $scope.ruleFlag=true;
                                    }
                                });
                                if($scope.ruleFlag){
                                    alert("规则内数据不能为空！");
                                    return false;
                                }
                                $scope.promoact.rules = $scope.fullGiveRule;
                                if(!$scope.limitChange($scope.promoact.rules)){
                                    return false;
                                }
                                break;
                            case 'PIECEREDUCE' :
                                $scope.promoact.itemId = $scope.pfrr.itemId;
                                if($scope.promoact.itemId==null||$scope.promoact.itemId==""){
                                    $scope.ruleFlag=true;
                                }
                                angular.forEach($scope.productFullReduceRule, function(data){
                                    if(data.limit==""||data.preferential==""||data.limit==null||data.preferential==null){
                                        $scope.ruleFlag=true;
                                    }
                                });
                                if($scope.ruleFlag){
                                    alert("规则内数据不能为空！");
                                    return false;
                                }

                                $scope.promoact.rules = $scope.productFullReduceRule;
                                if(!$scope.limitChange($scope.promoact.rules)){
                                    return false;
                                }
                                break;
                            case 'PIECEGIVE' :
                                $scope.promoact.itemId = $scope.pfpr.itemId;
//                                angular.forEach($scope.productFullPresentRule, function(data){
//                                    data.limit = $scope.pfpr.limit;
//                                });

                                if($scope.promoact.itemId==null||$scope.promoact.itemId==""){
                                    $scope.ruleFlag=true;
                                }
                                angular.forEach($scope.productFullPresentRule, function(data){
                                    if(data.limit==""||data.preferential==""||data.limit==null||data.preferential==null){
                                        $scope.ruleFlag=true;
                                    }
                                });
                                if($scope.ruleFlag){
                                    alert("规则内数据不能为空！");
                                    return false;
                                }

                                $scope.promoact.rules = $scope.productFullPresentRule;
                                if(!$scope.limitChange($scope.promoact.rules)){
                                    return false;
                                }
                                break;
                            case 'OPTIONALLY' :
                                angular.forEach($scope.fullChooseRule, function(data){
                                    if(data.limit==""||data.preferential==""||data.limit==null||data.preferential==null){
                                        $scope.ruleFlag=true;
                                    }
                                });
                                if($scope.ruleFlag){
                                    alert("规则内数据不能为空！");
                                    return false;
                                }

                                $scope.promoact.rules = $scope.fullChooseRule;
                                /*alert(JSON.stringify($scope.promoact.rules));
                                return false;*/
                                break;
                            case 'FIRSTREDUCE' :
                                angular.forEach($scope.fullReduceRule, function(data){
                                    if(data.limit==""||data.preferential==""||data.limit==null||data.preferential==null){
                                        $scope.ruleFlag=true;
                                    }
                                });
                                if($scope.ruleFlag){
                                    alert("规则内数据不能为空！");
                                    return false;
                                }
                                $scope.promoact.rules= $scope.fullReduceRule;
                                if(!$scope.limitChange($scope.promoact.rules)){
                                    return false;
                                }
                                break;
                            case 'FIRSTGIVE' :
                                angular.forEach($scope.fullGiveRule, function(data){
                                    data.limit = $scope.limitnum;
                                });
                                angular.forEach($scope.fullGiveRule, function(data){
                                    if(data.limit==""||data.preferential==""||data.limit==null||data.preferential==null){
                                        $scope.ruleFlag=true;
                                    }
                                });
                                if($scope.ruleFlag){
                                    alert("规则内数据不能为空！");
                                    return false;
                                }
                                $scope.promoact.rules = $scope.fullGiveRule;
                                if(!$scope.limitChange($scope.promoact.rules)){
                                    return false;
                                }
                                break;
                            case 'SPECIAL' :
                                $scope.specialRule[0].type = $scope.specialRule[0].type;
                                $scope.promoact.rules = $scope.specialRule;
                                break;
                            case 'PANICBUY':

                                $scope.panicbuyRule[0].type = $scope.panicbuyRule[0].type;
                                $scope.promoact.rules = $scope.panicbuyRule;
                                /*alert(JSON.stringify($scope.promoact.rules));
                                return false;*/
                                break;
                        }

                        $scope.promoact.rulesType = $scope.promoact.type;
                        $scope.promoact.type = 2;
                        $scope.promoact.terminal = 0;
                        if($scope.terminal.web){
                            $scope.promoact.terminal += 1;
                        }
                        if($scope.terminal.wap){
                            $scope.promoact.terminal += 2;
                        }
                        if($scope.terminal.app){
                            $scope.promoact.terminal += 4;
                        }
                        if($scope.promoact.terminal == 0){
                            alert("请选择应用终端！")
                            $scope.promoact.type = $scope.promoact.rulesType;
                            return false;
                        }
                        if($scope.promoact.rules.length<=0){
                            alert("规则内数据不能为空！")
                            return false;
                        }
                        $.when(promotionActivitySaveService.sendRequest({"json":angular.toJson($scope.promoact)})).done(function(result) {
                            $scope.promoact.type=$scope.promoact.rulesType;
                            if(result.success) {
                                if ($scope.promoact.rulesType == "PIECEGIVE" || $scope.promoact.rulesType == "PIECEREDUCE") {
                                    $location.path('promotionActivityManage/createSuccess/' + result.message);
                                } else {
                                    $location.path('promotionActivityManage/createSubmit/' + result.message);
                                }
                                $scope.$apply();
                            }else{
                                $scope.$apply();
                                alert(result.message);
                            }
                            })
                            .fail(function(r,e) {
                                $scope.promoact.type=$scope.promoact.rulesType;
                                $scope.$apply();
                                alert(e);
                            })
                    }
                }

                $scope.preItem ={
                    "createIndex": function(){
                        $scope.itemClass=1;
                    }
                }

                $scope.searchPage = {
                    "pageSize": 20,  //页大小
                    "pageNum": 1,   //当前页码
                    "pageTotal": 1,  //页面数量
                    "pageCount": 1, //数据个数
                    "pageShow": [],
                    "params": {
                        "categoryId": 2,
                        "pageId": null,
                        "title": "",
                        "from": 0
                    },
                    "search": function() {
                        this.params.size = this.pageSize;
                        this.params.from = 0;
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

                        $.when(cmsPageGetListService.sendRequest(tmpParams))
                            .done(function(result) {
                                $scope.renderObj = result;
                                $scope.previewLinks = BizConfig.setting['preview_links'];

                                //处理分页信息
                                that.pageCount = result.count;
                                that.pageTotal = Math.ceil(result.count / that.pageSize);

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
                        if (this.pageNum == 1) {
                            return;
                        }
                        this.params.from -= this.pageSize;
                        this.pageNum--;
                        this.getData();
                    },
                    "next": function() {
                        if (this.pageNum == this.pageTotal) {
                            return;
                        }
                        this.params.from += this.pageSize;
                        this.pageNum++;
                        this.getData();
                    }
                }
                $scope.initGroup = function () {
                    var tmpParams = {};
                    $.when(cmsPageGetListService.sendRequest(tmpParams))
                        .done(function(result) {
                            angular.forEach(result.promoActivityGroup, function(data){
                                $scope.activityGroupType.push({'key':data.name, 'deviceId': data.id});
                                /*$scope.$apply();*/
                            });
                        })
                        .fail(function() {
                        })
                }
                $scope.initGroup();

            }
        ]);

    });

