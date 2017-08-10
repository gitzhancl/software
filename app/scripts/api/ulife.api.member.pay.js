// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.member.pay',
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
      METHOD_NAME: 'member.pay',
      SECURITY_TYPE: SecurityType.UserLogin.name,
      REQUIRED: [
        'recharge_id',
        'channel_no'
      ],
      PARAMETERS: {
        'recharge_id': 'string',
        'recharge_activity_id': 'string',
        'channel_no': 'string',
        'openid': 'string',
        'return_url': 'string'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '40430': '用户信息获取失败',
      '40431': '用户余额获取失败',
      '40432': '用户扣款失败',
      '40433': '订单支付绑定优惠券信息失败',
      '40442': '充值服务暂时关闭！请更新APP版本',
      '40501': '用户充值列表异常',
      '40502': '用户充值列表导出异常',
      '40503': '用户充值明细列表异常'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('memberPayService', constructor);
    }
  }
});