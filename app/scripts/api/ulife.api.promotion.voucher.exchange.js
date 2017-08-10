// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.promotion.voucher.exchange',
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
      METHOD_NAME: 'promotion.voucher.exchange',
      SECURITY_TYPE: SecurityType.UserLogin.name,
      REQUIRED: [
        'serialNo',
        'pwd',
        'addressId',
        'shipDate',
        'productId'
      ],
      PARAMETERS: {
        'serialNo': 'string',
        'pwd': 'string',
        'addressId': 'long',
        'shipDate': 'long',
        'remark': 'string',
        'productId': 'long'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '20022': '卡券兑换验证失败',
      '20024': '提交失败（请稍后再试或联系客服）',
      '20025': '该卡券已经提交过订单（请勿重复提交，如有疑问请联系客服）'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('promotionVoucherExchangeService', constructor);
    }
  }
});