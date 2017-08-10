// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.member.balance.recharge',
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
      METHOD_NAME: 'member.balance.recharge',
      SECURITY_TYPE: SecurityType.UserLogin.name,
      REQUIRED: [
        'cardNo',
        'password'
      ],
      PARAMETERS: {
        'cardNo': 'string',
        'password': 'string'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '40102': '福利卡不能充值',
      '40103': '该卡已被他人绑定过',
      '40104': '该卡没有激活',
      '40105': '该卡不在有效期内',
      '40106': '该卡余额为0！',
      '40108': '卡号或者密码错误！',
      '40111': '用户不存在'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('memberBalanceRechargeService', constructor);
    }
  }
});