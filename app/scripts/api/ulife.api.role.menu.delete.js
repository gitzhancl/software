// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.role.menu.delete',
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
      METHOD_NAME: 'role.menu.delete',
      SECURITY_TYPE: SecurityType.UserLogin.name,
      REQUIRED: [
        'menuId',
        'isDelete'
      ],
      PARAMETERS: {
        'menuId': 'long',
        'isDelete': 'int'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '30109': '操作失败！',
      '30110': '参数错误！',
      '30111': '记录不存在！'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('roleMenuDeleteService', constructor);
    }
  }
});