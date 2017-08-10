// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.member.address.get',
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
      METHOD_NAME: 'member.address.get',
      SECURITY_TYPE: SecurityType.UserLogin.name,
      REQUIRED: [
      ],
      PARAMETERS: {
        'addressId': 'long'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '40033': '获取会员收货地址详细失败',
      '40111': '用户不存在'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('memberAddressGetService', constructor);
    }
  }
});