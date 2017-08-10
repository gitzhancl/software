// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.hot.share.addoredit',
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
      METHOD_NAME: 'hot.share.addoredit',
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
      '30109': '操作失败！'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('hotShareAddoreditService', constructor);
    }
  }
});