// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.order.getRefundBill',
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
      METHOD_NAME: 'order.getRefundBill',
      SECURITY_TYPE: SecurityType.None.name,
      REQUIRED: [
        'refundBillNo'
      ],
      PARAMETERS: {
        'refundBillNo': 'string'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '31021': '获取退款单据详情错误',
      '31022': '未找到订单退款单据'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('orderGetRefundBillService', constructor);
    }
  }
});