// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.order.cms.requisition.confirm',
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
      METHOD_NAME: 'order.cms.requisition.confirm',
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
      '31049': '退款申请单号不存在',
      '31053': '只有已创建的退款申请单才能取消',
      '31054': '取消退款申请单不成功',
      '31058': '可退余额有变动，请重新申请退款'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('orderCmsRequisitionConfirmService', constructor);
    }
  }
});