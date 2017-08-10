/**
 * Created by Ulife on 2016/10/09
 * @author Yu
 */
define([
    'moment',
    'underscore',
    'ulife.cms.module.myApp',
    'ulife.cms.menu.config',

    "ulife.cms.service.module",
    "ulife.cms.service.valid",
    "ulife.cms.service.authority"
  ],
  function (moment, _, app, MenuConfig) {

    app.controller('FloorsH5V2Module', [
      '$scope',
      '$route',
      '$filter',
      'moduleService',
      'validService',
      'authorityService',
      function ($scope, $route, $filter, moduleService, validService) {

        $scope.menuConfig = MenuConfig.menu;
        $scope.Tops = [
            {key:'0', value:'0'},
            {key:'10', value:'10'}
        ];

        $.when(moduleService.init()).done(function (returnObj) {
          angular.extend(returnObj.contentHandle, {
            oriContent: {},
            content: {}
          })
          $scope.editModule = returnObj;
          //楼层组件高度默认值
          if($scope.editModule.moduleInfo.attr){
              $scope.editModule.moduleInfo.attr.top = $scope.editModule.moduleInfo.attr.top ? $scope.editModule.moduleInfo.attr.top : $scope.Tops[1].value;
              $scope.editModule.moduleInfo.attr.flagTriangle = $scope.editModule.moduleInfo.attr.flagTriangle ? $scope.editModule.moduleInfo.attr.flagTriangle : '1';
          }else{
              $scope.editModule.moduleInfo.attr = {
                  top:$scope.Tops[1].value,
                  flagTriangle: '1'
              };
          }
          $scope.$apply();

          var itemIds = [];
          _.each($scope.editModule.moduleInfo.content, function (item) {
            itemIds.push(item.itemId);
          });

          $.when($scope.editModule.getProdcutListInfo(itemIds))
            .done(function (result) {
              var products = result.result;

              _.each(products, function (product) {
                _.each($scope.editModule.moduleInfo.content, function(eProduct) {
                  if (eProduct.itemId == product.id) {
                    eProduct.stock = product.stock;
                  }
                })
              });

              $scope.$apply();
            })

        })


        $scope.editAttr = {
          "modal": $("#attrModal"),
          "open": function () {
            this.modal.modal({});
          },
          "save": function () {
            if (!validService.valid($scope.attrForm)) {
              return;
            }
            this.getImgWH($scope.editModule.moduleInfo.attr.image);
            this.modal.modal('hide');
            $scope.editModule.saveAttr();
          },
          "getImgWH":function(sImgUrl){
              var returnimgurl;
              var imgsrc;
              var img = new Image();
              var imgurl = sImgUrl;
              img.src = imgurl;
              if(!/uwidth/.test(imgurl) && !/uheight/.test(imgurl)){
                  imgsrc = imgurl;
                  imgsrc += /\?/.test(imgurl) ? '&' : '?';
                  img.onload = function(){
                      returnimgurl = imgsrc + 'uwidth=' + img.width + '&uheight=' + img.height;
                      $scope.editModule.moduleInfo.attr.image = returnimgurl;
                      $scope.$apply();
                      $scope.editModule.saveAttr();
                  };
                  img.onerror = function(){
                      console.log('图片不存在');
                  };
              }else{
                  $scope.editModule.saveAttr();
              }
          }
        }

        $scope.editContent = {
          "dialog": {
            "moduleInfoContentModal": $("#contentModal"),
            "open": function () {
              this.moduleInfoContentModal.modal({});
            },
            "close": function () {
              this.moduleInfoContentModal.modal('hide');
            }
          },
          "add": function () {
            $scope.editModule.contentHandle.add();
            this.dialog.open();

          },
          "edit": function (index) {
            $scope.editModule.contentHandle.edit(index);
            this.dialog.open();
          },
          "save": function () {
            if (!validService.valid($scope.contentForm)) {
              return;
            }
            $scope.editModule.contentHandle.save();
            this.dialog.close();
          },
          "delete": function (index) {
            $scope.editModule.contentHandle.delete(index);
          },
          "getProductInfo": function (data) {
            $.when($scope.editModule.getProdcutListInfo([data.itemId]))
              .done(function (result) {
                var product = result.result[0];
                if(product){
                    data.title = product.title;
                    data.image = product.image;
                    data.price = product.retailPrice;
                    data.stock = product.stock;
                }else{
                    console.log('没有匹配到相关商品');
                }
              })

          }
        }


        $scope.editListContent = {
          "itemIds": '',
          "dialog": {
            "moduleInfoContentModal": $("#contentListModal"),
            "open": function () {
              this.moduleInfoContentModal.modal({});
            },
            "close": function () {
              this.moduleInfoContentModal.modal('hide');
            }
          },
          "add": function () {
            var that = this;
            that.itemIds = '';
            _.each($scope.editModule.moduleInfo.content, function (item) {
              that.itemIds += item.itemId + ',';
            });
            that.itemIds = that.itemIds.substr(0, that.itemIds.length - 1);
            this.dialog.open();

          },
          "save": function () {
            if (!validService.valid($scope.contentListForm)) {
              return;
            }

            $scope.editModule.contentHandle.clear();
            var itemIds = this.itemIds.split(',');

            $.when($scope.editModule.getProdcutListInfo(itemIds))
              .done(function (result) {
                var products = result.result;
                var tempContentArr = [];
                var tempProductMap = {};

                _.each(products, function (product) {
                  tempProductMap[product.id] = {
                    'itemId': product.id,
                    'title': product.title,
                    'image': product.image,
                    'price': product.retailPrice,
                    'stock': product.stock
                  }
                });
                _.each(itemIds, function(itemId){
                  if (tempProductMap[itemId]) {
                    tempContentArr.push(tempProductMap[itemId])
                  }
                })
                $scope.editModule.contentHandle.save(tempContentArr);

                this.dialog.close();
              }).fail(function () {
              alert("商品数据拉取失败！");
            });


          }
        }
      }
    ]);
  });
