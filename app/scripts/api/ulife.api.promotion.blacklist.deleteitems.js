// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.promotion.blacklist.deleteitems',
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
      METHOD_NAME: 'promotion.blacklist.deleteitems',
      SECURITY_TYPE: SecurityType.None.name,
      REQUIRED: [
        'ids'
      ],
      PARAMETERS: {
        'ids': 'string'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '21026': '删除黑名单项失败'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('promotionBlacklistDeleteitemsService', constructor);
    }
  }
});