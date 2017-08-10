// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.pullNew.records',
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
      METHOD_NAME: 'pullNew.records',
      SECURITY_TYPE: SecurityType.UserLogin.name,
      REQUIRED: [
        'activityId',
        'customerId'
      ],
      PARAMETERS: {
        'activityId': 'long',
        'customerId': 'long'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '31002': '未找到取消单据',
      '31003': '参数错误！',
      '31004': '用户不存在！',
      '31005': '记录不存在！',
      '31109': '数据错误！',
      '31111': '服务异常！',
      '31118': '分享给好友获取老用户优惠券吧！'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('pullNewRecordsService', constructor);
    }
  }
});