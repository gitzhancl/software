// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.member.pointsRecord',
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
      METHOD_NAME: 'member.pointsRecord',
      SECURITY_TYPE: SecurityType.UserLogin.name,
      REQUIRED: [
        'serial_number',
        'operation',
        'point'
      ],
      PARAMETERS: {
        'serial_number': 'string',
        'business': 'string',
        'operation': 'string',
        'point': 'int'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '40311': '积分请求序列号不能为空',
      '40312': '积分数值不能小于等于零'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('memberPointsRecordService', constructor);
    }
  }
});