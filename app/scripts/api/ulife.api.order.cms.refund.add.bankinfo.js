// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.order.cms.refund.add.bankinfo',
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
      METHOD_NAME: 'order.cms.refund.add.bankinfo',
      SECURITY_TYPE: SecurityType.UserLogin.name,
      REQUIRED: [
        'refundBillNo',
        'name',
        'bankNo',
        'belongToBank'
      ],
      PARAMETERS: {
        'refundBillNo': 'string',
        'name': 'string',
        'bankNo': 'string',
        'belongToBank': 'string',
        'bankBranch': 'string',
        'remark': 'string'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '31022': '未找到订单退款单据',
      '31038': '操作人不能为空',
      '31039': '字段不能为空',
      '31040': '银行卡号不是纯数字',
      '31041': '余额或平台支付不需要登记银行卡信息'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('orderCmsRefundAddBankinfoService', constructor);
    }
  }
});