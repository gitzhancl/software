// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.promotion.blacklist.getlist',
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
      METHOD_NAME: 'promotion.blacklist.getlist',
      SECURITY_TYPE: SecurityType.None.name,
      REQUIRED: [
        'blacklistId'
      ],
      PARAMETERS: {
        'itemId': 'long',
        'blacklistId': 'long',
        'page': 'int',
        'rows': 'int'
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
      app.factory('promotionBlacklistGetlistService', constructor);
    }
  }
});