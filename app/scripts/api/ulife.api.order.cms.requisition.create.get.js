// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.order.cms.requisition.create.get',
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
      METHOD_NAME: 'order.cms.requisition.create.get',
      SECURITY_TYPE: SecurityType.UserLogin.name,
      REQUIRED: [
        'customer'
      ],
      PARAMETERS: {
        'customer': 'string'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '31038': '操作人不能为空',
      '31044': '用户名不能为空',
      '31045': '用户不存在'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('orderCmsRequisitionCreateGetService', constructor);
    }
  }
});