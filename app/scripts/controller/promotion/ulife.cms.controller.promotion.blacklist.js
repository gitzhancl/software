/**
 * Created by Ulife on 2016/1/15.
 */
/**
 * Created by zhangke on 2016/03/29
 */

define([
    'ulife.cms.module.myApp',
    'ulife.framework.services',
    'ulife.cms.business.config',
    'ulife.cms.menu.config',

    'ulife.api.promotion.blacklist.Import',
    'ulife.api.promotion.blacklist.addItem',
    'ulife.api.promotion.blacklist.deleteitems',
    'ulife.api.promotion.blacklist.export',
    'ulife.api.promotion.blacklist.save',
    'ulife.api.promotion.blacklist.get',
    'ulife.api.promotion.blacklist.getlist',

    'ulife.cms.directive.datetimepicker',
    'ulife.cms.directive.dateformat',

    "ulife.cms.service.authority",
    'ng-file-upload-all'
  ],
  function (app, services, BizConfig, MenuConfig,
            promotionBlacklistImport,
            promotionBlacklistAddItem,
            promotionBlacklistDeleteitems,
            promotionBlacklistExport,
            promotionBlacklistSave,
            promotionBlacklistGet,
            promotionBlacklistGetlist) {

    promotionBlacklistImport.injectTo(app);
    promotionBlacklistAddItem.injectTo(app);
    promotionBlacklistDeleteitems.injectTo(app);
    promotionBlacklistExport.injectTo(app);
    promotionBlacklistSave.injectTo(app);
    promotionBlacklistGet.injectTo(app);
    promotionBlacklistGetlist.injectTo(app);

    app.controller('PromotionBlacklist', ['$scope', '$location', '$route', '$filter',
      'promotionBlacklistImportService',
      'promotionBlacklistAddItemService',
      'promotionBlacklistDeleteitemsService',
      'promotionBlacklistExportService',
      'promotionBlacklistSaveService',
      'promotionBlacklistGetService',
      'promotionBlacklistGetlistService',
      'authorityService',

      function ($scope, $location, $route, $filter,
                promotionBlacklistImportService,
                promotionBlacklistAddItemService,
                promotionBlacklistDeleteitemsService,
                promotionBlacklistExportService,
                promotionBlacklistSaveService,
                promotionBlacklistGetService,
                promotionBlacklistGetlistService) {

        $scope.menuConfig = MenuConfig.menu;

        $scope.blackListStatus = [
          {'key': '无效', 'value': 0},
          {'key': '有效', 'value': 1}
        ]


        $.when(promotionBlacklistGetService.sendRequest({}))
          .done(function (result) {
            $scope.blacklist = result;
            $scope.$apply();

            $scope.searchPage.search();
          })
          .fail(function (code, msg) {
            alert(msg);
          });

        // upload on file select or drop
        $scope.upload = function (file) {
          var reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = function (e) {
            $scope.base64 = encodeURIComponent(e.target.result.replace(/data:(application\/vnd\.ms-excel)?;base64,/g, ""));

            $.when(promotionBlacklistImportService.sendRequest({
                blacklistId: $scope.blacklist.id,
                base64: $scope.base64
              }))
              .done(function (result) {
                if (!result.success) {
                  alert(result.message)
                }

                $scope.resultMessage = result.message;
                $scope.$apply();

                $scope.searchPage.search();
              })
              .fail(function (code, msg) {
                alert(msg);

                $scope.resultMessage = msg;
                $scope.$apply();

              });


          };
        };

        $scope.blacklistStatusChange = function () {
          $.when(promotionBlacklistSaveService.sendRequest({
              blacklistId: $scope.blacklist.id,
              status: $scope.blacklist.status
            }))
            .done(function (result) {
              if (!result.success) {
                alert(result.message)
              }

              $scope.resultMessage = result.message;
              $scope.$apply();
            })
            .fail(function (code, msg) {
              alert(msg);

              $scope.resultMessage = msg;
              $scope.$apply();

            });
        }

        $scope.save = function () {
          $.when(promotionBlacklistAddItemService.sendRequest({
              blacklistId: $scope.blacklist.id,
              items: $scope.addItemIds
            }))
            .done(function (result) {
              if (!result.success) {
                alert(result.message)
              }

              $scope.resultMessage = result.message;
              $scope.$apply();
              $scope.searchPage.search();

            })
            .fail(function (code, msg) {
              alert(msg);

              $scope.resultMessage = msg;
              $scope.$apply();

            });
        }

        $scope.delItems = function () {
          $.when(promotionBlacklistDeleteitemsService.sendRequest({
              blacklistId: $scope.blacklist.id,
              items: $scope.addItemIds
            }))
            .done(function (result) {
              if (!result.success) {
                alert(result.message)
              }

              $scope.resultMessage = result.message;
              $scope.$apply();
              $scope.searchPage.search();

            })
            .fail(function (code, msg) {
              alert(msg);

              $scope.resultMessage = msg;
              $scope.$apply();

            });
        }

        $scope.addItemsModal = {
          modal: $("#manualModal"),
          itemIds: "",
          open: function () {
            this.modal.modal({});
          },
          ok: function () {
            $scope.save();
          }
        }


        $scope.delItemsModal = {
          modal: $("#delItemsModal"),
          itemIds: "",
          open: function () {
            this.modal.modal({});
          },
          ok: function () {
            $scope.delItems();
          }
        }

        $scope.exportDialog = {

          open: function () {
            $("[role=dialog]").modal({});
          },
          exportBlacklist: function () {
            $.when(promotionBlacklistExportService.sendRequest({
                blacklistId: $scope.blacklist.id,
                mailAdress: $scope.exportEmail
              }))
              .done(function (result) {
                if (!result.success) {
                  alert(result.message)
                }

                $scope.resultMessage = result.message;
                $scope.$apply();
              })
              .fail(function (code, msg) {
                alert(msg);

                $scope.resultMessage = msg;
                $scope.$apply();

              });
          }

        }

        $scope.exportBlacklist = function () {
          $.when(promotionBlacklistExportService.sendRequest({
              blacklistId: $scope.blacklist.id,
              mailAdress: $scope.exportEmail
            }))
            .done(function (result) {
              if (!result.success) {
                alert(result.message)
              }

              $scope.resultMessage = result.message;
              $scope.$apply();
            })
            .fail(function (code, msg) {
              alert(msg);

              $scope.resultMessage = msg;
              $scope.$apply();

            });
        }


        $scope.searchPage = {
          "pageSize": 20,  //页大小
          "pageNum": 1,   //当前页码
          "pageTotal": 1,  //页面数量
          "pageCount": 1, //数据个数
          "pageShow": [],
          "params": {
            "itemId": null,
            "blacklistId": null,
            "page": 1,
            "rows": 10
          },
          "search": function () {
            this.params.rows = this.pageSize;
            this.params.page = 1;
            this.params.blacklistId = $scope.blacklist.id;
            this.getData();
          },
          "getData": function () {
            var tmpParams = {};
            _.each(this.params, function (value, key, list) {
              if (!!value) {
                tmpParams[key] = value;
              }
            });
            var that = this;
            //获取页面列表
            $.when(promotionBlacklistGetlistService.sendRequest(tmpParams))
              .done(function (result) {
                $scope.renderObj = result;

                //处理分页信息
                that.pageCount = result.count;
                that.pageTotal = Math.ceil(result.count / that.pageSize);

                $scope.$apply();
              })
              .fail(function () {
              })
          },
          "pre": function () {
            if (this.pageNum == 1) {
              this.params.page = this.pageTotal;
            } else {
              this.params.page--;
            }
            $scope.ids = [""];
            this.pageNum = this.params.page;
            this.getData();
          },
          "next": function () {
            if (this.pageNum >= this.pageTotal) {
              this.params.page = 1;
            } else {
              this.params.page++;
            }
            $scope.ids = [""];
            this.pageNum = this.params.page;
            this.getData();
          }
        }


      }
    ]);

  });

