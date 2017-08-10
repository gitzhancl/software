
/** 
 * Created by Ulife on 2016/11/29.
 * 
 * Created by Yu on 2016/11/29.
 */

define([
        'ulife.cms.module.myApp',
        'ulife.framework.services',
        'ulife.cms.business.config',
        'ulife.cms.menu.config',

        'ulife.api.ticket.add',
        'ulife.api.ticket.getProdInfo',
        'ulife.api.ticket.get',
        'ulife.api.ticket.update',
        'ulife.api.product.more',
        'ulife.api.cms.sku.list',

        'ulife.cms.directive.datetimepicker',
        'ulife.cms.directive.datepicker',
        'ulife.cms.directive.dateformat',
        "ulife.cms.service.authority",
        'ulife.cms.service.getDepartment',
        "ulife.cms.service.valid",
    ],
    function(app, services, BizConfig, MenuConfig, TicketAdd, TicketgetProdInfo, Ticketget, Ticketupdate,ProductMore, skuList) {

        TicketAdd.injectTo(app);       
        TicketgetProdInfo.injectTo(app);
        Ticketget.injectTo(app);
        Ticketupdate.injectTo(app);
        ProductMore.injectTo(app);
        skuList.injectTo(app);
        
        app.filter('exchangeIsGift', function(){
            return function (val) {
                switch (val){
                    case 1 :
                        return '礼包';
                    case 0 :
                        return '非礼包';
                    default :
                        return '未知参数'+val;
                }
            }
        });
        //是否上架
        app.filter('exchangeIsupdown', function(){
            return function (val) {
                switch (val){
                    case 0 :
                        return '创建';
                    case 1 :
                        return '上架';
                    case 2 :
                        return '下架';
                    case 3 :
                        return '废弃';
                    default :
                        return '未知参数'+val;
                }
            }
        });
        //OM1可售，0不可售
        app.filter('exchangeIsSale', function(){
            return function (val) {
                switch (val){
                    case 0 :
                        return '不可售';
                    case 1 :
                        return '可售';
                    default :
                        return '未知参数'+val;
                }
            }
        });

        app.filter('exitemStatus', function () {
            return function (val) {
                switch (val) {
                    case 1 :
                        return '有效';
                    case 0 :
                        return '无效';
                    default :
                        return '未知'+val;
                }
            }
        });

        app.filter('exskuStatus', function () {
            return function (val) {
                switch (val) {
                    case 0 :
                        return '新品';
                    case 1 :
                        return '接收';
                    case 2 :
                        return '不可售';
                }
            }
        });
        
        app.controller('exchangeCouponCreateCtrl', ['$scope', '$location', '$route',
        'ticketAddService',
        'ticketGetProdInfoService',
        'ticketGetService', 
        'ticketUpdateService',
        'productMoreService',
        'cmsSkuListService',
        'authorityService',
        'validService',
        'deportmentService',           
            function($scope, $location, $route,
            ticketAddService,
            ticketGetProdInfoService,
            ticketGetService,
            ticketUpdateService,
            productMoreService,
            cmsSkuListService,
            authorityService,
            validService,
            deportmentService) {
    
                $scope.menuConfig = MenuConfig.menu;
                $scope.id = $route.current.params.id;
                $scope.title = '新建券';

                $scope.validState = [
                    {'key': '有效', 'value': '1'},
                    {'key': '无效', 'value': '0'}
                ];
                
                $scope.checkState = [
                    {'key': '全部', 'value': '-1'},
                    {'key': '待审核', 'value': '0'},
                    {'key': '已审核', 'value': '1'}
                ];
                $scope.accountTypes = [
                    {'key': '蔬菜--1', 'value': '1'},
                    {'key': '鲜活肉蛋--2', 'value': '2'},
                    {'key': '其他应税商品--3', 'value': '3'}
                ];
                $scope.shipTypes = [
                    {'key': '仓库发货', 'value': 'SELF'},
                    {'key': '供应商直发', 'value': 'DM'},
                    {'key': '供应商直发+仓库发货', 'value': 'DM+SELF'}
                ];
                //定义商品列表
                var productList = [];
                $scope.productList = [];

                $scope.doubleProductList = [];
                $scope.doubleProductData = [{
                    items:[]
                }];
                $scope.giftProductList = [];
                $scope.checkDefault = $scope.checkState[0].value;
                if($scope.id==0){
                    setTimeout(function() {
                        $scope.departmentId = $scope.deptType[0].id; 
                        $scope.$apply();           
                    }, 1000);
                }
                
                
                
                $scope.HeadParam = {
                    name:'【大客户自营券】',
                    status : $scope.validState[0].value,
                    accountType : $scope.accountTypes[0].value,
                    shipType : $scope.shipTypes[0].value,
                    exchangeExpireType : 1,
                    exchangeStartDate : new Date().getTime(),
                    type:'0',//多选一或多选多
                    scope:'1',//选择配送城市
                    canChange:false,
                    bak1:''
                };
                $scope.newParam={
                    url:"http://h5.ucaiyuan.com/exchange.html?type=qrCode&ticketId=",
                    qrCode:""
                };
                if($scope.id!=0){
                    $scope.title = '修改券';
                    $.when(ticketGetService.sendRequest({'id':$scope.id}))
                    .done(function(data){
                        data.status = data.status.toString();
                        data.accountType = data.accountType.toString();  
                        if(data.exchangeExpireType == '0'){
                            data.exchangeExpireDate = moment(data.exchangeExpireDate,"YYYY-MM-DD HH:mm").valueOf();                      
                        }else{
                            data.exchangeExpireDate = parseInt(data.exchangeExpireDate, 10);
                        }             

                        $scope.HeadParam = data;
                        if(data.type == '0'){
                            $scope.productList = JSON.parse(data.items);
                        }else{
                            $scope.doubleProductList = JSON.parse(data.items);
                        }
                        $scope.newParam.qrCode=$scope.newParam.url+$scope.id+"&codePrefix="+$scope.HeadParam.codePrefix;
                        $scope.departmentId = data.departmentId;
                        $scope.doubleProductData = data.groupItems;
                        $scope.$apply();
                    })
                }
                //提交页面数据
                $scope.save = function(){     
                                  
                    if (!validService.valid($scope.HeadParamForm)) {
                            return;
                        }
                    if($scope.HeadParam.codePrefix.length!=5){
                        alert("必须填写5个字母！");
                        return;
                    }
                    if($scope.HeadParam.canChange){
                        $scope.HeadParam.bak1='自选券';
                    }else {
                        $scope.HeadParam.bak1='';
                    }

                        $scope.HeadParam.departmentId = $scope.departmentId;
                        if($scope.HeadParam.type == '0'){
                            if($scope.productList.length >0){
                                $scope.productList[0].flag = 1 ;
                            }else{
                                alert('请添加商品');
                                return false;
                            }
                        }else{
                            if($scope.doubleProductList.length >0){
                                //$scope.doubleProductList[0].flag = 1 ;
                            }else{
                                alert('请添加多选多商品');
                                return false;
                            }
                        }

                   
                        var term = {
                            "HeadParam": JSON.stringify($scope.HeadParam),
                            "itemParam": angular.toJson($scope.productList)
                        };
                        if($scope.HeadParam.type == '1'){
                            term.itemParam = angular.toJson($scope.doubleProductData);
                        }
       
                        $.when(ticketAddService.sendRequest(term))
                        .done(function(data){
                            if(data.value){
                                alert('保存成功');
                                $location.path('exchangeCoupon/exchangeCouponList/');
                                $scope.$apply();
                            }else{
                                alert("保存失败");
                            }
                              
                        })
                        .fail(function(err,Mes){
                            alert(Mes);
                            console.log(Mes); 
                        })
                    //alert('提交成功');           
                };

                //编辑多选一数据
                $scope.edit = function(){
                    var id = $scope.id;
                    if (!validService.valid($scope.HeadParamForm)) {
                        return false;
                    }
                    if($scope.HeadParam.canChange){
                        $scope.HeadParam.bak1='自选券';
                    }else {
                        $scope.HeadParam.bak1='';
                    }
                    $scope.HeadParam.departmentId = $scope.departmentId;
                    $scope.HeadParam.id = id;
                    delete $scope.HeadParam.items;
                    delete $scope.HeadParam.groupItems;
                    var term = {
                            "HeadParam": angular.toJson($scope.HeadParam),
                            "itemParam": angular.toJson($scope.productList)
                        };
                    if($scope.HeadParam.type == '1'){
                        term.itemParam = angular.toJson($scope.doubleProductData);
                    }
                    $.when(ticketUpdateService.sendRequest(term))
                    .done(function() {
                        alert('编辑成功');
                        $location.path('/exchangeCoupon/exchangeCouponList/');
                        $scope.$apply();
                    })
                    .fail(function (err,msg) {
                        alert(msg);
                    })


                };
                $scope.singleProduct = {
                    model :{
                        singleProductId:''
                    },
                    addProduct : function(){
                        var isupdata = true;
                        var singleProductId = this.model.singleProductId; 
                        _.each($scope.productList,function(items){
                            if(singleProductId == items.itemId ){
                                alert('不能添加重复数据');
                                isupdata = false;
                            }
                        })
                        if(isupdata){
                            $.when(ticketGetProdInfoService.sendRequest({'itemId':singleProductId}))
                            .done(function(data){   
                                data.status = 1;
                                $scope.productList.push(data); 
                                $scope.$apply();
                            })
                            .fail(function(err,msg){
                                alert(msg);
                                console.log(msg);
                            })   
                        };
                    }
                }
                //查询礼包商品详情
                $scope.giftDetail = function(itemID){
                    var itemId = itemID;
                    var tmpParams ={
                        'page':1,
                        'rows':99,
                        'query':angular.toJson({'superId':itemId})
                    };

                    $.when(cmsSkuListService.sendRequest(tmpParams))
                    .done(function(data){
                        $scope.giftProductList = data.skus;
                        $scope.$apply();
                        $('#giftDetailModel').show();

                    })
                    .fail(function(err, msg){
                        alert(msg);
                        console.log(msg);
                    })
                }

                //关闭礼包查看弹窗
                $scope.giftClose = function(){
                    $('#giftDetailModel').hide();
                }
                //多选一单个商品修改状态
                $scope.isStatus = function (event) {
                    var target=event.target;
                    var index = $(target).attr('index');
                    var arr = $scope.productList;
                    
                    arr[index].status = arr[index].status == 0 ? 1 : 0;
                    $scope.productList = arr;
                }
                //多选一单个商品删除
                $scope.delprd = function (event) {
                    var target=event.target;
                    var index = $(target).attr('index');
                    var arr = $scope.productList;
                    arr.splice(index,1);
                    //arr[index].status = arr[index].status == 0 ? 1 : 0;
                    $scope.productList = arr;
                }
                //多选多商品操作
                $scope.searchProdect = {
                    "modal": $("#selectMoreProduct"),
                    "model":{
                        productId : ''
                    },
                    "open": function () {
                            this.modal.modal({});
                        },
                    addProduct: function(event){
                        var target=event.target;
                        var index = $(target).attr('index');  
                        var productId = this.model.productId;                
                        var isupdata = true;
                        _.each($scope.doubleProductData[index].items,function(item){                    
                            if(productId == item.itemId ){
                                alert('不能添加重复数据');
                                isupdata = false;
                            }
                        })
                        if(isupdata){
                            $.when(ticketGetProdInfoService.sendRequest({'itemId':productId}))
                            .done(function(data){   
                                data.status = 1;
                                data.skuNum = 1;
                                if($scope.doubleProductData[index].items.length <= 0){
                                    data.flag = 1;
                                }
                                $scope.doubleProductData[index].items.push(data); 
                                $scope.$apply();
                            })
                            .fail(function(err,msg){
                                alert(msg);
                                console.log(msg);
                            })   
                        };
                    },
                    addGroup : function(){
                        $scope.doubleProductData.push({
                            items:[]
                        });
                    },
                    save : function(){
                        var doubleObj = $scope.doubleProductData;
                        var groupNameArr = [];
                        var isupdata = true;
                        var sum = 0;
                        var isStatusArr = [];
                        _.each(doubleObj,function(prd,index){
                            var num = 0;
                            groupNameArr.push(prd.groupName);
                            _.each(prd.items, function(items){
                                if(items.status == '1'){
                                    num += items.skuNum;
                                }
                            })
                            isStatusArr.push(num);

                        })
                        if(!arrRepeat(groupNameArr)){
                           alert('分组名不能重复');
                           isupdata = false;
                       };
                       //多选多数据验证
                        _.each(doubleObj,function(prd,index){  
                            if(prd.groupName && prd.prodNum){
                                if(1 <= prd.prodNum && isStatusArr[index] >= prd.prodNum){
                                    _.each(prd.items,function(items,number){
                                            if(items.skuNum >=1){
                                                items.groupName = prd.groupName;
                                                items.prodNum = prd.prodNum;
                                            }else{
                                                if(sum ==0){
                                                    alert(prd.groupName+items.name+'选择数量限制大于1');
                                                    isupdata = false;
                                                    sum++;
                                                }
                                            }
                                        })
                                }else{
                                    if(sum ==0){
                                            alert(prd.groupName+'可选商品个数必须大于列表中有效状态商品数量');
                                            isupdata = false;
                                            sum++;
                                        }
                                }
                                
                            }else{
                                if(sum ==0){
                                    alert(prd.groupName+'分组名称、可选商品为必填');
                                    isupdata = false;
                                    sum++;
                                }
                                
                            }                       
                        })
                     
                    
                       var allData =  _.pluck(doubleObj,'items');
                       //将二维数组合并为一个数组
                       var flat = _.reduce(allData, function(a, b) { return a.concat(b); }, []);
                       if(isupdata){
                           $scope.doubleProductList = flat;
                            this.modal.modal('hide'); 
                       }
  

                       //判断数组内是否有重复数据
                       function arrRepeat(arr){
                           var hash = {};
                           var flag = true;
                           for(var i in arr){
                               if(!hash[arr[i]]){
                                   hash[arr[i]] = true; 
                               }else{
                                   flag = false;
                                   return false;
                               }
                           }
                           return flag;
                        }
                    },
                    deletGroup: function(event){
                        if(!window.confirm('确定删除分组?')){
                            return false;
                        }
                        var target=event.target;
                        var index = $(target).attr('index');
                        $scope.doubleProductData.splice(index,1);
                    },
                    isStatus : function(){
                         var target = event.target;
                        var farther = $(target).parents('tbody').attr('farther');
                        var index = $(target).attr('index');
                        
                        var arr = $scope.doubleProductData[farther].items;
           
                        arr[index].status = arr[index].status == 0 ? 1 : 0;
                        //$scope.productList = arr;
                    },
                    delprd : function(event){
                        var target=event.target;
                        var farther = $(target).parents('tbody').attr('farther');
                         var index = $(target).attr('index');
                        var arr = $scope.doubleProductData[farther].items;
                        arr.splice(index,1);
                        //arr[index].status = arr[index].status == 0 ? 1 : 0;
                        //$scope.productList = arr;
                    }
                }

            }
        ]);

    });

