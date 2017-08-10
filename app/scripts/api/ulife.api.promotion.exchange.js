// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.promotion.exchange',
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
      METHOD_NAME: 'promotion.exchange',
      SECURITY_TYPE: SecurityType.UserLogin.name,
      REQUIRED: [
        'code'
      ],
      PARAMETERS: {
        'code': 'string'
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
      '20021': '您的操作太频繁了，请休息下'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('promotionExchangeService', constructor);
    }
  }
});