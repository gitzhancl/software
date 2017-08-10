// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.order.DeliveryDates',
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
      METHOD_NAME: 'order.DeliveryDates',
      SECURITY_TYPE: SecurityType.UserLogin.name,
      REQUIRED: [
        'item_ids',
        'address_id'
      ],
      PARAMETERS: {
        'item_ids': 'string',
        'address_id': 'long'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '30093': '用户地址列表获取失败',
      '30094': '商品配送时间列表获取失败'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('orderDeliveryDatesService', constructor);
    }
  }
});