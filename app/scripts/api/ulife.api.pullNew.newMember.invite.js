// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.pullNew.newMember.invite',
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
      METHOD_NAME: 'pullNew.newMember.invite',
      SECURITY_TYPE: SecurityType.None.name,
      REQUIRED: [
        'activityId'
      ],
      PARAMETERS: {
        'activityId': 'long'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '31004': '用户不存在！',
      '31115': '不存在该活动，或该活动已下架！',
      '31116': '该活动已结束！',
      '31117': '该活动未开始！'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('pullNewNewMemberInviteService', constructor);
    }
  }
});