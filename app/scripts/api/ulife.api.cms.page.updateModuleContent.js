// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.cms.page.updateModuleContent',
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
      METHOD_NAME: 'cms.page.updateModuleContent',
      SECURITY_TYPE: SecurityType.None.name,
      REQUIRED: [
        'id',
        'content'
      ],
      PARAMETERS: {
        'id': 'int',
        'content': 'string'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '30105': '组件未找到'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('cmsPageUpdateModuleContentService', constructor);
    }
  }
});