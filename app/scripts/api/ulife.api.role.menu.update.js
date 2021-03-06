// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.role.menu.update',
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
      METHOD_NAME: 'role.menu.update',
      SECURITY_TYPE: SecurityType.UserLogin.name,
      REQUIRED: [
        'menuId',
        'menuName'
      ],
      PARAMETERS: {
        'menuId': 'long',
        'menuName': 'string',
        'sort': 'int'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '30109': '操作失败！',
      '30110': '参数错误！',
      '30111': '记录不存在！',
      '30118': '名称已经存在！'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('roleMenuUpdateService', constructor);
    }
  }
});