// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.share.buy.getUserList',
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
      METHOD_NAME: 'share.buy.getUserList',
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
      '31004': '用户不存在！'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('shareBuyGetUserListService', constructor);
    }
  }
});