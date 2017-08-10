/**
 * Created by Ulife on 2016/4/25.
 */
/**
 * Created by Yujc on 2016/04/25
 */

define([
        'ulife.cms.module.myApp',
        'ulife.framework.services',
        'ulife.cms.business.config',
        'ulife.cms.menu.config',

        'ulife.api.product.cms.queryFrontCategory',
        'ulife.api.product.cms.enableFrontCategory',
        'ulife.api.product.cms.disableFrontCategory',

        'ulife.cms.directive.datetimepicker',
        'ulife.cms.directive.dateformat',

        "ulife.cms.service.authority",
        'ng-file-upload-all'
    ],
    function (app, services, BizConfig, MenuConfig,
        productCmsQueryFrontCategoryService,
        productCmsEnableFrontCategoryService,
        productCmsDisableFrontCategoryService) {

        productCmsQueryFrontCategoryService.injectTo(app);
        productCmsEnableFrontCategoryService.injectTo(app);
        productCmsDisableFrontCategoryService.injectTo(app);

        app.controller('ProductCategorylistCtrl', ['$scope', '$location', '$route', '$filter',
            'productCmsQueryFrontCategoryService',
            'productCmsEnableFrontCategoryService',
            'productCmsDisableFrontCategoryService',
            'authorityService',

            function ($scope, $location, $route, $filter,
                productCmsQueryFrontCategoryService,
                productCmsEnableFrontCategoryService,
                productCmsDisableFrontCategoryService
                ) {
                    //alert($);
                    $scope.menuConfig = MenuConfig.menu;
                    $scope.CategoryData ={};
                    $scope.isActive = true;
                    $scope.togger = true;
                    var arr = {'terminal':'1'};
                    var temp = {cmsCategoryQueryRequest:JSON.stringify(arr)};
                    /**
                     * @description 切换标签加载H5或者PC页面
                     * @author Yujc
                     */
                    $scope.queryTerminal = function(val){
                        arr = {'terminal':val};
                        temp = {cmsCategoryQueryRequest:JSON.stringify(arr)};
                        if(val === '1'){
                            $scope.isActive = true;
                        }else{
                            $scope.isActive = false;
                        }

                        $scope.loadData(temp);
                    };

                    $scope.changeOpenCategory = function(itemID){
                        $.when(productCmsEnableFrontCategoryService.sendRequest({'categoryId':itemID}))
                        .done(function(data){
                            if(data.isSuccess){
                                alert('类目启用成功');
                                $scope.loadData(temp);
                            }
                        })
                        .fail(function(code, msg){
                            alert(msg);
                            alert(code);
                        })
                    }

                    $scope.changeCloseCategory = function(itemID){
                        $.when(productCmsDisableFrontCategoryService.sendRequest({'categoryId':itemID}))
                        .done(function(data){
                            if(data.isSuccess){
                                alert('类目禁用成功');
                                $scope.loadData(temp);
                            }
                        })
                        .fail(function(code, msg){
                            alert(msg);
                            alert(code);
                        })
                    }
                   /**
                     * @description 从服务端获取商品分类信息
                     * @param {int}temp 1=pc 6=h5
                     * @author Yujc
                     */
                    $scope.loadData = function(temp){
                        $.when(productCmsQueryFrontCategoryService.sendRequest(temp))
                        .done(function(data){
                            $scope.CategoryData = data.cmsCategoryList;

                            $scope.$apply();
                        })
                        .fail(function(code, msg){
                            alert(msg);
                            alert(code);
                        });
                    }
                    $scope.loadData(temp);

                    /**
                     * @description  是否启用商品类目
                     * @param
                     * @author Yujc
                     */
                    $scope.toggleEnable = function(ev){
                        var target=ev.target;
                        var isEnable = $(target).parent().parent().attr('isEnable');
                        var id = $(target).parent().parent().attr('data-categoryId');
                        console.log(target);
                        if(isEnable == '1'){
                           if(confirm("确定禁止该类目？")){
                            $scope.changeCloseCategory(id);
                           }
                        }else{
                            if(confirm("确定启用该类目？")){
                                $scope.changeOpenCategory(id);
                           }
                        }
                        //confirm("确定要清空数据吗？")
                    }
                    /**
                     * @description  跳转编辑页面
                     * @param
                     * @author Yujc
                     */
                    $scope.gotoPageEdit = function(ev) {
                        var target = ev.target;
                        var index = $(target).parent().siblings('.produceId').html();
                        var level = $(target).parent().siblings('.lev').html();
                        var terminal = '';
                        if($('.pc').length > 0){
                            terminal =  1;
                        }else{
                            terminal =  6;
                        }
                        $location.path('productCategory/edit/' + index+'/'+level+'/'+terminal);
                    };

                    $scope.gotoNewEdit = function(ev) {
                        var target = ev.target;
                        var index = $(target).parent().siblings('.produceId').html();
                        var level = parseInt($(target).parent().siblings('.lev').html()) + 1 ;
                        var terminal = '';
                        if($('.pc').length > 0){
                            terminal =  1;
                        }else{
                            terminal =  6;
                        }
                        $location.path('productCategory/edit/' + index+'/'+level+'/'+terminal+'?news');
                    };

                    $scope.newFatherCatagory = function(){
                        var terminal = '';
                        if($('.pc').length > 0){
                            terminal =  1;
                        }else{
                            terminal =  6;
                        }
                        $location.path('productCategory/edit/0/1/'+terminal);
                    }


            }
        ]);
/**
 * @description 过滤数据显示，将1显示是，0显示否
 * @param
 * @author Yujc
 */
app.filter("reverse",function(){
                return function(input){
                    var out = "";
                    if(input =='1'){
                        out = '禁用'
                    }else{
                        out="启用"
                    }
                    return out;
                }
            });

/**
 * @description 过滤数据显示，将1输出levelone，2输出leveltwo,3输出levelthird
 * @param
 * @author Yujc
 */
app.filter("level",function(){
                return function(input){
                    var out = "";
                    if(input =='1'){
                        out = 'levelone'
                    }else if(input =='2'){
                        out="leveltwo"
                    }else{
                        out="levelthird"
                    }
                    return out;
                }
            });
/**
 * @description 过滤数据显示，将1输出removerone，2输出removetwo,3输出removethird
 * @param
 * @author Yujc
 */
app.filter("hideRemove",function(){
                return function(input){
                    var out = "";
                    if(input =='1'){
                        out = 'removerone'
                    }else if(input =='2'){
                        out="removetwo"
                    }else{
                        out="removethird"
                    }
                    return out;
                }
            });

app.filter("bottomColor",function(){
                return function(input){
                    var out = "";
                    if(input =='1'){
                        out = 'btn-warning';
                    }else if(input =='0'){
                        out= 'btn-success';
                    }
                    return out;
                }
            });
    });
