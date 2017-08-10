// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.cms.page.update',
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
      METHOD_NAME: 'cms.page.update',
      SECURITY_TYPE: SecurityType.None.name,
      REQUIRED: [
        'pageId'
      ],
      PARAMETERS: {
        'pageId': 'int',
        'title': 'string',
        'keywords': 'string',
        'description': 'string',
        'name': 'string',
        'elements': 'string',
        'shareUrl': 'string',
        'shareImage': 'string',
        'shareContent': 'string',
        'shareTitle': 'string'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '30103': '页面不存在'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('cmsPageUpdateService', constructor);
    }
  }
});