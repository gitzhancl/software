/**
 * Created by Ulife on 2015/12/31.
 */
define([
    'ulife.cms.module.myApp',
    'jquery',
    'moment',
    'store'
  ],
  function(app, $, moment, store) {
    app.directive('ulifeBtnAu', ['$rootScope', function($rootScope) {
      return {
        restrict: 'A',
        scope: true,
        compile: function(tElement, tAttrs, transclude) {
          return {
            pre: function preLink(scope, iElement, iAttr, controller) {
              var isShow = false;
              var auList = store.get("cms_" + window.location.hash);
              _.each(auList, function(au) {
                if (au.buttonName == iAttr.ulifeBtnAu) {
                  isShow = true;
                } else if (au.buttonName == iAttr.title){
                  isShow = true;
                }
              })

              if (isShow) {
                iElement.removeClass("hide")
              } else {
                iElement.addClass("hide")
              }
            },
            post: function postLink(scope, iElement, iAttr, controller) {
              
            }
          }
        }
      };
    }]);
  });
