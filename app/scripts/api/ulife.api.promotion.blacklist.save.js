// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.promotion.blacklist.save',
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
      METHOD_NAME: 'promotion.blacklist.save',
      SECURITY_TYPE: SecurityType.None.name,
      REQUIRED: [
        'blacklistId'
      ],
      PARAMETERS: {
        'blacklistId': 'long',
        'status': 'int'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '21028': '保存黑名单失败'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('promotionBlacklistSaveService', constructor);
    }
  }
});