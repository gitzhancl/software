// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.order.cms.requisition.create',
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
      METHOD_NAME: 'order.cms.requisition.create',
      SECURITY_TYPE: SecurityType.UserLogin.name,
      REQUIRED: [
        'customer'
      ],
      PARAMETERS: {
        'customer': 'string',
        'remarks': 'string'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '31038': '操作人不能为空',
      '31044': '用户名不能为空',
      '31045': '用户不存在',
      '31046': '可退余额为0,不能生成退款申请单',
      '31047': '该用户已经存在已创建的退款申请单',
      '31056': '生成退款申请单错误'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('orderCmsRequisitionCreateService', constructor);
    }
  }
});