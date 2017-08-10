// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.order.getRefundBillList',
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
      METHOD_NAME: 'order.getRefundBillList',
      SECURITY_TYPE: SecurityType.None.name,
      REQUIRED: [
        'condition'
      ],
      PARAMETERS: {
        'condition': 'string',
        'page': 'int',
        'rows': 'int'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '31011': '获取订单退款单据列表错误'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('orderGetRefundBillListService', constructor);
    }
  }
});