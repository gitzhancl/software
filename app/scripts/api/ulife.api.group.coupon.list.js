// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.group.coupon.list',
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
      METHOD_NAME: 'group.coupon.list',
      SECURITY_TYPE: SecurityType.None.name,
      REQUIRED: [
      ],
      PARAMETERS: {
        'page': 'int',
        'rows': 'int'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '20004': '优惠券兑换失败',
      '20008': '不存在该优惠券',
      '20009': '优惠券已被绑定',
      '20010': '优惠券已过期',
      '20013': '优惠券已领完',
      '20014': '此优惠券您已领取过',
      '20021': '您的操作太频繁了，请休息下',
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
      app.factory('groupCouponListService', constructor);
    }
  }
});