// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.order.subList',
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
      METHOD_NAME: 'order.subList',
      SECURITY_TYPE: SecurityType.UserLogin.name,
      REQUIRED: [
        'customer_id',
        'package_sale_no',
        'status',
        'start_date',
        'end_date',
        'page',
        'pagesiz'
      ],
      PARAMETERS: {
        'customer_id': 'long',
        'package_sale_no': 'string',
        'status': 'int',
        'start_date': 'long',
        'end_date': 'long',
        'page': 'int',
        'pagesiz': 'int'
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
      app.factory('orderSubListService', constructor);
    }
  }
});