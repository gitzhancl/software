// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.bonus.winningLog',
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
      METHOD_NAME: 'bonus.winningLog',
      SECURITY_TYPE: SecurityType.None.name,
      REQUIRED: [
        'activityId',
        'customerId',
        'userTel'
      ],
      PARAMETERS: {
        'activityId': 'long',
        'customerId': 'long',
        'userTel': 'string'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '990009': '中奖记录失败'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('bonusWinningLogService', constructor);
    }
  }
});