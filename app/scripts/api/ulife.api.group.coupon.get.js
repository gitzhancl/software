// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.group.coupon.get',
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
      METHOD_NAME: 'group.coupon.get',
      SECURITY_TYPE: SecurityType.UserLogin.name,
      REQUIRED: [
        'activityId',
        'couponCode'
      ],
      PARAMETERS: {
        'activityId': 'long',
        'couponCode': 'string'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '31002': '未找到取消单据',
      '31003': '参数错误！',
      '31004': '用户不存在！',
      '31005': '记录不存在！',
      '31020': '很遗憾！您未抢到此券！',
      '31021': '获取退款单据详情错误'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('groupCouponGetService', constructor);
    }
  }
});