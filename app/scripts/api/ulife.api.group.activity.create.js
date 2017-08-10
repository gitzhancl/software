// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.group.activity.create',
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
      METHOD_NAME: 'group.activity.create',
      SECURITY_TYPE: SecurityType.None.name,
      REQUIRED: [
        'json'
      ],
      PARAMETERS: {
        'json': 'string'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '31101': '新建团购参数错误！',
      '31107': '未生成新的itemId,接口或没有这条itemId错误！'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('groupActivityCreateService', constructor);
    }
  }
});