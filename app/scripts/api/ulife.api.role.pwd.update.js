// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.role.pwd.update',
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
      METHOD_NAME: 'role.pwd.update',
      SECURITY_TYPE: SecurityType.UserLogin.name,
      REQUIRED: [
        'loginName',
        'originalPwd',
        'validPwd'
      ],
      PARAMETERS: {
        'loginName': 'string',
        'originalPwd': 'string',
        'validPwd': 'string'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '30109': '操作失败！',
      '30111': '记录不存在！',
      '30113': '用户名或密码错误！',
      '30114': '该用户已被禁用！',
      '30117': '原密码错误！'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('rolePwdUpdateService', constructor);
    }
  }
});