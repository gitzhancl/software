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

        'ulife.api.promotion.cms.extcode.singleActivity',
        'ulife.api.promotion.cms.extcode.saveActivity',
        'ulife.api.promotion.cms.extcode.getBrand',
        'ulife.api.promotion.cms.extcode.addBrand',

        'ulife.cms.directive.datetimepicker',
        'ulife.cms.directive.dateformat',
        'ulife.cms.directive.tooltip',
        "ulife.cms.service.valid",
        "ulife.cms.service.authority"
    ],
    function(moment, app, services, BizConfig, MenuConfig, promotionCmsExtcodeSingleActivity, promotionCmsExtcodeSaveActivity, promotionCmsExtcodeGetBrand,promotionCmsExtcodeAddBrand) {

        promotionCmsExtcodeSingleActivity.injectTo(app);
        promotionCmsExtcodeSaveActivity.injectTo(app);
        promotionCmsExtcodeGetBrand.injectTo(app);
        promotionCmsExtcodeAddBrand.injectTo(app);

        app.controller('PromotionActivityCreateCtrl', ['$scope', '$location', '$route','$filter',
            'promotionCmsExtcodeSingleActivityService',
            'promotionCmsExtcodeSaveActivityService',
            'promotionCmsExtcodeGetBrandService',
            'promotionCmsExtcodeAddBrandService',
            'validService',
            'authorityService',


            function($scope, $location, $route,$filter,
                     promotionCmsExtcodeSingleActivityService,
                     promotionCmsExtcodeSaveActivityService,
                     promotionCmsExtcodeGetBrandService,
                     promotionCmsExtcodeAddBrandService,
                     validService) {

                $scope.id = $route.current.params.id;
                $scope.menuConfig = MenuConfig.menu;

                $scope.renderObj = {};

                $scope.today = new Date();


                $scope.rules = [];
                $scope.rulesRoot = {"ALL":[],"REDUCE":[],"POSTAGEREDUCE":[]};
                $scope.terminals = [];



                $.when(promotionCmsExtcodeGetBrandService.sendRequest())
                    .done(function (result) {
                        var result=JSON.parse(result.jsonMessage);
                        $scope.applyStores=result.rs;
                        $scope.applyStores.push(new obj("请选适用品牌"," ",0));
                        $scope.$apply();
                        var all_options = document.getElementById("brandName_id").options;
                        for(i=0;i<all_options.length;i++){
                            if(all_options[i].id==0){
                                all_options[i].selected = true;
                            }
                        }
                    })
                    .then(function() {
                        if($scope.id > 0){

                            $.when(promotionCmsExtcodeSingleActivityService.sendRequest({"activityId":$scope.id}))
                            .done(function(result) {
                                $scope.params = JSON.parse(result.jsonMessage);
                                $scope.params.cartPackage = JSON.parse($scope.params.cartPackage);
                                terminalType(result.terminal);
                                    //$scope.params.cartPackage = JSON.parse(result.jsonMessage.cartPackage);

                                    _.each($scope.params.cartPackage, function(item, index, list) {
                                        $scope.rules.push($scope.rulesRoot[item.type]);
                                        $scope.terminals.push({
                                            "pc": false,
                                            "h5": false,
                                            "app": false
                                        });

                                        $("#display_id").hide();
                                        terminalType(item.terminal, index);

                                        $scope.removeRule = function (index, length) {
                                            $scope.params.cartPackage.splice(index, length);
                                            $("#display_id").show();
                                        };
                                    })

                                    $scope.nextItem(1);
                                    $scope.$apply();
                                })
                                .fail(function() {
                                })
                        }
                    })
                    //.fail(function() {
                    //})

                function obj(brandName,brandUrl,id){
                    this.brandName=brandName;
                    this.brandUrl=brandUrl;
                    this.id=id;
                }

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

                $scope.stores = [
                    {'key': '请选择适用门店', 'deviceId': ''},
                    {'key': '全部门店', 'deviceId': '1'},
                    {'key': '部分门店', 'deviceId': '2'}
                ];
                $scope.deptType = [
                    {'key': '请选择', 'deviceId': ''},
                    {'key': '运营部', 'deviceId': 1},
                    {'key': '市场部', 'deviceId': 2},
                    {'key': '商品部', 'deviceId': 3},
                    {'key': '用户体验部', 'deviceId': 4},
                    {'key': '财务部', 'deviceId': 5},
                    {'key': '技术部', 'deviceId': 6},
                    {'key': '产品部', 'deviceId': 7},
                    {'key': '大客户部', 'deviceId': 8},
                    {'key': '新媒体营销部', 'value':'9'}
                ];

                $scope.promotionType = [
                    {'key': '请选择', 'deviceId': ''},
                    {'key': '外部优惠券', 'deviceId': 3}
                ];

                $scope.publicProm = [
                    {'key': '请选择', 'deviceId': ''},
                    {'key': '公码', 'deviceId': 1}
                ];


                $scope.addBrands=function(){


                    if (!$scope.brand) {
                        alert("请填写品牌名称和品牌图标！")
                        return false;
                    } else {
                        if($scope.brand.activityBrand=="" || $scope.brand.activityBrand==undefined){
                            alert("品牌名称不能为空!")
                            return false;
                        }
                        if($scope.brand.activityBrandUrl=="" ||$scope.brand.activityBrandUrl==undefined){
                            alert("品牌图标不能为空!")
                            return false;
                        }
                    }


                    $.when(promotionCmsExtcodeGetBrandService.sendRequest())
                        .done(function (result) {
                            var result=JSON.parse(result.jsonMessage);
                            $scope.applyStores=result.rs;
                            for(i=0;i< $scope.applyStores.length;i++){
                                if( $scope.applyStores[i].brandName == $scope.brand.activityBrand){
                                    alert("品牌重复了，请重新填写！");
                                    window.location.reload();
                                    return;
                                }
                            }
                            $.when(promotionCmsExtcodeAddBrandService.sendRequest({"activityBrand": $scope.brand.activityBrand,"activityBrandUrl":$scope.brand.activityBrandUrl}))
                                .done(function (result) {
                                    if(result.status="success"){
                                        alert("保存成功");
                                    }
                                    window.location.reload();
                                    //$scope.$apply();

                                })
                                .fail(function (code, msg) {
                                    alert(msg)
                                });
                        })
                        .fail(function (code, msg) {
                            alert(msg)
                        });


                }


                $scope.addRule = function () {
                    $scope.params.cartPackage.push({
                        "cardId": "",
                        "type": "",
                        "cycleType": "date",
                        "start": moment().format("x"),
                        "end": moment().add(7, 'days').format("x"),
                        "quantity": 1,
                        "display": "",
                        "whitelistId": null,

                        "is_blacklist": 0,
                        "terminal": 0

                    });

                    $scope.params.endTime = $scope.params.cartPackage[0].end;
                    $scope.terminals.push({
                        "pc": false,
                        "h5": false,
                        "app": false
                    });
                    $("#display_id").hide();
                };

                $scope.removeRule = function (index, length) {
                    $scope.params.cartPackage.splice(index, length);
                    $("#display_id").show();
                };
                $scope.params ={
                    "id": 0,
                    "type": "",
                    "is_blacklist": 1,
                    "valid_brand":"",
                    "valid_brand_id": "",
                    "valid_range": "",
                    "valid_shops": "",
                    "startTime": moment().format("x") ,
                    "endTime":moment().add(7, 'days').format("x"),
                    "productFrom": 0,
                    "groupId": 0,
                    "title":"",
                    "departmentId": "",
                    "demandMan": null,
                    "description": "",
                    "fake_item_id": "",
                    "count": 0,
                    "perLimit":0,
                    "isPublic": '',
                    "terminal": 0,
                    "use_rule_txt": "",
                    "sell_price": 0,
                    "pcUrl": "",
                    "mobileUrl": "",
                    "remarks": "",
                    "cartPackage": [],
                    "item_cost":0,
                    "in_cost":0,
                    "out_cost":0
                };

                $scope.itemClass = 1;

                $scope.nextItem = function(i){
                    //alert($scope.params.valid_brand_id);
                    //debugger
                    for(j=0;j<$scope.applyStores.length;j++){
                        if($scope.params.valid_brand_id==$scope.applyStores[j].id){
                            $scope.params.valid_brand=$scope.applyStores[j].brandName;
                            //alert($scope.applyStores[j].brandName);
                            break;
                        }
                    }
                    if($scope.params.valid_brand_id == null || $scope.params.valid_brand_id == ""){
                        alert("缺少必填项");
                        return;
                    }
                    if($scope.params.valid_range == null || $scope. params.valid_range == ""){
                        alert("缺少必填项");
                        return;
                    }
                    if($scope.id > 0 && i ==1){
                        return;
                    }
                    $scope.itemClass=i;
                }



                $scope.createActivity = {
                    "modal": $("#addMJModal"),
                    "open": function () {
                        this.modal.modal({});
                    },
                    "save": function() {

                        if (!validService.valid($scope.extActivityForm)) {
                            return;
                        }
                        if(!this.validSave()){
                            alert("缺少必填项");
                            return;
                        }

                        var _reTimeReg = /^(?:19|20)[0-9][0-9]-(?:(?:0[1-9])|(?:1[0-2]))-(?:(?:[0-2][1-9])|(?:[1-3][0-1])) (?:(?:[0-2][0-3])|(?:[0-1][0-9])):[0-5][0-9]:[0-5][0-9]$/;
                        var endTime= $scope.params.endTime;

                        if(_reTimeReg.test(endTime)){
                            $scope.params.endTime= moment($scope.params.endTime).format('x');
                        }

                        if ($scope.params.cartPackage[0].end.length > 10 &&  $scope.params.endTime.length > 10) {//判断长度
                            var date =$scope.params.cartPackage[0].end.substr(0,10);//截取字符串
                            var date1 =$scope.params.endTime.substr(0,10);//截取字符串
                            //$scope.params.cartPackage[0].end=date;//将字符串的值赋给对象
                            //$scope.params.endTime=date1;//将字符串的值赋给对象
                            if (!(date == date1)) {
                                alert("请保持【使用结束时间】和【活动结束时间】一致,谢谢配合!")
                                return false;
                            }
                        };

                        var flag = true;
                        _.each($scope.params.cartPackage, function(item, index, list){
                            if(item.start >= item.end){
                                flag = false;
                                alert("第"+(index+1)+"条规则活动开始时间不能大于结束时间");
                            }
                        });
                        if(!flag) return false;
                        if($scope.params.cartPackage[0].start > $scope.params.cartPackage[0].end){
                            alert("活动开始时间不能大于结束时间");
                            return false;
                        }
                        var partition = $scope.params.valid_shops;
                        if (partition!=null && partition !=undefined && partition !="") {
                            partition = partition.replace('，', ',')
                        }
                        $scope.params.valid_shops=partition;
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
                        if($scope.params.count <=0  || $scope.params.count == ""){
                            return false;
                        }
                        if($scope.params.perLimit <=0  || $scope.params.perLimit == ""){
                            return false;
                        }
                        if($scope.params.isPublic == null || $scope.params.isPublic == ""){
                            return false;
                        }
                        if($scope.params.cartPackage == null || $scope.params.cartPackage == ""){
                            return false;
                        }
                        if($scope.params.sell_price == null || $scope.params.sell_price == 0){
                            return false;
                        }

                        if($scope.params.out_cost == null ){
                            return false;
                        }

                        if($scope.params.in_cost == null ){
                            return false;
                        }

                        if($scope.params.item_cost == null ){
                            return false;
                        }


                        if($scope.params.use_rule_txt == null || $scope.params.use_rule_txt == ""){
                            return false;
                        }

                        if($scope.params.cartPackage[0].display == null || $scope.params.cartPackage[0].display== ""){
                            return false;
                        }
                        return true;

                    },
                    addPage: function() {
                        //debugger
                        if($scope.params.cartPackage.length>1){
                            //var rlt = confirm("不支持设置多条规则" )
                            //if (rlt != true) {
                            //
                            //}
                            alert("不支持设置多条规则,最多只能设置一条！")
                            return false;
                        }

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
                           /* if($scope.params.cartPackage[index].start>0){
                                $scope.params.startTime=  $scope.params.cartPackage[index].start;
                            }
                            if($scope.params.cartPackage[index].start>0){
                                $scope.params.endTime=  $scope.params.cartPackage[index].end;
                            }*/

                        })

                        if($scope.params.cartPackage[0].terminal==0){
                            alert("必填终端")
                            return false;
                        }
                        var _reTimeReg = /^(?:19|20)[0-9][0-9]-(?:(?:0[1-9])|(?:1[0-2]))-(?:(?:[0-2][1-9])|(?:[1-3][0-1])) (?:(?:[0-2][0-3])|(?:[0-1][0-9])):[0-5][0-9]:[0-5][0-9]$/;
                        var startTime= $scope.params.startTime;
                        var endTime= $scope.params.endTime;
                        if(_reTimeReg.test(startTime)){
                            $scope.params.startTime= moment($scope.params.startTime).format('x');
                        }
                        if(_reTimeReg.test(endTime)){
                            $scope.params.endTime= moment($scope.params.endTime).format('x');
                        }
                        $.when(promotionCmsExtcodeSaveActivityService.sendRequest({"json": angular.toJson($scope.params)})).done(function(result) {
                                if($scope.id > 0){
                                    $location.path('extCoupons/createSuccess/' + result.jsonMessage);
                                }else {
                                    $location.path('extCoupons/createSuccess/' + result.jsonMessage);
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

