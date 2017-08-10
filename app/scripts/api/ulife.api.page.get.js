// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.page.get',
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
      METHOD_NAME: 'page.get',
      SECURITY_TYPE: SecurityType.None.name,
      REQUIRED: [
        'type'
      ],
      PARAMETERS: {
        'type': 'int',
        'id': 'int'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '30101': '无效的 type 值',
      '30102': '页面没有找到'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('pageGetService', constructor);
    }
  }
});