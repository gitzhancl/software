// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.order.modify',
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
      METHOD_NAME: 'order.modify',
      SECURITY_TYPE: SecurityType.UserLogin.name,
      REQUIRED: [
        'sale_no',
        'address_id'
      ],
      PARAMETERS: {
        'sale_no': 'string',
        'date': 'long',
        'address_id': 'string'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '30001': '不存在该订单',
      '30005': '商品不存在',
      '30014': '获取配送日期失败',
      '30071': '订单没有收货信息',
      '30093': '用户地址列表获取失败',
      '31033': '很抱歉，30分钟修改时间已过',
      '31034': '货到付款不能选择崇明地区'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('orderModifyService', constructor);
    }
  }
});