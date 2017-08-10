// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.promotion.last.count',
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
      METHOD_NAME: 'promotion.last.count',
      SECURITY_TYPE: SecurityType.None.name,
      REQUIRED: [
        'code'
      ],
      PARAMETERS: {
        'code': 'string'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '20001': '不存在该优惠券',
      '20030': '获取优惠券剩余数量失败'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('promotionLastCountService', constructor);
    }
  }
});