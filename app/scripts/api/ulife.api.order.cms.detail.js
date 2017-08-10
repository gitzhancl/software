// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.order.cms.detail',
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
      METHOD_NAME: 'order.cms.detail',
      SECURITY_TYPE: SecurityType.None.name,
      REQUIRED: [
        'saleNo'
      ],
      PARAMETERS: {
        'saleNo': 'string'
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
      app.factory('orderCmsDetailService', constructor);
    }
  }
});