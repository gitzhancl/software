// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.group.activity.revise',
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
      METHOD_NAME: 'group.activity.revise',
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
      '31102': '修改团购参数错误！',
      '31106': '更新失败，数据库缺少数据！'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('groupActivityReviseService', constructor);
    }
  }
});