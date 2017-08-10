// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.promotion.batchuser.Import',
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
      METHOD_NAME: 'promotion.batchuser.Import',
      SECURITY_TYPE: SecurityType.None.name,
      REQUIRED: [
        'base64'
      ],
      PARAMETERS: {
        'base64': 'string'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '21032': '导入批量投放用户失败'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('promotionBatchuserImportService', constructor);
    }
  }
});