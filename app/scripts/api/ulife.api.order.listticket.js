// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.order.listticket',
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
      METHOD_NAME: 'order.listticket',
      SECURITY_TYPE: SecurityType.UserLogin.name,
      REQUIRED: [
      ],
      PARAMETERS: {
        'statusValue': 'string',
        'orderType': 'string',
        'start_date': 'long',
        'end_date': 'long',
        'page': 'int',
        'rows': 'int'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '30001': '不存在该订单',
      '30051': '输入参数有误'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('orderListticketService', constructor);
    }
  }
});