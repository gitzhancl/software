// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.promotion.product.single',
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
      METHOD_NAME: 'promotion.product.single',
      SECURITY_TYPE: SecurityType.None.name,
      REQUIRED: [
        'id'
      ],
      PARAMETERS: {
        'id': 'long',
        'activityId': 'long'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '20012': '该商品在白名单中不存在'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('promotionProductSingleService', constructor);
    }
  }
});