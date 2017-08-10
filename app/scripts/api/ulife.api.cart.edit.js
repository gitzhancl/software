// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.cart.edit',
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
      METHOD_NAME: 'cart.edit',
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
      '10086': '购物车修改失败'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('cartEditService', constructor);
    }
  }
});