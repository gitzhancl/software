// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.video.approval',
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
      METHOD_NAME: 'video.approval',
      SECURITY_TYPE: SecurityType.UserLogin.name,
      REQUIRED: [
        'commentId',
        'status'
      ],
      PARAMETERS: {
        'commentId': 'int',
        'status': 'int'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '30901': '不存在该评论',
      '30902': '评论字数不能超过200',
      '30903': '没有找到用户信息',
      '30905': '操作失败！',
      '30906': '参数错误！'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('videoApprovalService', constructor);
    }
  }
});