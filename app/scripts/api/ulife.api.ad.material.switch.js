// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.ad.material.switch',
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
      METHOD_NAME: 'ad.material.switch',
      SECURITY_TYPE: SecurityType.None.name,
      REQUIRED: [
        'id',
        'status'
      ],
      PARAMETERS: {
        'id': 'long',
        'status': 'int'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '30109': '操作失败！'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('adMaterialSwitchService', constructor);
    }
  }
});