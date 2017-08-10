// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.cms.recharge.amount.edit',
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
      METHOD_NAME: 'cms.recharge.amount.edit',
      SECURITY_TYPE: SecurityType.UserLogin.name,
      REQUIRED: [
        'id'
      ],
      PARAMETERS: {
        'id': 'long',
        'is_app': 'boolean',
        'is_h5': 'boolean',
        'is_pc': 'boolean'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '40416': '操作人为空',
      '40419': '该充值配置不存在',
      '40421': '至少选择一个终端'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('cmsRechargeAmountEditService', constructor);
    }
  }
});