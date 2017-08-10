// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.restore.audit',
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
      METHOD_NAME: 'restore.audit',
      SECURITY_TYPE: SecurityType.UserLogin.name,
      REQUIRED: [
        'id',
        'type'
      ],
      PARAMETERS: {
        'id': 'long',
        'auditStatus': 'int',
        'type': 'int'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '34001': '操作失败！',
      '34002': '参数错误！',
      '34006': '主管还未审核！',
      '34007': '该状态下不允许作废操作！',
      '34008': '只有账务审核过的状态下才允许该操作！',
      '34009': '退库单未提交！',
      '34010': '退库单当前状态不能进行此操作！'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('restoreAuditService', constructor);
    }
  }
});