// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.order.cms.OrderCancel',
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
      METHOD_NAME: 'order.cms.OrderCancel',
      SECURITY_TYPE: SecurityType.None.name,
      REQUIRED: [
        'sale_no'
      ],
      PARAMETERS: {
        'sale_no': 'string',
        'operator_id': 'long',
        'operation_type': 'int',
        'cancel_type': 'string',
        'cancel_reason': 'string',
        'cancel_remark': 'string',
        'is_need_refund': 'int'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '30001': '不存在该订单',
      '30002': '订单状态不正确',
      '30013': '订单取消参数不正确'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('orderCmsOrderCancelService', constructor);
    }
  }
});