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

        'ulife.api.product.cms.frontCategoryDetail',
        'ulife.api.product.cms.getBasicCategoriesByParentId',
        'ulife.api.product.cms.createOrUpdateFrontCategory',
        'ulife.api.search.previewPercolate',

        'ulife.cms.directive.datetimepicker',
        'ulife.cms.directive.dateformat',
        "ulife.cms.service.authority",

        'ng-file-upload-all'
    ],
    function (app, services, BizConfig, MenuConfig, 
        productCmsFrontCategoryDetailService,
        productCmsGetBasicCategoriesByParentIdService,
        productCmsCreateOrUpdateFrontCategoryService,
        searchPreviewPercolateService) {

        productCmsFrontCategoryDetailService.injectTo(app);
        productCmsGetBasicCategoriesByParentIdService.injectTo(app);
        productCmsCreateOrUpdateFrontCategoryService.injectTo(app);
        searchPreviewPercolateService.injectTo(app);

        app.controller('ProductCategoryEditCtrl', ['$scope', '$location', '$route', '$filter',
            'productCmsFrontCategoryDetailService',
            'productCmsGetBasicCategoriesByParentIdService',
            'productCmsCreateOrUpdateFrontCategoryService',
            'searchPreviewPercolateService',
            'authorityService',

            function ($scope, $location, $route, $filter,
                productCmsFrontCategoryDetailService,
                productCmsGetBasicCategoriesByParentIdService,
                productCmsCreateOrUpdateFrontCategoryService,
                searchPreviewPercolateService
                ) {
                    $scope.CategoryDetail = {};
                    var pageId = $route.current.params.id;
                    $scope.level = $route.current.params.level;
                    var terminal = $route.current.params.terminal.split('?')[0];
                    var itemsNew = $route.current.params.terminal.split('?')[1];
                    //console.log(itemsNew);
                    if(terminal == "1"){
                        $scope.terminal = "pc"
                    }else if(terminal == '6'){
                        $scope.terminal = "H5/APP"
                    }                    
                                      

                    /**
                     * 判断新建or编辑及相关操作
                     * @param  {[type]} pageId !             [description]
                     * @return {[type]}        [description]
                     */
                    if(itemsNew == 'news'){
                        $scope.CategoryDetail.parentId = pageId;
                        pageId = 0;
                    };

                    if(pageId != 0 && itemsNew != 'news'){
                        $.when(productCmsFrontCategoryDetailService.sendRequest({'id':pageId}))
                        .done(function(data){
                                $scope.CategoryDetail = data;
                                $scope.$apply();                                                
                        })
                        .fail(function(code, msg){
                                alert(msg);
                                alert(code);
                            });
                    }
                    

                    /**
                     *页面加载直接获取一级前台类目
                     */
                    $.when(productCmsGetBasicCategoriesByParentIdService.sendRequest({'parentId':0}))
                    .done(function(data){                        
                            $scope.BasicFirstCategory = data.value;
                            $scope.$apply();                                                
                    })
                    .fail(function(code, msg){
                            alert(msg);
                            alert(code);
                        });

                    //alert(pageId);
                   // $scope.menuConfig = MenuConfig.menu;  
                   /**
                    * 获取二级前台类目
                    * @param  {[type]} x [description]
                    */
                    $scope.firstBasicCate = function(x){
                        var id = x.basicCategoryId;
                        //alert(x);
                        $.when(productCmsGetBasicCategoriesByParentIdService.sendRequest({'parentId':id}))
                        .done(function(data){
                                $scope.BasicSecondCategory = data.value;
                                $scope.$apply();                                               
                        })
                        .fail(function(code, msg){
                                alert(msg);
                                alert(code);
                        });
                   }
                   /**
                    * 获取三级前台类目
                    * @param {[type]} x selectedName
                    */
                   $scope.SecondBasicCate = function(x){
                    var id = x.basicCategoryId;
                    $.when(productCmsGetBasicCategoriesByParentIdService.sendRequest({'parentId':id}))
                    .done(function(data){
                            $scope.BasicThirdCategory = data.value;
                            $scope.$apply();
                            //console.log($scope.BasicSecondCategory);                                                
                    })
                    .fail(function(code, msg){
                            alert(msg);
                            alert(code);
                        });
                   };

                   /**
                    * 添加前台关联类目
                    * @param {[type]} obj [description]
                    */
                    $scope.addBase = function(obj){
                        if(obj){
                            if(typeof($scope.CategoryDetail.basicCategories) == 'undefined'){
                                $scope.CategoryDetail.basicCategories = [];
                                $scope.CategoryDetail.basicCategories.push(obj);
                            }else{
                                $scope.CategoryDetail.basicCategories.push(obj);
                            }
                            
                        }                        
                   };
                   /**
                    * 删除前台关联类类目
                    * @param  {[type]} items [description]
                    * @return {[type]}       [description]
                    */
                   $scope.removeBase = function(items){
                        //console.log(items);
                        //console.log($scope.CategoryDetail.basicCategories.indexOf(items));
                        var index = $scope.CategoryDetail.basicCategories.indexOf(items); 
                        $scope.CategoryDetail.basicCategories.splice(index,1);
                    }; 
                   /**
                    * 保存商品类目信息
                    * @return {[type]} [description]
                    */
                   $scope.save = function(){
                        if($scope.CategoryDetail.name && $scope.CategoryDetail.sort && $scope.CategoryDetail.keywordStr){
                            var Categories = {};
                            var arr = [];
                            if($('.baseicInfo').length > 0){
                                $scope.CategoryDetail.basicCategories.forEach(function(e){
                                arr.push(e.basicCategoryId);
                                });
                                Categories.name = $scope.CategoryDetail.name;
                                Categories.keywords = $scope.CategoryDetail.keywordStr.replace(/，/g, ",");;
                                Categories.parentId = $('#parentId').val();
                                Categories.level = $scope.level;
                                Categories.sort = $scope.CategoryDetail.sort;
                                Categories.terminal = ($scope.terminal=='pc')?1:6;
                                Categories.basicCategoryIds = arr.join(',');
                                Categories.icon = $scope.CategoryDetail.icon;
                                Categories.id = pageId;

                                $.when(productCmsCreateOrUpdateFrontCategoryService.sendRequest({'category':JSON.stringify(Categories)}))
                                .done(function(data){
                                    if(data.isSuccess){
                                        alert('保存成功');
                                        window.location.href = '/index.html#/productCategory/list';
                                    }else{
                                        alert(data.reason);
                                    }
                                })
                                .fail(function(code, msg){
                                    alert(msg);
                                    alert(code);
                                });
                            }else{
                                alert('请关联后台类目');
                            }                                      
                        }
                        
                   };
                   /**
                    * 预览前台相关商品
                    * @return {[type]} [description]
                    */
                    $scope.viewProduct = function(){
                        if($('.baseicInfo').length > 0){
                            if(pageId == 0){
                                alert('新建类目不能预览，请到编辑页面预览');
                            }else{
                                var ProductData = {};
                                var arr = [];
                                $scope.CategoryDetail.basicCategories.forEach(function(e){
                                    arr.push(e.basicCategoryId);
                                });
                                ProductData.basicCategoryIds = arr;
                                ProductData.keywords = $scope.CategoryDetail.keywordStr.split();
                                ProductData.id = pageId;

                                $.when(searchPreviewPercolateService.sendRequest({'percolateRequest':JSON.stringify(ProductData)}))
                                .done(function(data){
                                    $scope.percolateService = data.result;
                                    if(data.result.length ==0){
                                        alert('没有匹配商品');
                                    }
                                    $scope.$apply();
                                })
                                .fail(function(code, msg){
                                    alert(msg);
                                    alert(code);
                                });                                
                            }
                        }else{
                            alert('请关联后台类目！！')
                        }                         
                    }                        
            }
        ]);

    })

