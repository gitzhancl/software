// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.promotion.whitelist.addItem',
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
      METHOD_NAME: 'promotion.whitelist.addItem',
      SECURITY_TYPE: SecurityType.None.name,
      REQUIRED: [
        'actid',
        'id',
        'items'
      ],
      PARAMETERS: {
        'actid': 'long',
        'id': 'long',
        'items': 'string',
        'specialPrice': 'double',
        'start_date': 'long',
        'end_date': 'long',
        'ulimit': 'int',
        'stock': 'int'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '21022': '添加黑名单商品失败'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('promotionWhitelistAddItemService', constructor);
    }
  }
});