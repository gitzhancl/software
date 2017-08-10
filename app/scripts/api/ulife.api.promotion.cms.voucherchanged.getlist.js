// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.promotion.cms.voucherchanged.getlist',
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
      METHOD_NAME: 'promotion.cms.voucherchanged.getlist',
      SECURITY_TYPE: SecurityType.None.name,
      REQUIRED: [
      ],
      PARAMETERS: {
        'name': 'string',
        'moblie': 'string',
        'serialNo': 'string',
        'voucherName': 'string',
        'start': 'long',
        'end': 'long',
        'page': 'int',
        'rows': 'int'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '22010': '导出外部CODE失败'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('promotionCmsVoucherchangedGetlistService', constructor);
    }
  }
});