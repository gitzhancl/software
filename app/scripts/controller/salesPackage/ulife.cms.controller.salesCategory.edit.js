define([
        'ulife.cms.module.myApp',
        'ulife.framework.services',
        'ulife.cms.business.config',
        'ulife.cms.menu.config',

        'ulife.api.ticket.category.list',
        'ulife.api.ticket.category.mainedit',
        'ulife.api.ticket.cms.getDetail',

        'ulife.cms.directive.datepicker',
        'ulife.cms.directive.tooltip',
        "ulife.cms.service.valid",
        'ulife.cms.directive.dateformat',
        "ulife.cms.service.authority"

    ],
    function (app, services, BizConfig, MenuConfig, ticketCategoryList, ticketCategoryEdit,ticketDetail) {

        ticketCategoryList.injectTo(app);
        ticketCategoryEdit.injectTo(app);
        ticketDetail.injectTo(app);

        app.filter('categoryH5', function () {
            return function (val) {
                switch (val) {
                    case 1 :
                        return '';
                    case 2 :
                        return 'H5';
                }
            }
        });

        app.filter('categoryPc', function () {
            return function (val) {
                switch (val) {
                    case 1 :
                        return '';
                    case 2 :
                        return 'PC';
                }
            }
        });

        app.controller('SalesCategoryEditCtrl', ['$scope', '$location', '$route',
            'ticketCategoryListService', 'ticketCategoryMaineditService','ticketCmsGetDetailService','authorityService',

            function ($scope, $location, $route, ticketCategoryListService, ticketCategoryMaineditService,ticketCmsGetDetailService,authorityService) {


                $scope.menuConfig = MenuConfig.menu;

                $scope.renderObj = {};

                $scope.params = {
                    "categoryName":'',
                    "showPc":true,
                    "showH5":true,
                    "categoryIconUrl":'',
                    "sortNumber":"1",
                    "ticketIds":'',
                    "ticketArr":[],
                    "ticketList":[],
                    "validDesc":"启用",
                    "otherMsg":"",
                    "recId":-1
                };

                $scope.recId = $route.current.params.id;

                if($location.url().indexOf('edit') > 0){
                    $scope.title = "修改"

                    $scope.params.action = 'find';
                    $scope.params.showPc = 0;
                    $scope.params.showH5 = 0;
                    $scope.params.sortNumber = 1;
                    $scope.params.validDesc = '';
                    $scope.params.recId = $scope.recId;


                    //获取页面列表
                    $.when(ticketCategoryMaineditService.sendRequest($scope.params))
                        .done(function (result) {
                            //console.log(JSON.parse(result.message));

                            var categoryData = JSON.parse(result.message);

                            $scope.params.categoryName = categoryData.main.categoryName;
                            if (categoryData.main.showPc == 1){
                                $scope.params.showPc = true;
                            }else {
                                $scope.params.showPc = false;
                            }

                            if (categoryData.main.showH5 == 1){
                                $scope.params.showH5 = true;
                            }else {
                                $scope.params.showH5 = false;
                            }
                            $scope.params.sortNumber = categoryData.main.sort;
                            $scope.params.validDesc = categoryData.main.remark;
                            $scope.params.categoryIconUrl = categoryData.main.categoryIconUrl;
                            //$scope.params.ticketList = categoryData.sub;

                            var ticketCon = categoryData.sub;

                            for (var i = 0;i < ticketCon.length;i++){
                                var ticketId = ticketCon[i].ticketId;
                                $.when(ticketCmsGetDetailService.sendRequest({id:ticketId},true,false))
                                    .done(function (result) {
                                        //$scope.params.ticketIds += ticketId + ",";

                                        $scope.params.ticketList.push (result);

                                        $scope.params.ticketArr.push (ticketId);

                                        $scope.$apply();
                                    })
                                    .fail(function () {

                                    })
                            }

                            $scope.$apply();
                        })
                        .fail(function () {

                        })
                }

                $scope.removeValue = function(arr, val){
                    for(var i=0; i<arr.length; i++) {
                        if(arr[i] == val) {
                            arr.splice(i, 1);
                            break;
                        }
                    }
                    return arr;
                }


                $scope.removeList = function(arr,obj) {
                    for (var i = 0; i < arr.length; i++) {
                        var temp = arr[i];
                        if (!isNaN(obj)) {
                            temp = i;
                        }
                        if (temp == obj) {
                            for (var j = i; j < arr.length; j++) {
                                arr[j] = arr[j + 1];
                            }
                            arr.length = arr.length - 1;
                        }
                    }

                    return arr;
                }


                $scope.repeat = function(arr){
                    var res = [];
                    var json = {};
                    for(var i = 0; i < arr.length; i++){
                        if(!json[arr[i]]){
                            res.push(arr[i]);
                            json[arr[i]] = 1;
                        }
                    }
                    return res;
                },



                $scope.btn = {
                    'addPackage':function(){
                        var that = this;

                        if ($scope.params.ticketId){

                            if ($scope.params.ticketArr.length > 0){
                                for (var a = 0; a < $scope.params.ticketArr.length; a++){
                                    if ($scope.params.ticketArr[a] == $scope.params.ticketId){
                                        alert("不能添加重复的票券");
                                        return;
                                    }
                                }
                            }
                            //获取页面列表
                            $.when(ticketCmsGetDetailService.sendRequest({id:$scope.params.ticketId}))
                                .done(function (result) {

                                    console.log($scope.params.ticketArr);

                                    //$scope.params.ticketIds += $scope.params.ticketId + ",";

                                    $scope.params.ticketArr.push (Number($scope.params.ticketId));

                                    $scope.params.ticketList.push (result);

                                    $scope.$apply();
                                })
                                .fail(function(err, msg){
                                    alert(msg);
                                    console.log(msg);
                                })
                        }else {
                            alert('请填写券号');
                        }

                    },

                    'deleteTicket':function(event){
                        var target=event.target;
                        var ticketId = $(target).attr('ticketId');
                        var index = $(target).attr('index');
                        $(target).parents("tr").remove();

                        if ($scope.params.ticketArr.length >= 1){
                            $scope.params.ticketList = $scope.removeList($scope.params.ticketList,index);
                            //$scope.params.ticketIds = $scope.removeValue($scope.params.ticketIds.split(','),ticketId);
                            //for (var i = 0; i < $scope.removeValue($scope.params.ticketIds.split(','),ticketId).length;i++){
                            //    $scope.params.ticketIds += $scope.removeValue($scope.params.ticketIds.split(','),ticketId)[i];
                            //}

                            $scope.params.ticketArr = $scope.removeValue($scope.params.ticketArr,ticketId);
                        }else {
                            $scope.params.ticketList = [];
                            $scope.params.ticketIds = '';
                            $scope.params.ticketAttr = [];
                        }


                        //alert($scope.params.ticketIds);

                        //alert($scope.params.ticketList);
                    },

                    'save':function(){
                        if (!$scope.params.categoryName){
                            alert("请输入类目名称");
                            return;
                        }

                        if (!$scope.params.showPc && $scope.params.categoryIconUrl){
                            alert("请选择终端PC");
                            return;
                        }else if ($scope.params.showPc && !$scope.params.categoryIconUrl){
                            alert("请输入类目图标");
                            return;
                        }

                        if (!$scope.params.sortNumber){
                            alert("请输入排序序号");
                            return;
                        }

                        if ($scope.params.ticketArr.length <= 0){
                            alert("请添加券号");
                            return;
                        }

                        if ($scope.params.ticketList == "" || $scope.params.ticketList == null){
                            alert("请添加券号");
                            return;
                        }

                        if($location.url().indexOf('edit') > 0){
                            $scope.params.action = 'edit';
                        }else {
                            $scope.params.action = 'save';
                        }


                        //alert($scope.params.ticketIds.substring(0,$scope.params.ticketIds.length-1))
                        for (var i = 0;i< $scope.params.ticketArr.length;i++){
                            $scope.params.ticketIds += $scope.params.ticketArr[i] + ",";
                        }

                        $scope.params.ticketIds = $scope.params.ticketIds.substring(0,$scope.params.ticketIds.length-1);
                        if ($scope.params.showPc == true){
                            $scope.params.showPc = 1;
                        }else {
                            $scope.params.showPc = 0;
                        }

                        if ($scope.params.showH5 == true){
                            $scope.params.showH5 = 1;
                        }else {
                            $scope.params.showH5 = 0;
                        }



                        //获取页面列表
                        $.when(ticketCategoryMaineditService.sendRequest($scope.params))
                            .done(function (result) {
                                //console.log(result);
                                if($location.url().indexOf('edit') > 0){
                                    //location.reload();
                                    window.location = "/index.html#/salesCategory/list";
                                }else {
                                    window.location = "/index.html#/salesCategory/list";
                                }

                                $scope.$apply();
                            })
                            .fail(function(err, msg){
                                alert(msg);
                                console.log(msg);
                            })
                    }
                }
            }
        ]);

    });

