// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.cms.recharge.list',
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
      METHOD_NAME: 'cms.recharge.list',
      SECURITY_TYPE: SecurityType.None.name,
      REQUIRED: [
        'actionType'
      ],
      PARAMETERS: {
        'actionType': 'string',
        'orderStartTime': 'long',
        'orderEndTime': 'long',
        'payStartTime': 'long',
        'payEndTime': 'long',
        'rechargeStartTime': 'long',
        'rechargeEndTime': 'long',
        'rechargeUser': 'string',
        'paySerialNo': 'string',
        'payAmount': 'string',
        'payChannel': 'string',
        'rechargeStatus': 'int',
        'page': 'int',
        'rows': 'int',
        'userEmail': 'string'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '40501': '用户充值列表异常'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('cmsRechargeListService', constructor);
    }
  }
});