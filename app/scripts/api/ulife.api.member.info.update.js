// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.member.info.update',
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
      METHOD_NAME: 'member.info.update',
      SECURITY_TYPE: SecurityType.UserLogin.name,
      REQUIRED: [
      ],
      PARAMETERS: {
        'gender': 'int',
        'birthday': 'long',
        'nickName': 'string',
        'headIcon': 'string'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '40111': '用户不存在'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('memberInfoUpdateService', constructor);
    }
  }
});