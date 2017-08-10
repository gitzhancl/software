// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.order.TicketOrderCreate',
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
      METHOD_NAME: 'order.TicketOrderCreate',
      SECURITY_TYPE: SecurityType.UserLogin.name,
      REQUIRED: [
        'serialNo',
        'pwd',
        'addressId',
        'remark',
        'items'
      ],
      PARAMETERS: {
        'serialNo': 'string',
        'pwd': 'string',
        'addressId': 'long',
        'shipDate': 'long',
        'remark': 'string',
        'items': 'string'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '31062': '该卡券已经提交过订单（请勿重复提交，如有疑问请联系客服）',
      '31063': '卡券兑换验证失败',
      '31065': '由于春节假期物流调整,可配送时间截止2017年1月24日。祝您新春愉快！'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('orderTicketOrderCreateService', constructor);
    }
  }
});