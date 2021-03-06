// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.cms.item.export',
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
      METHOD_NAME: 'cms.item.export',
      SECURITY_TYPE: SecurityType.None.name,
      REQUIRED: [
        'email'
      ],
      PARAMETERS: {
        'query': 'string',
        'email': 'string',
        'rows': 'int'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '10004': '参数格式错误'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('cmsItemExportService', constructor);
    }
  }
});