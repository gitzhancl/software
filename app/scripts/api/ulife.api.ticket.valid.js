// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.ticket.valid',
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
      METHOD_NAME: 'ticket.valid',
      SECURITY_TYPE: SecurityType.UserLogin.name,
      REQUIRED: [
        'serialNo',
        'pwd'
      ],
      PARAMETERS: {
        'serialNo': 'string',
        'pwd': 'string'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '-101': '',
      '38100': '券号或密码错误，请重新输入，或联系客服',
      '38110': '您输入券号已兑换，请确认后输入',
      '38120': '您的券号未激活，请确认后输入，或联系客服'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('ticketValidService', constructor);
    }
  }
});