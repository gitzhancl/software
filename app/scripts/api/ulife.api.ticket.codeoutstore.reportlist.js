// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.ticket.codeoutstore.reportlist',
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
      METHOD_NAME: 'ticket.codeoutstore.reportlist',
      SECURITY_TYPE: SecurityType.None.name,
      REQUIRED: [
        'actionType'
      ],
      PARAMETERS: {
        'actionType': 'string',
        'startTime': 'long',
        'endTime': 'long',
        'companyName': 'string',
        'useDepart': 'string',
        'userName': 'string',
        'useage': 'string',
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
      app.factory('ticketCodeoutstoreReportlistService', constructor);
    }
  }
});