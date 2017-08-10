// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.order.modifyAddress',
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
      METHOD_NAME: 'order.modifyAddress',
      SECURITY_TYPE: SecurityType.None.name,
      REQUIRED: [
        'address_id',
        'sale_no'
      ],
      PARAMETERS: {
        'address_id': 'int',
        'sale_no': 'string'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '30003': '地址不存在'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('orderModifyAddressService', constructor);
    }
  }
});