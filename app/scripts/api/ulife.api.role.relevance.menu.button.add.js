// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.role.relevance.menu.button.add',
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
      METHOD_NAME: 'role.relevance.menu.button.add',
      SECURITY_TYPE: SecurityType.UserLogin.name,
      REQUIRED: [
        'menuId',
        'roleId'
      ],
      PARAMETERS: {
        'menuId': 'long',
        'roleId': 'long',
        'ids': 'string'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '30109': '操作失败！',
      '30110': '参数错误！',
      '30111': '记录不存在！',
      '30112': '记录已经存在！',
      '30118': '名称已经存在！'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('roleRelevanceMenuButtonAddService', constructor);
    }
  }
});