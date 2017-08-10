// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.member.balance.partialPayCancel',
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
      METHOD_NAME: 'member.balance.partialPayCancel',
      SECURITY_TYPE: .name,
      REQUIRED: [
        'sale_no',
        'customer_id',
        'refund_amount',
        'order_channel'
      ],
      PARAMETERS: {
        'sale_no': 'string',
        'customer_id': 'long',
        'refund_amount': 'double',
        'order_channel': 'string'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('memberBalancePartialPayCancelService', constructor);
    }
  }
});