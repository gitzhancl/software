// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.promotion.voucher.verify',
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
      METHOD_NAME: 'promotion.voucher.verify',
      SECURITY_TYPE: SecurityType.UserLogin.name,
      REQUIRED: [
        'serialNo',
        'pwd'
      ],
      PARAMETERS: {
        'serialNo': 'string',
        'pwd': 'string'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '20022': '卡券兑换验证失败',
      '20023': '卡号或密码错误，请重新输入或联系客服',
      '20025': '该卡券已经提交过订单（请勿重复提交，如有疑问请联系客服）'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('promotionVoucherVerifyService', constructor);
    }
  }
});