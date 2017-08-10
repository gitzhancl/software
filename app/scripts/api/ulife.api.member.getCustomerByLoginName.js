// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.member.getCustomerByLoginName',
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
      METHOD_NAME: 'member.getCustomerByLoginName',
      SECURITY_TYPE: SecurityType.None.name,
      REQUIRED: [
        'login_name'
      ],
      PARAMETERS: {
        'login_name': 'string'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '40050': '传入参数值错误（为空，长度...类型不符）',
      '40111': '用户不存在'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('memberGetCustomerByLoginNameService', constructor);
    }
  }
});