// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.promotion.trigger.get',
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
      METHOD_NAME: 'promotion.trigger.get',
      SECURITY_TYPE: SecurityType.UserLogin.name,
      REQUIRED: [
      ],
      PARAMETERS: {
        'triggerType': 'string',
        'totalAmount': 'double',
        'orderNo': 'string',
        'orderType': 'string'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '20020': '未找到相关自动发券信息'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('promotionTriggerGetService', constructor);
    }
  }
});