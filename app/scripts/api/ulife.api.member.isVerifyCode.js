// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.member.isVerifyCode',
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
      METHOD_NAME: 'member.isVerifyCode',
      SECURITY_TYPE: SecurityType.None.name,
      REQUIRED: [
        'mobileNo',
        'vCode'
      ],
      PARAMETERS: {
        'mobileNo': 'string',
        'vCode': 'string'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '40112': '验证码错误',
      '40113': '验证码过期'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('memberIsVerifyCodeService', constructor);
    }
  }
});