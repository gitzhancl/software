// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.vod.query',
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
      METHOD_NAME: 'vod.query',
      SECURITY_TYPE: SecurityType.None.name,
      REQUIRED: [
        'parameter'
      ],
      PARAMETERS: {
        'parameter': 'string',
        'page': 'int',
        'rows': 'int'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '30905': '操作失败！',
      '30906': '参数错误！',
      '30908': '该视频不存在',
      '30912': '素材信息不完整'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('vodQueryService', constructor);
    }
  }
});