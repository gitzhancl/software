// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.ticket.queryTicketNameById',
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
      METHOD_NAME: 'ticket.queryTicketNameById',
      SECURITY_TYPE: SecurityType.None.name,
      REQUIRED: [
        'ticketId'
      ],
      PARAMETERS: {
        'ticketId': 'long'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '40002': '查询卷名称错误'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('ticketQueryTicketNameByIdService', constructor);
    }
  }
});