// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.order.cms.requisition.show',
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
      METHOD_NAME: 'order.cms.requisition.show',
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
      '31051': '退款申请单没有明细'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('orderCmsRequisitionShowService', constructor);
    }
  }
});