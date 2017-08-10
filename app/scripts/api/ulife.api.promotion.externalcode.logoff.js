// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.promotion.externalcode.logoff',
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
      METHOD_NAME: 'promotion.externalcode.logoff',
      SECURITY_TYPE: SecurityType.None.name,
      REQUIRED: [
        'code',
        'useShop',
        'orderSn',
        'brandName'
      ],
      PARAMETERS: {
        'code': 'string',
        'useShop': 'string',
        'orderSn': 'string',
        'brandName': 'string'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '20019': '注销外部优惠券失败'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('promotionExternalcodeLogoffService', constructor);
    }
  }
});