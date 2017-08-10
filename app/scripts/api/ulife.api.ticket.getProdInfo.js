// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.ticket.getProdInfo',
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
      METHOD_NAME: 'ticket.getProdInfo',
      SECURITY_TYPE: SecurityType.UserLogin.name,
      REQUIRED: [
        'itemId'
      ],
      PARAMETERS: {
        'itemId': 'long'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '34001': '操作失败！',
      '34002': '参数错误！',
      '34017': 'OM获取商品信息失败！',
      '34025': '商品不存在！'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('ticketGetProdInfoService', constructor);
    }
  }
});