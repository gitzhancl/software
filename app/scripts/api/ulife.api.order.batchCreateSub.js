// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.order.batchCreateSub',
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
      METHOD_NAME: 'order.batchCreateSub',
      SECURITY_TYPE: .name,
      REQUIRED: [
        'shipping_date',
        'modify_by'
      ],
      PARAMETERS: {
        'shipping_date': 'long',
        'modify_by': 'string'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '30009': '订单配送日期非法'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('orderBatchCreateSubService', constructor);
    }
  }
});