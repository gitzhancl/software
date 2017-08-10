// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.promotion.pay.calculate',
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
      METHOD_NAME: 'promotion.pay.calculate',
      SECURITY_TYPE: SecurityType.None.name,
      REQUIRED: [
        'channelNo',
        'orderNo',
        'totalAmount'
      ],
      PARAMETERS: {
        'channelNo': 'string',
        'orderNo': 'string',
        'totalAmount': 'double'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '20028': '银行支付优惠计算异常'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('promotionPayCalculateService', constructor);
    }
  }
});