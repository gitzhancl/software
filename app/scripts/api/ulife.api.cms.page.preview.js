// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.cms.page.preview',
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
      METHOD_NAME: 'cms.page.preview',
      SECURITY_TYPE: SecurityType.None.name,
      REQUIRED: [
        'type'
      ],
      PARAMETERS: {
        'type': 'int',
        'id': 'int'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '30107': '参数错误，预览页面没有找到',
      '30108': 'JSON数据解析出错！'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('cmsPagePreviewService', constructor);
    }
  }
});