// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.common.sms',
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
      METHOD_NAME: 'common.sms',
      SECURITY_TYPE: SecurityType.None.name,
      REQUIRED: [
        'mobileNo',
        'smsContext'
      ],
      PARAMETERS: {
        'mobileNo': 'string',
        'smsContext': 'string'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '40061': '手机号码格式错误',
      '40117': '短信发送太频繁',
      '40118': '短信类型不存在'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('commonSmsService', constructor);
    }
  }
});