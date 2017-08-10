
/** 
 * Created by Ulife on 2016/12/23.
 * 
 * Created by Yu on 2016/12/23.
 */

define([
        'ulife.cms.module.myApp',
        'ulife.framework.services',
        'ulife.cms.business.config',
        'ulife.cms.menu.config',

        'ulife.api.ticket.stock.report',
        'ulife.api.cms.sku.list',
        'ulife.api.ticket.fetch.stocks',
        'ulife.api.product.more',

        'ulife.cms.directive.datetimepicker',
        'ulife.cms.directive.datepicker',
        'ulife.cms.directive.dateformat',
        'ulife.cms.directive.loading',
        "ulife.cms.service.authority"
    ],
    function(app, services, BizConfig, MenuConfig, ticketStockList, skuList, fetchStocks, productMore) {

        ticketStockList.injectTo(app);
        skuList.injectTo(app);
        fetchStocks.injectTo(app);
        productMore.injectTo(app);
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

        app.filter('codeOutStoreDataTime', function () {
            return function (val) {
                if(val ==""){
                    return val;
                }else{
                    return moment(val,"MMM D, YYYY h:mm:ss A").valueOf();
                }

            }
        });

        app.controller('ticketStoreListCtrl', ['$scope', '$location', '$route',
            'ticketStockReportService',
            'cmsSkuListService',
            'ticketFetchStocksService',
            'productMoreService',
            'authorityService',
            function($scope, $location, $route, ticketStockReportService,cmsSkuListService,ticketFetchStocksService,productMoreService) {

                $scope.menuConfig = MenuConfig.menu;
                $scope.listLoading = false;
                $scope.purpose = [
                    {'key': '全部', 'value': ''},
                    {'key': '销售', 'value': '销售'},
                    {'key': '客情', 'value': '客情'},
                    {'key': '样品', 'value': '样品'}
                ];
 

                $scope.searchPage = {
                    "pageSize": 15,  //页大小
                    "pageNum": 1,   //当前页码
                    "pageTotal": 1,  //页面数量
                    "pageCount": 1, //数据个数
                    "pageShow": [],
                    "params": {
                        'actionType':'page'
                    },
                    "search": function() {
                        this.pageNum = 1;
                        this.pageSize = this.pageSize;
                        this.getData();
                    },
                    "getData": function(actionType) {
                        var tmpParams = $scope.searchPage.params;
                        $scope.listLoading = true;
                        tmpParams.rows = this.pageSize;
                        tmpParams.page = this.pageNum;

                        if(actionType){
                            tmpParams.actionType = actionType;
                        }else{
                            tmpParams.actionType = 'page';
                        }
                        //tmpParams.from = (this.pageNum - 1) * this.pageSize;
                        var that = this;
                        _.each(tmpParams, function(value,key ){
                            if(value == ''){
                                delete tmpParams[key];
                            }
                        }) 
                        // if(!(tmpParams.startTime && tmpParams.endTime)){
                        //     alert('请选择时间');
                        //     return false;
                        // }
                        //获取页面列表
                       return $.when(ticketStockReportService.sendRequest(tmpParams))
                            .done(function(result) {
                                $scope.listLoading = false;
                                if(actionType == 'export'){
                                        alert(result.message);
                                }else{
                                    if(result.status == 'success'){
                                        if(result.message){
                                            $scope.renderObj = JSON.parse(result.message);
                                            //处理分页信息
                                            that.pageCount = result.othermsg;
                                            that.pageTotal = Math.ceil(result.othermsg / that.pageSize);
                                        }else{
                                            alert(result.remark);
                                        }
                                        
                                    }else{
                                        alert(result.message);
                                    }
                                }
                                $scope.$apply();
                            })
                            .fail(function(err,msg) {
                                $scope.listLoading = false;
                                $scope.$apply();
                                alert(msg);
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
                    },
                    'findReport': function(){
                        var that = this;
                        this.getData('export')
                        .then(function(){
                            that.modal.modal('hide');  
                        })
                    },
                    "modal": $("#downloadModal"),
                    "open": function () {
                            this.modal.modal({});
                        }
                };

                $scope.giftDetail = function(itemID){
                    var itemId = itemID;
                    var giftProductList;
                    var arrSku;
                    var tmpParams ={
                        'page':1,
                        'rows':99,
                        'query':angular.toJson({'superId':itemId})
                    };
                    var o_parms = {
                        'id':itemID
                    }

                    $.when(productMoreService.sendRequest(o_parms),cmsSkuListService.sendRequest(tmpParams))
                    .done(function(data,data2){      
                        //console.log(data2);   
                        _.each(data.subProducts,function(ele,index){
                            _.each(data2.skus,function(items){
                                if(ele.skuId == items.id){
                                    ele.status = items.status
                                }
                            })                       
                        })    
                        giftProductList = data.subProducts;
                        console.dir(giftProductList);
                        arrSku = _.pluck(giftProductList,'skuId');
                    })
                    .done(function(){
                       return $.when(ticketFetchStocksService.sendRequest({
                           itemIds:arrSku.join(',')
                        }))
                        .done(function(data2){
                                if(data2.status = 'success'){
                                    _.each(giftProductList,function(ele,index){
                                        ele.stocks =JSON.parse(data2.message)[ele.skuId]
                                    })
                                    $scope.giftProductList = giftProductList;
                                    $scope.$apply();
                                    $('body').addClass('modal-open');
                                    $('#giftDetailModel').show();
                                }
                        })
                        .fail(function(err,msg){
                            alert(msg);
                            $scope.$apply();
                            console.log(msg);
                        })
                    })
                    .fail(function(err, msg){
                        alert(msg);
                        $scope.$apply();
                        console.log(msg);
                    })
                };
                //关闭礼包查看弹窗
                $scope.giftClose = function(){
                    $('#giftDetailModel').hide();
                    $('body').removeClass('modal-open');

                };
            }
        ]);

    });

