// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.order.logistics.tracking',
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
      METHOD_NAME: 'order.logistics.tracking',
      SECURITY_TYPE: SecurityType.None.name,
      REQUIRED: [
        'sale_no'
      ],
      PARAMETERS: {
        'sale_no': 'string',
        'ship_order_no': 'string'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('orderLogisticsTrackingService', constructor);
    }
  }
});