// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.order.calculate',
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
      METHOD_NAME: 'order.calculate',
      SECURITY_TYPE: SecurityType.UserLogin.name,
      REQUIRED: [
        'items'
      ],
      PARAMETERS: {
        'items': 'string',
        'coupon_self_id': 'string',
        'coupon_provider_id': 'string',
        'coupon_shipfree_id': 'string',
        'cartversion': 'int'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '30016': '解析购物车商品失败',
      '30017': '解析购物车使用优惠失败',
      '30095': '购物车获取商品信息失败',
      '30096': '用户优惠券列表获取失败',
      '30097': '优惠券计算失败'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('orderCalculateService', constructor);
    }
  }
});