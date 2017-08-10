// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.common.email',
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
      METHOD_NAME: 'common.email',
      SECURITY_TYPE: SecurityType.None.name,
      REQUIRED: [
        'mail_Type',
        'priority',
        'addressList',
        'subject',
        'content'
      ],
      PARAMETERS: {
        'mail_Type': 'int',
        'priority': 'int',
        'addressList': 'string',
        'subject': 'string',
        'content': 'string'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '40081': 'Email邮件格式有误',
      '40082': '邮件发送失败，未知错误'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('commonEmailService', constructor);
    }
  }
});