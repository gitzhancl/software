// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.promotion.blacklist.addItem',
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
      METHOD_NAME: 'promotion.blacklist.addItem',
      SECURITY_TYPE: SecurityType.None.name,
      REQUIRED: [
        'blacklistId',
        'items'
      ],
      PARAMETERS: {
        'blacklistId': 'long',
        'items': 'string'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '21027': '添加黑名单商品失败'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('promotionBlacklistAddItemService', constructor);
    }
  }
});