// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.member.login',
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
      METHOD_NAME: 'member.login',
      SECURITY_TYPE: SecurityType.None.name,
      REQUIRED: [
        'userName',
        'password'
      ],
      PARAMETERS: {
        'userName': 'string',
        'password': 'string',
        'wxOpenId': 'string'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '40001': '编辑卷号生成单错误',
      '40072': '用户名不存在',
      '40073': '密码错误',
      '40401': '您好！您的账号存在安全风险，已被限制登录！如有疑问，请联系客服：400-687-9090'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('memberLoginService', constructor);
    }
  }
});