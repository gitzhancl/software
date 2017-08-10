// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.role.relevance.menu.button.list',
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
      METHOD_NAME: 'role.relevance.menu.button.list',
      SECURITY_TYPE: SecurityType.UserLogin.name,
      REQUIRED: [
        'menuId',
        'roleId'
      ],
      PARAMETERS: {
        'menuId': 'long',
        'roleId': 'long'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '30109': '操作失败！'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('roleRelevanceMenuButtonListService', constructor);
    }
  }
});