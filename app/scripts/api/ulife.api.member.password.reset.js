// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.member.password.reset',
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
      METHOD_NAME: 'member.password.reset',
      SECURITY_TYPE: SecurityType.None.name,
      REQUIRED: [
        'mobileNo',
        'vCode',
        'newPassword'
      ],
      PARAMETERS: {
        'mobileNo': 'string',
        'vCode': 'string',
        'newPassword': 'string'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '40026': '重置密码失败',
      '40112': '验证码错误',
      '40116': '此帐号未注册'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('memberPasswordResetService', constructor);
    }
  }
});