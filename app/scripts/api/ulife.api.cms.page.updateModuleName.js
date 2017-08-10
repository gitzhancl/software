// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.cms.page.updateModuleName',
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
      METHOD_NAME: 'cms.page.updateModuleName',
      SECURITY_TYPE: SecurityType.None.name,
      REQUIRED: [
        'id',
        'name'
      ],
      PARAMETERS: {
        'id': 'int',
        'name': 'string'
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
      app.factory('cmsPageUpdateModuleNameService', constructor);
    }
  }
});