// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.cms.recharge.amount.create',
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
      METHOD_NAME: 'cms.recharge.amount.create',
      SECURITY_TYPE: SecurityType.UserLogin.name,
      REQUIRED: [
        'amount'
      ],
      PARAMETERS: {
        'amount': 'int',
        'is_app': 'boolean',
        'is_h5': 'boolean',
        'is_pc': 'boolean'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '40416': '操作人为空',
      '40418': '该面额已存在，如需修改请编辑对应面额',
      '40420': '请输入1至1000的整数金额',
      '40421': '至少选择一个终端'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('cmsRechargeAmountCreateService', constructor);
    }
  }
});