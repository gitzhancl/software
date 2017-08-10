// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.instore.list',
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
      METHOD_NAME: 'instore.list',
      SECURITY_TYPE: SecurityType.UserLogin.name,
      REQUIRED: [
      ],
      PARAMETERS: {
        'inStoreNo': 'string',
        'codeNo': 'string',
        'codeName': 'string',
        'codeId': 'long',
        'codePrefix': 'string',
        'status': 'int',
        'createStart': 'long',
        'createEnd': 'long',
        'confirmStart': 'long',
        'confirmEnd': 'long',
        'page': 'int',
        'rows': 'int'
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
      app.factory('instoreListService', constructor);
    }
  }
});