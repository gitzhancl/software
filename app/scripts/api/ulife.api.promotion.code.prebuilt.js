// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.promotion.code.prebuilt',
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
      METHOD_NAME: 'promotion.code.prebuilt',
      SECURITY_TYPE: SecurityType.None.name,
      REQUIRED: [
        'actid'
      ],
      PARAMETERS: {
        'actid': 'long'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '21021': '批量预生成优惠券'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('promotionCodePrebuiltService', constructor);
    }
  }
});