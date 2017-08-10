// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.member.recharge.payResult',
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
      METHOD_NAME: 'member.recharge.payResult',
      SECURITY_TYPE: SecurityType.None.name,
      REQUIRED: [
      ],
      PARAMETERS: {
        'Amount': 'double',
        'OrderId': 'string',
        'SerialNumber': 'long',
        'TxSerialNumber': 'string',
        'BankSerialNumber': 'string',
        'OrderType': 'string',
        'MerchantId': 'string'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '40425': '该充值活动不存在',
      '40503': '用户充值明细列表异常',
      '40504': '用户充值明细列表异常',
      '40505': '支付失败更新订单支付记录失败'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('memberRechargePayResultService', constructor);
    }
  }
});