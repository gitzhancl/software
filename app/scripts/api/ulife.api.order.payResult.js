// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.order.payResult',
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
      METHOD_NAME: 'order.payResult',
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
      '30063': '支付失败',
      '30064': '支付失败创建退款单错误',
      '30065': '支付失败更新订单支付记录失败',
      '30066': '支付失败更新订单记录失败',
      '30088': '订单支付绑定优惠券信息失败'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('orderPayResultService', constructor);
    }
  }
});