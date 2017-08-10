// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.promotion.whitelist.export',
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
      METHOD_NAME: 'promotion.whitelist.export',
      SECURITY_TYPE: SecurityType.None.name,
      REQUIRED: [
        'id',
        'mailAdress'
      ],
      PARAMETERS: {
        'id': 'long',
        'mailAdress': 'string'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '21015': '导出白名单失败'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('promotionWhitelistExportService', constructor);
    }
  }
});