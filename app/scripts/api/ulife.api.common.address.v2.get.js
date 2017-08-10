// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.common.address.v2.get',
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
      METHOD_NAME: 'common.address.v2.get',
      SECURITY_TYPE: SecurityType.UserLogin.name,
      REQUIRED: [
        'addressType'
      ],
      PARAMETERS: {
        'addressId': 'long',
        'addressType': 'int'
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
      app.factory('commonAddressV2GetService', constructor);
    }
  }
});