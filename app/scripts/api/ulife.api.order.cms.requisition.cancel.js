// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.order.cms.requisition.cancel',
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
      METHOD_NAME: 'order.cms.requisition.cancel',
      SECURITY_TYPE: SecurityType.UserLogin.name,
      REQUIRED: [
        'requisition_no'
      ],
      PARAMETERS: {
        'requisition_no': 'string'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '31038': '操作人不能为空',
      '31043': '退款单据已存在',
      '31049': '退款申请单号不存在',
      '31051': '退款申请单没有明细',
      '31055': '修改账户余额失败',
      '31057': '只有已创建的退款申请单才能确认'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('orderCmsRequisitionCancelService', constructor);
    }
  }
});