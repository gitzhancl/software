// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.role.dept.add',
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
      METHOD_NAME: 'role.dept.add',
      SECURITY_TYPE: SecurityType.UserLogin.name,
      REQUIRED: [
        'id',
        'departmentName'
      ],
      PARAMETERS: {
        'id': 'long',
        'departmentName': 'string'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '30109': '操作失败！',
      '30110': '参数错误！',
      '30111': '记录不存在！',
      '30112': '记录已经存在！',
      '30118': '名称已经存在！',
      '30119': '该部门已经存在角色，不能新建子部门！'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('roleDeptAddService', constructor);
    }
  }
});