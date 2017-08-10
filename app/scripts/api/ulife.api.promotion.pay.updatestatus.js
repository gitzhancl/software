// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.promotion.pay.updatestatus',
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
      METHOD_NAME: 'promotion.pay.updatestatus',
      SECURITY_TYPE: SecurityType.None.name,
      REQUIRED: [
        'promoId',
        'orderNo',
        'status'
      ],
      PARAMETERS: {
        'promoId': 'long',
        'orderNo': 'string',
        'status': 'int'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '20029': '银行支付优惠使用状态更新异常'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('promotionPayUpdatestatusService', constructor);
    }
  }
});