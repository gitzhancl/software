// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.group.list',
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
      METHOD_NAME: 'group.list',
      SECURITY_TYPE: SecurityType.UserLogin.name,
      REQUIRED: [
        'optType'
      ],
      PARAMETERS: {
        'optType': 'int',
        'page': 'int',
        'rows': 'int'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '31002': '未找到取消单据',
      '31003': '参数错误！',
      '31004': '用户不存在！',
      '31005': '记录不存在！',
      '31018': '退团失败,请联系客服！'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('groupListService', constructor);
    }
  }
});