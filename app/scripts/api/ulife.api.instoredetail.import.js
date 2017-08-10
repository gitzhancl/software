// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.instoredetail.import',
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
      METHOD_NAME: 'instoredetail.import',
      SECURITY_TYPE: SecurityType.UserLogin.name,
      REQUIRED: [
        'inStoreId',
        'base64'
      ],
      PARAMETERS: {
        'inStoreId': 'long',
        'base64': 'string'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '62001': '不存在该入库单'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('instoredetailImportService', constructor);
    }
  }
});