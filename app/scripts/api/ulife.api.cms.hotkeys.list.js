// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.cms.hotkeys.list',
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
      METHOD_NAME: 'cms.hotkeys.list',
      SECURITY_TYPE: SecurityType.None.name,
      REQUIRED: [
      ],
      PARAMETERS: {
        'hotKey': 'string',
        'startNumber': 'int',
        'eachPageNumber': 'int'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '10022': '获取热词列表错误'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('cmsHotkeysListService', constructor);
    }
  }
});