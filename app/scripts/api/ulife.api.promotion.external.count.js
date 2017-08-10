// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.promotion.external.count',
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
      METHOD_NAME: 'promotion.external.count',
      SECURITY_TYPE: SecurityType.UserLogin.name,
      REQUIRED: [
        'status'
      ],
      PARAMETERS: {
        'status': 'int'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '20003': '优惠券数量获取失败'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('promotionExternalCountService', constructor);
    }
  }
});