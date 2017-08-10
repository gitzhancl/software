/**
 * Created by Ulife on 2016/1/15.
 */
/**
 * Created by Limf on 2015/12/15.
 */

define([
        'ulife.cms.module.myApp',
        'ulife.framework.services',
        'ulife.cms.business.config',
        'ulife.cms.menu.config',

        'ulife.api.promotion.source.getlist',
        'ulife.api.promotion.source.save',
        'ulife.api.role.dept.list',
        'ulife.cms.directive.datetimepicker',
        'ulife.cms.directive.datepicker',
        'ulife.cms.directive.dateformat',
        'ulife.cms.directive.tooltip',
        "ulife.cms.service.valid",
        "ulife.cms.service.authority"
    ],
    function(app, services, BizConfig, MenuConfig,promotionSourceGetlist,promotionSourceSave,roleDeptList) {

        promotionSourceGetlist.injectTo(app);
        promotionSourceSave.injectTo(app);
        roleDeptList.injectTo(app);

        app.controller('PromotionSourceListCtrl', ['$scope', '$location', '$route',
            'promotionSourceSaveService',
            'promotionSourceGetlistService',
            'roleDeptListService',
            'validService',
            'authorityService',

            function($scope, $location, $route,promotionSourceSaveService,  promotionSourceGetlistService,roleDeptListService,validService) {

                $scope.menuConfig = MenuConfig.menu;

                $scope.gotoPageEdit = function(index) {
                    $location.path('page/edit/' + index);
                }
                $scope.renderObj = {};

                $scope.deptList = [
                ];

                $scope.params ={
                    id : "0",
                    sourceName:"",
                    sourceCode:"",
                    depa_id:"0",
                    depa_name:""
                };
                $scope.app = false;
                $scope.pc = false;
                $scope.h5 = false;


                $scope.addSourceModal = {
                    "modal": $("#addSourceModal"),
                    "app":false,
                    "pc":false,
                    "h5":false,
                    "open": function (id) {
                        this.modal.modal({});
                        if(id){
                            $.when(promotionSourceGetlistService.sendRequest({"page":1,"rows":1,"id":id}))
                                .done(function(result) {
                                    var rendObj = result.promoSource[0];
                                    $scope.params.id = rendObj.id;
                                    $scope.params.sourceName = rendObj.sourceName;
                                    $scope.params.sourceCode = rendObj.sourceCode;
                                    $scope.params.depa_id = rendObj.departmentId;
                                    $scope.$apply();
                                })
                                .fail(function(msg,date) {
                                    alert(msg+date);
                                })
                        }else{
                            $scope.params.id = "0";
                            $scope.params.sourceName = "";
                            $scope.params.sourceCode = "";
                            $scope.params.depa_id=0;
                            $scope.app = false;
                            $scope.pc = false;
                            $scope.h5 = false;
                        }
                    },
                    "save": function() {
                        if($scope.params.depa_id == null || $scope.params.depa_id<=0 || $scope.params.sourceName == null || $scope.params.sourceName.trim() == ""||$scope.params.sourceCode == null || $scope.params.sourceCode.trim() == ""){
                            alert("缺少必填项！");
                            return;
                        }
                        var sourceCode=$scope.params.sourceCode.trim();
                        var reg=/^\w+$/;
                        if(sourceCode.length>16||!reg.test(sourceCode)){
                            alert("sourceCode 长度不能超过16个字符，不可包含中文或其他特殊字符，仅可为数字或英文");
                            return;
                        }
                        this.addPage();
                    },
                    addPage: function() {
                        $scope.params.id = parseInt($scope.params.id);
                        $scope.params.name = $scope.params.sourceName;
                        $scope.params.code = $scope.params.sourceCode;
                        $scope.params.depa_id = $scope.params.depa_id;

                        angular.forEach($scope.deptList, function (data) {
                            if($scope.params.depa_id==data.deviceId) {
                                $scope.params.depa_name = data.key
                            }
                        });

                        $.when(promotionSourceSaveService.sendRequest({
                            "id":$scope.params.id,
                            "name":$scope.params.name,
                            "code":$scope.params.code,
                            "depa_id":$scope.params.depa_id,
                            "depa_name":$scope.params.depa_name
                        })).done(function(result) {
                                if(result.success) {
                                    $("#addSourceModal").modal('hide');
                                    $scope.searchPage.search();
                                    $scope.$apply();
                                }
                                alert(result.message);
                            })
                            .fail(function(msg,date) {
                                alert(msg+date);
                            })
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
                        "sourceName": "",
                        "sourceCode": "",
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
                        $.when(promotionSourceGetlistService.sendRequest(tmpParams))
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

                $scope.initGroup = function () {
                    var tmpParams = {};
                    $.when(roleDeptListService.sendRequest(tmpParams))
                        .done(function(result) {
                            for(i=0;i<result.value.length;i++) {
                                angular.forEach(result.value[i].second, function (data) {
                                    $scope.deptList.push({'key': data.name, 'deviceId': data.id});
                                });
                            }
                            $scope.$apply();
                        })
                        .fail(function() {
                        })
                }

                $scope.initGroup();

                $scope.searchPage.search();



            }
        ]);

    });

