
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

        'ulife.api.promotion.cms.extcode.codeManageList',
        'ulife.api.promotion.cms.extcode.codeCancel',
        'ulife.api.promotion.cms.extcode.export',
        'ulife.api.cms.page.add',

        'ulife.cms.directive.datetimepicker',
        'ulife.cms.directive.datepicker',
        'ulife.cms.directive.dateformat',
        "ulife.cms.service.authority"
    ],
    function(app, services, BizConfig, MenuConfig, promotionCmsExtcodeCodeManageList,promotionCmsExtcodeCodeCancel,promotionCmsExtcodeCodeExport, addPage) {

        promotionCmsExtcodeCodeManageList.injectTo(app);
        promotionCmsExtcodeCodeCancel.injectTo(app);
        promotionCmsExtcodeCodeExport.injectTo(app);
        addPage.injectTo(app);

        app.filter('productType', function () {
            return function (val) {
                switch (val) {
                    case 'SELF' :
                        return '自营';
                    case 'consignation' :
                        return '寄售';
                }
            }
        });
        app.controller('PromotionActivityListCtrl', ['$scope', '$location', '$route',
            'promotionCmsExtcodeCodeManageListService',
            'promotionCmsExtcodeCodeCancelService',
            'promotionCmsExtcodeExportService',
            'cmsPageAddService',
            'authorityService',


            function($scope, $location, $route, promotionCmsExtcodeCodeManageListService, promotionCmsExtcodeCodeCancelService,promotionCmsExtcodeExportService,cmsPageAddService) {
                $('.checkAll').click(function () {
                    var that = this;
                    _.each($scope.renderObj, function (item, index) {
                        item.checked = $(that).prop("checked")
                    })
                    $scope.$apply();
                });
                $scope.menuConfig = MenuConfig.menu;

                $scope.renderObj = {};

                $scope.productType = [
                    {'key': '全部商品类型', 'deviceId': ''},
                    {'key': '自营', 'deviceId': 'SELF'},
                    {'key': '寄售', 'deviceId': 'consignation'}
                ];
                $scope.codeStatus = [
                    {'key': '全部', 'deviceId': ""},
                    {'key': '已激活', 'deviceId': '1'},
                    {'key': '已使用', 'deviceId': '0'},
                    {'key': '已失效', 'deviceId': '-1'}
                ];
                $scope.rollType = [
                    {'key': '全部', 'deviceId': ''},
                    {'key': '购买', 'deviceId': '4'},
                    {'key': '赠送', 'deviceId': '2'}
                ];
                $scope.searchPage = {
                    "pageSize": 10,  //页大小
                    "pageNum": 1,   //当前页码
                    "pageTotal": 1,  //页面数量
                    "pageCount": 1, //数据个数
                    "pageShow": [],
                    "params": {
                        "activityId":"",
                        "name":"",
                        "code": "",
                        "orderSn": "",
                        "customerId": "",
                        "phone": "",
                        "codeStatus": "",
                        "useStartTime": moment().add(-1, 'days').format("x"),
                        "useEndTime": moment().format("x"),
                        "startNumber": 0,
                        "page": 1,
                        "eachPageNumber": 10
                    },
                    "search": function() {
                        this.params.eachPageNumber = this.pageSize;
                        this.params.startNumber = 0;
                        this.getData();
                    },
                    "discard":function(searchParams){
                        var selectedItems = _.filter($scope.renderObj, function (item, index) {
                            if (item.checked != undefined && item.checked) {
                                return true;
                            } else {
                                return false
                            }
                        })
                        if(selectedItems){
                            if (!!searchParams["state"]) {
                                this.params["state"] = searchParams["state"];
                                var str = '';
                                for (var i = 0; i < selectedItems.length; i++) {
                                    str += (selectedItems[i].id + ",");
                                }
                                this.str = str.substring(0, str.length - 1);
                                this.state = this.params.state;
                                if (str == '') {
                                    alert("请选择要废弃的CODE");
                                    return false;
                                }
                                if(confirm("确认要废弃？")){
                                    $.when(promotionCmsExtcodeCodeCancelService.sendRequest({
                                        ids: this.str,
                                        state: this.state
                                    }))
                                        .done(function(result){
                                            alert(result.jsonMessage);
                                            window.location.reload();
                                        })


                                }
                            }

                        }
                    },
                    "getData": function() {
                        var tmpParams = {};
                        _.each(this.params, function(value, key, list) {
                            if(!!value) {
                                tmpParams[key] = value;
                            }
                        });
                        //tmpParams["status"] = 99;
                        var that = this;
                        //获取页面列表
                        $.when(promotionCmsExtcodeCodeManageListService.sendRequest(tmpParams))
                            .done(function(result) {
                                if(result.debugMessage!="nothing"&& result.jsonMessage!=""){
                                    var res= JSON.parse(result.jsonMessage).rs;
                                    $scope.renderObj =res;
                                }else{
                                    $scope.renderObj="";
                                }


                                //处理分页信息
                                $scope.pageCount = result.totalCount;
                                if(typeof($scope.pageCount)=='undefined'){
                                    that.pageTotal =1;
                                }else {
                                    that.pageTotal = Math.ceil(result.totalCount / that.pageSize);

                                }
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
                            this.params.page = this.pageTotal;
                            this.params.startNumber=Math.ceil((this.params.page-1)*this.pageSize)
                        }else{
                            this.params.page--;
                            this.params.startNumber=Math.ceil((this.params.page-1)*this.pageSize)
                        }
                        this.pageNum = this.params.page;
                        this.getData();
                    },
                    "next": function() {

                        if(Math.ceil($scope.pageCount/this.pageSize)==this.pageNum){
                            this.params.page=1;
                            this.params.startNumber=this.pageSize*(this.params.page-1)
                        }

                        if (this.pageNum == this.pageTotal) {
                            this.params.page = 1;

                        }else {
                            this.params.page++;
                            this.params.startNumber=this.pageSize*(this.params.page-1)

                        }

                        this.pageNum = this.params.page;

                        this.getData();
                    }
                }

                //$scope.searchPage.search();
                $scope.createActivity = {
                    "modal": $("#downloadModal"),
                    "open": function () {
                        this.modal.modal({});
                    },
                    "save": function() {
                        if($scope.searchPage.params.userEmail == null){
                            alert("请输入邮箱");
                            return;
                        }
                        this.modal.modal('hide');
                        this.export();
                        //this.page = this.oriPage;
                    },
                    export: function() {
                        this.phone=$scope.searchPage.params.phone;
                        this.userEmail=$scope.searchPage.params.userEmail;
                        this.activityId=$scope.searchPage.params.activityId;
                        this.name=$scope.searchPage.params.name;
                        $.when(promotionCmsExtcodeExportService.sendRequest({
                            "activityId":$scope.searchPage.params.activityId,
                            "name":$scope.searchPage.params.name,
                            "code":$scope.searchPage.params.code,
                            "orderSn":$scope.searchPage.params.orderSn,
                            "customerId":$scope.searchPage.params.customerId,
                            "phone":$scope.searchPage.params.phone,
                            "codeStatus":$scope.searchPage.params.codeStatus,
                            "useStartTime":$scope.searchPage.params.useStartTime,
                            "useEndTime":$scope.searchPage.params.useEndTime,
                            "userEmail":$scope.searchPage.params.userEmail
                        })).done(function(result) {
                            alert(result.value+"请到邮箱查看");
                            $scope.$apply();
                        })
                            .fail(function() {
                            })
                    }
                }

            }
        ]);

    });

