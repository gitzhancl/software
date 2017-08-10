// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.member.balance.deduct',
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
      METHOD_NAME: 'member.balance.deduct',
      SECURITY_TYPE: SecurityType.UserLogin.name,
      REQUIRED: [
        'orderNo',
        'soHeaderId',
        'amount'
      ],
      PARAMETERS: {
        'orderNo': 'string',
        'soHeaderId': 'long',
        'amount': 'double',
        'serialNumber': 'string'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '40111': '用户不存在',
      '40120': '获取账户信息失败！',
      '40121': '账户余额不足！',
      '40123': '不能重复提交请求！'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('memberBalanceDeductService', constructor);
    }
  }
});