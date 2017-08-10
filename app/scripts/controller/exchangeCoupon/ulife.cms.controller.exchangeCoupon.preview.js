
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

        'ulife.api.ticket.get',
        'ulife.api.product.more',

        'ulife.cms.directive.datetimepicker',
        'ulife.cms.directive.datepicker',
        'ulife.cms.directive.dateformat',
        "ulife.cms.service.authority",
        "ulife.cms.service.valid",
    ],
    function(app, services, BizConfig, MenuConfig, Ticketget, ProductMore) {


        Ticketget.injectTo(app);
        ProductMore.injectTo(app);
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
        })
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


        app.controller('exchangeCouponPreviewCtrl', ['$scope', '$location', '$route',
        'ticketGetService', 
        'productMoreService',
        'validService',           
            function($scope, $location, $route,
            ticketGetService,
            productMoreService,
            validService) {

                $scope.menuConfig = MenuConfig.menu;
                $scope.id = $route.current.params.id;
    
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
                    {'key': '请选择', 'value': '0'},
                    {'key': '蔬菜', 'value': '1'},
                    {'key': '鲜活肉蛋', 'value': '2'},
                    {'key': '其他应税商品', 'value': '3'}
                ];
                $scope.shipTypes = [
                    {'key': '仓库发货', 'value': 'SELF'},
                    {'key': '供应商直发', 'value': 'DM'},
                    {'key': '供应商直发+仓库发货', 'value': 'DM+SELF'}
                ]
                //定义商品列表
                var productList = [];
                $scope.productList = [];
                $scope.giftProductList = []; 

                $scope.checkDefault = $scope.checkState[0].value;
                if($scope.id==0){
                    setTimeout(function() {
                        $scope.departmentId = $scope.deptType[0].id;  
                        $scope.$apply();         
                    }, 1000);
                }
                
                
                
                $scope.HeadParam = {
                    name:'',
                    status : $scope.validState[0].value,
                    accountType : $scope.accountTypes[0].value,
                    shipType : $scope.shipTypes[0].value,
                    exchangeExpireType : '0'
                };

                $scope.newParam={
                    url:"http://h5.ucaiyuan.com/exchange.html?type=qrCode&ticketId=",
                    qrCode:""
                };
                 $scope.giftDetail = function(itemID){
                    var itemId = itemID;
                    $.when(productMoreService.sendRequest({'id':itemId}))
                    .done(function(data){
                        $scope.giftProductList = data.subProducts;
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


                $scope.searchProdect = {
                    "modal": $("#selectMoreProduct"),
                    "model":{
                        productId : ''
                    },
                    "open": function () {
                            this.modal.modal({});
                        }
                };
                $.when(ticketGetService.sendRequest({'id':$scope.id}))
                .done(function(data){
                    data.status = data.status.toString();
                    data.accountType = data.accountType.toString();
                    if(data.type == '0'){
                        $scope.productList = JSON.parse(data.items);
                    }else{
                        $scope.doubleProductList = JSON.parse(data.items);
                    }
                    $scope.HeadParam = data;

                    $scope.newParam.qrCode=$scope.newParam.url+$scope.id+"&codePrefix="+$scope.HeadParam.codePrefix;
                           
                    $scope.departmentId = data.departmentId;
                    $scope.doubleProductData = data.groupItems;
                    $scope.$apply();
                    $('input').attr('disabled','disabled');
                    $('select').attr('disabled','disabled');
                    $('textarea').attr('disabled','disabled');
                })
                
            }
        ]);

    });

