// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.promotion.blacklist.get',
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
      METHOD_NAME: 'promotion.blacklist.get',
      SECURITY_TYPE: SecurityType.None.name,
      REQUIRED: [
      ],
      PARAMETERS: {
        'blacklistId': 'long'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '21025': '获取黑名单列表失败'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('promotionBlacklistGetService', constructor);
    }
  }
});