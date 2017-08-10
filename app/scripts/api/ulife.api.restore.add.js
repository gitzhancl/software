// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.restore.add',
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
      METHOD_NAME: 'restore.add',
      SECURITY_TYPE: SecurityType.UserLogin.name,
      REQUIRED: [
        'outStoreCode'
      ],
      PARAMETERS: {
        'outStoreCode': 'string'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '34001': '操作失败！',
      '34002': '参数错误！',
      '34003': '记录不存在！',
      '34010': '退库单当前状态不能进行此操作！',
      '34015': '创建退库单失败：出库单当前状态不能做退库或已存在有未完成的退库单！'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('restoreAddService', constructor);
    }
  }
});