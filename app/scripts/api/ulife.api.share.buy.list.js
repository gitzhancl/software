// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.share.buy.list',
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
      METHOD_NAME: 'share.buy.list',
      SECURITY_TYPE: SecurityType.None.name,
      REQUIRED: [
      ],
      PARAMETERS: {
        'id': 'long',
        'startTime': 'long',
        'endTime': 'long',
        'itemId': 'long',
        'status': 'int',
        'code': 'string',
        'activityName': 'string',
        'page': 'int',
        'rows': 'int'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '31109': '数据错误！'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('shareBuyListService', constructor);
    }
  }
});