// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.promotion.whitelist.Import',
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
      METHOD_NAME: 'promotion.whitelist.Import',
      SECURITY_TYPE: SecurityType.None.name,
      REQUIRED: [
        'actid',
        'id',
        'base64'
      ],
      PARAMETERS: {
        'actid': 'long',
        'id': 'long',
        'base64': 'string'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '21016': '导入白名单失败'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('promotionWhitelistImportService', constructor);
    }
  }
});