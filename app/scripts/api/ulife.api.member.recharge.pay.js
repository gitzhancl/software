// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.member.recharge.pay',
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
      METHOD_NAME: 'member.recharge.pay',
      SECURITY_TYPE: SecurityType.UserLogin.name,
      REQUIRED: [
        'sale_no'
      ],
      PARAMETERS: {
        'sale_no': 'string',
        'channel_no': 'string',
        'openid': 'string',
        'return_url': 'string'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '40111': '用户不存在',
      '40501': '用户充值列表异常',
      '40502': '用户充值列表导出异常',
      '40503': '用户充值明细列表异常'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('memberRechargePayService', constructor);
    }
  }
});