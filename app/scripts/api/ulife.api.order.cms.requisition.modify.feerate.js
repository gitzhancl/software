// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.order.cms.requisition.modify.feerate',
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
      METHOD_NAME: 'order.cms.requisition.modify.feerate',
      SECURITY_TYPE: SecurityType.UserLogin.name,
      REQUIRED: [
        'requisition_no',
        'fee_rate'
      ],
      PARAMETERS: {
        'requisition_no': 'string',
        'fee_rate': 'double',
        'remarks': 'string'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '31038': '操作人不能为空',
      '31049': '退款申请单号不存在',
      '31050': '只有已创建的退款申请单才能修改退款手续费率',
      '31051': '退款申请单没有明细',
      '31052': '修改退款手续费率不成功',
      '31059': '费率不能为0'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('orderCmsRequisitionModifyFeerateService', constructor);
    }
  }
});