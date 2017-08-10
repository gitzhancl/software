// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.common.imageCode.verifyAndSendSms',
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
      METHOD_NAME: 'common.imageCode.verifyAndSendSms',
      SECURITY_TYPE: SecurityType.None.name,
      REQUIRED: [
        'vCode',
        'mobileNo',
        'smsContext'
      ],
      PARAMETERS: {
        'vCode': 'string',
        'mobileNo': 'string',
        'smsContext': 'string'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '40212': '图片验证码成功,短信发送失败！'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('commonImageCodeVerifyAndSendSmsService', constructor);
    }
  }
});