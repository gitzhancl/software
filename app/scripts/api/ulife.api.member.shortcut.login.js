// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.member.shortcut.login',
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
      METHOD_NAME: 'member.shortcut.login',
      SECURITY_TYPE: SecurityType.None.name,
      REQUIRED: [
      ],
      PARAMETERS: {
        'openId': 'string',
        'loginChannel': 'int',
        'code': 'string',
        'unionId': 'string'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '40001': '编辑卷号生成单错误',
      '40111': '用户不存在',
      '40112': '验证码错误',
      '40113': '验证码过期',
      '40310': '获取微信用户标识失败',
      '40401': '您好！您的账号存在安全风险，已被限制登录！如有疑问，请联系客服：400-687-9090',
      '40410': '参数错误',
      '40411': '密码不能少于6位'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('memberShortcutLoginService', constructor);
    }
  }
});