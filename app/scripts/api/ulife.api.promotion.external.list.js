// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.promotion.external.list',
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
      METHOD_NAME: 'promotion.external.list',
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
      '20002': '优惠券列表获取失败'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('promotionExternalListService', constructor);
    }
  }
});