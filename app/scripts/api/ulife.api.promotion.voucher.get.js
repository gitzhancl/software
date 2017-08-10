// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.promotion.voucher.get',
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
      METHOD_NAME: 'promotion.voucher.get',
      SECURITY_TYPE: SecurityType.UserLogin.name,
      REQUIRED: [
        'serialNo'
      ],
      PARAMETERS: {
        'serialNo': 'string'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '20026': '卡券信息获取失败'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('promotionVoucherGetService', constructor);
    }
  }
});