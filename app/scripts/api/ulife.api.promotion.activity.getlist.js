// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.promotion.activity.getlist',
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
      METHOD_NAME: 'promotion.activity.getlist',
      SECURITY_TYPE: SecurityType.None.name,
      REQUIRED: [
        'type',
        'status'
      ],
      PARAMETERS: {
        'name': 'string',
        'id': 'long',
        'code': 'string',
        'product_from': 'string',
        'start_date': 'long',
        'end_date': 'long',
        'type': 'string',
        'terminal': 'int',
        'rulesType': 'string',
        'status': 'int',
        'groupId': 'long',
        'itemId': 'long',
        'page': 'int',
        'rows': 'int'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '21004': '优惠券活动列表获取失败'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('promotionActivityGetlistService', constructor);
    }
  }
});