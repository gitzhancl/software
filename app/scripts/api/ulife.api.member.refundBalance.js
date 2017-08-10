// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.member.refundBalance',
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
      METHOD_NAME: 'member.refundBalance',
      SECURITY_TYPE: SecurityType.UserLogin.name,
      REQUIRED: [
        'sale_no',
        'serialNumber'
      ],
      PARAMETERS: {
        'sale_no': 'string',
        'serialNumber': 'string'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '40510': '用户Id不存在',
      '40511': '用户服务操作余额退款失败'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('memberRefundBalanceService', constructor);
    }
  }
});