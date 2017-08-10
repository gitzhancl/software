
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

        'ulife.api.ticket.list',
        'ulife.api.ticket.audit',

        'ulife.cms.directive.datetimepicker',
        'ulife.cms.directive.datepicker',
        'ulife.cms.directive.dateformat',
        "ulife.cms.service.authority"
    ],
    function(app, services, BizConfig, MenuConfig, ticketList,ticketAudit) {

        ticketList.injectTo(app);
        ticketAudit.injectTo(app);
        
        app.filter('isItemStatus', function () {
            return function (val) {
                switch (val) {
                    case 1 :
                        return '有效';
                    case 0 :
                        return '无效';
                    default :
                        return val;
                }
            }
        });
        app.filter('show', function () {
            return function (val) {
                if (val == 0){
                    return null;
                }else {
                    return val;
                }
            }
        });

        app.filter('auditfilter', function () {
            return function (val) {
                switch (val) {
                    case 0 :
                        return '待审核';
                    case 1 :
                        return '审核通过';
                    default :
                        return val;
                }
            }
        });

        app.filter('canChangefilter', function () {
            return function (val) {
                if(val){
                    return "是";
                }else {
                    return "否";
                }

            }
        });


        app.controller('exchangeCouponListCtrl', ['$scope', '$location', '$route',
            'ticketListService',
            'ticketAuditService',
            'authorityService',
            function($scope, $location, $route, ticketListService,ticketAuditService) {

                $scope.menuConfig = MenuConfig.menu;
 
                $scope.validState = [
                    {'key': '全部', 'value': '-1'},
                    {'key': '有效', 'value': '1'},
                    {'key': '无效', 'value': '0'}
                ];
                //默认值为0
                //$scope.searchPage.params.status = $scope.validState[0].value;
                
                $scope.checkState = [
                    {'key': '全部', 'value': '-1'},
                    {'key': '待审核', 'value': '0'},
                    {'key': '已审核', 'value': '1'}
                ];

                $scope.searchPage = {
                    "pageSize": 15,  //页大小
                    "pageNum": 1,   //当前页码
                    "pageTotal": 1,  //页面数量
                    "pageCount": 1, //数据个数
                    "pageShow": [],
                    "params": {
                        "auditStatus" : $scope.checkState[0].value,
                        "status" : $scope.validState[0].value
                    },
                    "search": function() {
                        this.params.page = 1;
                        this.params.rows = this.pageSize;
                        this.getData();
                    },
                    "getData": function() {
                        var tmpParams = $scope.searchPage.params;

                        tmpParams.row = this.pageSize;
                        tmpParams.page = this.pageNum;
                        //tmpParams.from = (this.pageNum - 1) * this.pageSize;
                        var that = this;
                        _.each(tmpParams, function(value,key ){
                            if(value == ''){
                                delete tmpParams[key];
                            }
                        })
                        //获取页面列表
                        $.when(ticketListService.sendRequest(tmpParams))
                            .done(function(result) {
                                $scope.renderObj = result.ticketInfos;

                                //处理分页信息
                                that.pageCount = result.totalPage;
                                that.pageTotal = Math.ceil(result.totalPage / that.pageSize);
  
                                $scope.$apply();
                            })
                            .fail(function(err,msg) {
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
                    }
                };

                $scope.searchPage.search();

                $scope.getDataList = function(){
                    var tmpParams = $scope.searchPage.params;
                        tmpParams.row = $scope.searchPage.pageSize;
                        tmpParams.page = 1;
                        _.each(tmpParams, function(value,key ){
                            if(value == ''){
                                delete tmpParams[key];
                            }
                        })
                    $.when(ticketListService.sendRequest(tmpParams))
                    .done(function(data){
                        $scope.renderObj = data.ticketInfos;
                        $scope.$apply();
                    })
                    .fail(function(){
                        alert('获取数据失败');
                    })
                    
                };
                $scope.isPass = function(item){
                    if(confirm("你确定通过审批?")){
                        if(item.id){
                            $.when(ticketAuditService.sendRequest({'id':item.id , 'auditStatus':1}))
                            .done(function(data){
                                alert('审批通过');
                                //重新获取数据
                                 $scope.searchPage.search();
                            })
                            .fail(function(err,msg){
                                alert(msg);
                                console.log('操作失败！');
                            })
                        };
                    };
                    
                }

            }
        ]);

    });

