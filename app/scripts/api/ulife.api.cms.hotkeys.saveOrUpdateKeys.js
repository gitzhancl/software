// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.cms.hotkeys.saveOrUpdateKeys',
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
      METHOD_NAME: 'cms.hotkeys.saveOrUpdateKeys',
      SECURITY_TYPE: SecurityType.None.name,
      REQUIRED: [
        'hotKey',
        'hits',
        'terminal'
      ],
      PARAMETERS: {
        'id': 'long',
        'hotKey': 'string',
        'hits': 'int',
        'terminal': 'int'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '10023': '热词保存修改错误'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('cmsHotkeysSaveOrUpdateKeysService', constructor);
    }
  }
});