// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.common.imageCode.verify',
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
      METHOD_NAME: 'common.imageCode.verify',
      SECURITY_TYPE: SecurityType.None.name,
      REQUIRED: [
        'vCode'
      ],
      PARAMETERS: {
        'vCode': 'string'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '40211': '图片验证码,验证失败！'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('commonImageCodeVerifyService', constructor);
    }
  }
});