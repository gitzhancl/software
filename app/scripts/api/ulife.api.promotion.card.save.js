// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.promotion.card.save',
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
      METHOD_NAME: 'promotion.card.save',
      SECURITY_TYPE: SecurityType.None.name,
      REQUIRED: [
        'card'
      ],
      PARAMETERS: {
        'card': 'string'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '21002': '优惠券类型保存失败',
      '21031': '类型不能重复'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('promotionCardSaveService', constructor);
    }
  }
});