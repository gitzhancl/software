// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.promotion.source.save',
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
      METHOD_NAME: 'promotion.source.save',
      SECURITY_TYPE: SecurityType.None.name,
      REQUIRED: [
        'name',
        'code'
      ],
      PARAMETERS: {
        'id': 'long',
        'name': 'string',
        'depa_id': 'long',
        'depa_name': 'string',
        'code': 'string'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '21033': '保存指定渠道错误'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('promotionSourceSaveService', constructor);
    }
  }
});