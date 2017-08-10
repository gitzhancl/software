// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.order.create',
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
      METHOD_NAME: 'order.create',
      SECURITY_TYPE: SecurityType.UserLogin.name,
      REQUIRED: [
        'address_id',
        'items',
        'pay_type'
      ],
      PARAMETERS: {
        'address_id': 'int',
        'coupon_self_id': 'string',
        'coupon_provider_id': 'string',
        'coupon_shipfree_id': 'string',
        'ship_date': 'long',
        'items': 'string',
        'pay_type': 'string',
        'cartversion': 'int'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '30003': '地址不存在',
      '30011': '生成订单失败',
      '30012': '库存异常',
      '30014': '获取配送日期失败',
      '30016': '解析购物车商品失败',
      '30017': '解析购物车使用优惠失败',
      '30018': '优惠券使用失败',
      '30019': '生成订单号失败',
      '30020': '商品服务',
      '30030': '库存不足提示(实际消息见运行时)',
      '30093': '用户地址列表获取失败',
      '30095': '购物车获取商品信息失败',
      '30096': '用户优惠券列表获取失败',
      '30097': '优惠券计算失败',
      '31065': '由于春节假期物流调整,可配送时间截止2017年1月24日。祝您新春愉快！'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('orderCreateService', constructor);
    }
  }
});