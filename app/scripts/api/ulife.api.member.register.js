// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.member.register',
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
      METHOD_NAME: 'member.register',
      SECURITY_TYPE: SecurityType.None.name,
      REQUIRED: [
        'userName',
        'password',
        'vCode'
      ],
      PARAMETERS: {
        'userName': 'string',
        'password': 'string',
        'vCode': 'string'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '40061': '手机号码格式错误',
      '40112': '验证码错误',
      '40113': '验证码过期',
      '40114': '手机号被占用',
      '40115': '注册失败'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('memberRegisterService', constructor);
    }
  }
});