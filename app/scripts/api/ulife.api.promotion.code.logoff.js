// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.promotion.code.logoff',
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
      METHOD_NAME: 'promotion.code.logoff',
      SECURITY_TYPE: SecurityType.UserLogin.name,
      REQUIRED: [
        'id',
        'orderNo'
      ],
      PARAMETERS: {
        'id': 'long',
        'orderNo': 'string'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '20017': '注销优惠券失败'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('promotionCodeLogoffService', constructor);
    }
  }
});