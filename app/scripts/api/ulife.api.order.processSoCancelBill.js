// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.order.processSoCancelBill',
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
      METHOD_NAME: 'order.processSoCancelBill',
      SECURITY_TYPE: SecurityType.UserLogin.name,
      REQUIRED: [
        'cancelBillNo'
      ],
      PARAMETERS: {
        'cancelBillNo': 'string'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '31001': '根据订单取消单据生成退款单据错误',
      '31002': '未找到取消单据',
      '31032': '回写&amp;处理订单退款单据参数错误',
      '31035': '生成退款单号出错',
      '31036': '不能重复生成退款单'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('orderProcessSoCancelBillService', constructor);
    }
  }
});