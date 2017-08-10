// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.promotion.code.getlist',
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
      METHOD_NAME: 'promotion.code.getlist',
      SECURITY_TYPE: SecurityType.None.name,
      REQUIRED: [
      ],
      PARAMETERS: {
        'id': 'long',
        'code': 'string',
        'customer_id': 'long',
        'login_name': 'string',
        'status': 'string',
        'isbinding': 'int',
        'page': 'int',
        'rows': 'int'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '21006': '优惠券列表获取失败'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('promotionCodeGetlistService', constructor);
    }
  }
});