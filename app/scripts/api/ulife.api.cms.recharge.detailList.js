// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.cms.recharge.detailList',
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
      METHOD_NAME: 'cms.recharge.detailList',
      SECURITY_TYPE: SecurityType.None.name,
      REQUIRED: [
        'actionType'
      ],
      PARAMETERS: {
        'actionType': 'string',
        'rechargeStartTime': 'long',
        'rechargeEndTime': 'long',
        'cardNo': 'string',
        'rechargeNo': 'string',
        'activityId': 'long',
        'customer': 'string',
        'paySerialNo': 'string',
        'page': 'int',
        'rows': 'int',
        'userEmail': 'string'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '40503': '用户充值明细列表异常'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('cmsRechargeDetailListService', constructor);
    }
  }
});