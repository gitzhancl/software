define(
  [
    'ulife.cms.module.myApp',
    'moment',
    'underscore',
    'ulife.api.cms.page.getModule',
    'ulife.api.cms.page.updateModule',
    'ulife.api.cms.page.getModuleContent',
    'ulife.api.cms.page.updateModuleContent',
    'ulife.api.product.get',
    'ulife.api.product.list',
    'ulife.api.search.searchItem',
    'ulife.api.cms.page.get',
    'ulife.api.ticket.get',

    'ulife.cms.directive.module.sortable',
    'ulife.cms.directive.module.seledepartment',
    'ulife.cms.directive.datetimepicker',
    'ulife.cms.directive.tooltip',
    'ulife.cms.directive.dateformat'
  ],
  function (app, moment, _, getModulePage, updateModulePage, getModuleContentPage, updateModuleContentPage, productGet, productList, searchItem, getPage, getTicket) {

    getModulePage.injectTo(app);
    updateModulePage.injectTo(app);
    getModuleContentPage.injectTo(app);
    updateModuleContentPage.injectTo(app);
    productGet.injectTo(app);
    productList.injectTo(app);
    searchItem.injectTo(app);
    getPage.injectTo(app);
    getTicket.injectTo(app);

    app.factory('moduleService', [
      '$route',
      '$filter',
      'cmsPageGetModuleService',
      'cmsPageUpdateModuleService',
      'cmsPageGetModuleContentService',
      'cmsPageUpdateModuleContentService',
      'productGetService',
      'productListService',
      'searchSearchItemService',
      'cmsPageGetService',
      'ticketGetService',
      function ($route, $filter, cmsPageGetModuleService, cmsPageUpdateModuleService, cmsPageGetModuleContentService, cmsPageUpdateModuleContentService, productGetService, productListService, searchSearchItemService ,cmsPageGetService, ticketGetService) {
        var returnObj = {
          "databindingId": null,
          "moduleInfo": {
            attr: "",
            content: ""
          },
          "attrHandle": {},
          "contentHandle": {
            "action": "add",
            "oriContent": {},
            "content": {},
            'length': 0,
            "save": function (newContent) {
              if (this.action == "add") {
                if (!angular.isArray(returnObj.moduleInfo.content)) {
                  returnObj.moduleInfo.content = [];
                }
                //将编辑区的 content push 进去
                returnObj.moduleInfo.content.push(angular.copy(this.content));
              }

              if (newContent && angular.isArray(newContent)) {
                returnObj.moduleInfo.content = newContent;
              }

              this.content = angular.copy(this.oriContent);

              returnObj.saveContent();
            },
            "delete": function (index) {
              returnObj.moduleInfo.content.splice(index, 1);
              returnObj.saveContent();
            },
            "add": function () {
              this.action = "add";
              this.content = angular.copy(this.oriContent);

            },
            "edit": function (index) {
              this.action = "edit";
              this.content = returnObj.moduleInfo.content[index];
            },
            'clear': function () {
              returnObj.moduleInfo.content = [];
            }
          },

          "saveContent": function () {
            var that = this;
            $.when(cmsPageUpdateModuleContentService.sendRequest({
              id: that.databindingId,
              content: angular.toJson(that.moduleInfo.content)
            })).done(function () {

              //that.contentHandle.length = angular.isArray(returnObj.moduleInfo.content) ? returnObj.moduleInfo.content.length : 0;
              window.location.reload();
            }).fail(function () {
              alert("坑位数据操作失败！");
            })
          },
          "saveAttr": function () {
            var that = this;
            $.when(cmsPageUpdateModuleService.sendRequest({
              id: that.databindingId,
              attr: angular.toJson(that.moduleInfo.attr)
            })).fail(function () {
              alert("属性数据操作失败！");
            })
          },
          "sortContent": {
            "startIndex": 0,
            "endIndex": 0,
            "sort": function () {
              //step1: 以下情况不排序（只有一个的时候，  moduleInfo.content不存在或不为数组时）
              if ((this.startIndex === this.endIndex)
                || !returnObj.moduleInfo
                || !returnObj.moduleInfo.content
                || !angular.isArray(returnObj.moduleInfo.content)) {
                return false;
              }
              //step2: 拿到要移动的模块
              var targetItem = returnObj.moduleInfo.content[this.startIndex];
              returnObj.moduleInfo.content.splice(this.startIndex, 1);

              //step3: 组合成新的数组
              var preArr = returnObj.moduleInfo.content.slice(0, this.endIndex);
              var nextArr = returnObj.moduleInfo.content.slice(this.endIndex, returnObj.moduleInfo.content.length);
              preArr.push(targetItem);
              returnObj.moduleInfo.content = preArr.concat(nextArr);
              //returnObj.$apply();

              //step4: 保存数据
              returnObj.saveContent();
            }
          },
          "getProdcutInfo": function (itemId) {
            var def = $.Deferred();

            // 获得page 相关的 module 信息
            $.when(productGetService.sendRequest({
              id: itemId
            })).done(function (productDetail) {
              def.resolve(productDetail);
            }).fail(function (errorInfo) {
              def.reject(errorInfo);
            })

            return def.promise();
          },
          "getProdcutListInfo": function (itemIds) {
            var def = $.Deferred();
            var quest = {
                productids : itemIds,
                page: 1,
                rows: 999
            }
            var requestdata = JSON.stringify(quest);
            // 获得page 相关的 module 信息
            $.when(searchSearchItemService.sendRequest({request:requestdata}))
            .done(function (result) {
              def.resolve(result);
            }).fail(function (errorInfo) {
              def.reject(errorInfo);
            })

            return def.promise();
          },
          "getGiftListInfo" : function(itemIds){
            var def = $.Deferred();
            $.when(ticketGetService.sendRequest({"id":itemIds}))
            .done(function(result){
              def.resolve(result);
            })
            .fail(function(errorInfo){
              def.reject(errorInfo);
            })

            return def.promise();
          }
        }

        return {
          "init": function () {
            returnObj.databindingId = $route.current.params.id;
            var pageId = $route.current.params.pageId;
            var def = $.Deferred();

            // 获得page 相关的 module 信息
            $.when(cmsPageGetModuleService.sendRequest({
              id: returnObj.databindingId
            }), cmsPageGetService.sendRequest({
              "pageId": pageId
            })).done(function (moduleInfo, pageInfo) {
              if (moduleInfo.attr) {
                moduleInfo.attr = JSON.parse(moduleInfo.attr)
              }
              if (moduleInfo.content) {
                moduleInfo.content = JSON.parse(moduleInfo.content)
              }
              returnObj.moduleInfo = moduleInfo;
              returnObj.pageInfo = pageInfo;

              returnObj.contentHandle.length = angular.isArray(returnObj.moduleInfo.content) ? returnObj.moduleInfo.content.length : 0;

              def.resolve(returnObj);
            }).fail(function () {
              def.reject(returnObj);
            })

            return def.promise();
          }
        }
      }
    ]);
  });
