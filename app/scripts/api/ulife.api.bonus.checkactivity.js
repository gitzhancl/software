// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.bonus.checkactivity',
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
      METHOD_NAME: 'bonus.checkactivity',
      SECURITY_TYPE: SecurityType.None.name,
      REQUIRED: [
        'activityid'
      ],
      PARAMETERS: {
        'activityid': 'string'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '990001': '红包生成失败'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('bonusCheckactivityService', constructor);
    }
  }
});