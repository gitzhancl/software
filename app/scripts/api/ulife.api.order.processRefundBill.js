// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.order.processRefundBill',
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
      METHOD_NAME: 'order.processRefundBill',
      SECURITY_TYPE: SecurityType.UserLogin.name,
      REQUIRED: [
        'refundBillNo'
      ],
      PARAMETERS: {
        'refundBillNo': 'string',
        'data': 'string'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '31022': '未找到订单退款单据',
      '31031': '回写&amp;处理订单退款单据错误',
      '31032': '回写&amp;处理订单退款单据参数错误'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('orderProcessRefundBillService', constructor);
    }
  }
});