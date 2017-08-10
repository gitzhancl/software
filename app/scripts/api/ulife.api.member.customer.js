// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.member.customer',
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
      METHOD_NAME: 'member.customer',
      SECURITY_TYPE: SecurityType.None.name,
      REQUIRED: [
      ],
      PARAMETERS: {
        'customerId': 'string'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '40111': '用户不存在',
      '40119': '生成订单号失败！'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('memberCustomerService', constructor);
    }
  }
});