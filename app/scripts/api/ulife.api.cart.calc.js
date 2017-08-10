// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.cart.calc',
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
      METHOD_NAME: 'cart.calc',
      SECURITY_TYPE: SecurityType.None.name,
      REQUIRED: [
        'items'
      ],
      PARAMETERS: {
        'items': 'string',
        'cartversion': 'int'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '10093': '购物车key错误,两个ID都是NULL'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('cartCalcService', constructor);
    }
  }
});