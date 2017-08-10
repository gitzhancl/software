// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.share.buy.detailsORUserList',
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
      METHOD_NAME: 'share.buy.detailsORUserList',
      SECURITY_TYPE: SecurityType.UserLogin.name,
      REQUIRED: [
        'id'
      ],
      PARAMETERS: {
        'id': 'long'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '31004': '用户不存在！',
      '31109': '数据错误！'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('shareBuyDetailsORUserListService', constructor);
    }
  }
});