// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.promotion.calculate',
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
      METHOD_NAME: 'promotion.calculate',
      SECURITY_TYPE: SecurityType.UserLogin.name,
      REQUIRED: [
        'id',
        'totalAmount',
        'shipFee',
        'items'
      ],
      PARAMETERS: {
        'id': 'long',
        'totalAmount': 'double',
        'shipFee': 'double',
        'items': 'string'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '20001': '不存在该优惠券',
      '20007': '优惠券计算错误'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('promotionCalculateService', constructor);
    }
  }
});