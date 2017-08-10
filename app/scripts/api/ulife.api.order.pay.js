// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.order.pay',
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
      METHOD_NAME: 'order.pay',
      SECURITY_TYPE: SecurityType.UserLogin.name,
      REQUIRED: [
        'sale_no'
      ],
      PARAMETERS: {
        'sale_no': 'string',
        'channel_no': 'string',
        'card_type': 'string',
        'is_balance': 'boolean',
        'openid': 'string',
        'return_url': 'string'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '30061': '订单状态不可支付',
      '30062': '支付请求失败',
      '30063': '支付失败',
      '30088': '订单支付绑定优惠券信息失败',
      '30090': '用户扣款失败',
      '30091': '用户信息获取失败',
      '30098': '用户余额获取失败'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('orderPayService', constructor);
    }
  }
});