// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.promotion.externalcode.get',
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
      METHOD_NAME: 'promotion.externalcode.get',
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
      '20018': '获取外部优惠券信息失败'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('promotionExternalcodeGetService', constructor);
    }
  }
});