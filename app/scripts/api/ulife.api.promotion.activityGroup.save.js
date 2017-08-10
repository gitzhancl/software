// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.promotion.activityGroup.save',
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
      METHOD_NAME: 'promotion.activityGroup.save',
      SECURITY_TYPE: SecurityType.None.name,
      REQUIRED: [
        'name'
      ],
      PARAMETERS: {
        'id': 'long',
        'name': 'string'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '21013': '保存分组失败'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('promotionActivityGroupSaveService', constructor);
    }
  }
});