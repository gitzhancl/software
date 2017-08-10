// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.promotion.code.export',
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
      METHOD_NAME: 'promotion.code.export',
      SECURITY_TYPE: SecurityType.None.name,
      REQUIRED: [
        'mailAdress'
      ],
      PARAMETERS: {
        'id': 'long',
        'code': 'string',
        'customer_id': 'long',
        'login_name': 'string',
        'status': 'string',
        'mailAdress': 'string'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '21012': '导出券码失败'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('promotionCodeExportService', constructor);
    }
  }
});