// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.order.suspend',
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
      METHOD_NAME: 'order.suspend',
      SECURITY_TYPE: .name,
      REQUIRED: [
        'no',
        'modify_by'
      ],
      PARAMETERS: {
        'no': 'string',
        'modify_by': 'string'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '30001': '不存在该订单'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('orderSuspendService', constructor);
    }
  }
});