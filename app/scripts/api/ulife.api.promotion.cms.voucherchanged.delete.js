// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.promotion.cms.voucherchanged.delete',
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
      METHOD_NAME: 'promotion.cms.voucherchanged.delete',
      SECURITY_TYPE: SecurityType.None.name,
      REQUIRED: [
        'id'
      ],
      PARAMETERS: {
        'id': 'string'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '22011': '导出外部CODE失败'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('promotionCmsVoucherchangedDeleteService', constructor);
    }
  }
});