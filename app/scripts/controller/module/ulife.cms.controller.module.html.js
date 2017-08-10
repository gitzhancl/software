/**
 * Created by Ulife on 2015/12/24
 * @author zhangke
 */


define([
    'moment',
    'underscore',
    'ulife.cms.module.myApp',
    'ulife.cms.menu.config',

    'wangEditor',

    "ulife.cms.service.module",
    "ulife.cms.service.valid",
    "ulife.cms.service.authority",
    'ulife.cms.directive.wangEditor'
  ],
  function (moment, _, app, MenuConfig, wangEditor) {


    app.controller('HtmlModule', [
      '$scope',
      '$route',
      '$filter',
      'moduleService',
      'validService',
      'authorityService',
      function ($scope, $route, $filter, moduleService, validService) {

        /* $scope.editor = new wangEditor('wangEditor');
         $scope.editor.onchange = function () {
         $scope.editModule.moduleInfo.attr = this.$txt.html()
         // 编辑区域内容变化时，实时打印出当前内容
         console.log(this.$txt.html());
         }
         $scope.editor.create();*/
        $scope.menuConfig = MenuConfig.menu;

        $.when(moduleService.init()).done(function (returnObj) {
          $scope.editModule = returnObj;
          $scope.$apply();
        })


        $scope.editAttr = {
          "modal": $("#attrModal"),
          "open" : function () {
            this.modal.modal({});
          },
          "save" : function () {
            if (!validService.valid($scope.attrForm)) {
              return;
            }
            this.modal.modal('hide');
            $scope.editModule.saveAttr();

          }
        }
      }
    ]);
  });
