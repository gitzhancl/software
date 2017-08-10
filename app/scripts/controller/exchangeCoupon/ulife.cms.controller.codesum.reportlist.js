
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

        'ulife.api.ticket.codesum.reportlist',

        'ulife.cms.directive.datetimepicker',
        'ulife.cms.directive.datepicker',
        'ulife.cms.directive.dateformat',
        "ulife.cms.service.authority"
    ],
    function(app, services, BizConfig, MenuConfig, codeSumList) {

        codeSumList.injectTo(app);
        

        app.controller('codeReSumListCtrl', ['$scope', '$location', '$route',
            'ticketCodesumReportlistService',
            'authorityService',
            function($scope, $location, $route, ticketCodesumReportlistService) {

                $scope.menuConfig = MenuConfig.menu;
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
                        //获取页面列表
                       return $.when(ticketCodesumReportlistService.sendRequest(tmpParams))
                            .done(function(result) {
                                if(actionType == 'export'){
                                        alert(result.message);
                                }else{
                                    if(result.status == 'success'){
                                        $scope.renderObj = JSON.parse(result.message);
                                        //处理分页信息
                                        that.pageCount = result.othermsg;
                                        that.pageTotal = Math.ceil(result.othermsg / that.pageSize);
                                        $scope.$apply();
                                    }else{
                                        alert(result.message);
                                    }
                                }
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
            }
        ]);

    });

