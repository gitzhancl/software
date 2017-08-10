// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.stock.deduct',
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
      METHOD_NAME: 'stock.deduct',
      SECURITY_TYPE: .name,
      REQUIRED: [
        'bugs'
      ],
      PARAMETERS: {
        'bugs': 'string'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '10004': '参数格式错误',
      '10005': '参数为空值'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('stockDeductService', constructor);
    }
  }
});