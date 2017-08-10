// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.order.cancel',
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
      METHOD_NAME: 'order.cancel',
      SECURITY_TYPE: SecurityType.UserLogin.name,
      REQUIRED: [
        'sale_no'
      ],
      PARAMETERS: {
        'sale_no': 'string'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '30001': '不存在该订单',
      '30002': '订单状态不正确',
      '30015': '退款异常'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('orderCancelService', constructor);
    }
  }
});