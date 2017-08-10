// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.ticket.handle.list',
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
      METHOD_NAME: 'ticket.handle.list',
      SECURITY_TYPE: SecurityType.None.name,
      REQUIRED: [
        'actionType'
      ],
      PARAMETERS: {
        'actionType': 'string',
        'code': 'string',
        'codeName': 'string',
        'codeid': 'long',
        'bandingStatus': 'string',
        'customerid': 'long',
        'customerName': 'string',
        'page': 'int',
        'rows': 'int',
        'userEmail': 'string'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '34002': '参数错误！'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('ticketHandleListService', constructor);
    }
  }
});