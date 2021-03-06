// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.hybrid.add',
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
      METHOD_NAME: 'hybrid.add',
      SECURITY_TYPE: SecurityType.None.name,
      REQUIRED: [
        'hybridConfig'
      ],
      PARAMETERS: {
        'hybridConfig': 'string'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '30905': '操作失败！',
      '30906': '参数错误！',
      '30907': 'hybrid配置不存在'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('hybridAddService', constructor);
    }
  }
});