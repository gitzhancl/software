// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.cart.clean',
  [
    'ulife.framework.services',
    'ulife.api.security.type',

    'ulife.framework.comm'
  ],
function(services, SecurityType, Comm) {
  'use strict';


  var constructor = ['$q',
    function($q) {
      return new Comm($q, {
      METHOD_NAME: 'cart.clean',
      SECURITY_TYPE: SecurityType.None.name,
      REQUIRED: [
        'items'
      ],
      PARAMETERS: {
        'items': 'string'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '10091': '购物车清除失败，参数错误请重新勾选添加'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('cartCleanService', constructor);
    }
  }
});