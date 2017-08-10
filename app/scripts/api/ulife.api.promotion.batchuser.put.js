// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.promotion.batchuser.put',
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
      METHOD_NAME: 'promotion.batchuser.put',
      SECURITY_TYPE: SecurityType.None.name,
      REQUIRED: [
        'actid',
        'base64'
      ],
      PARAMETERS: {
        'actid': 'long',
        'base64': 'string'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '21020': '批量投放失败'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('promotionBatchuserPutService', constructor);
    }
  }
});