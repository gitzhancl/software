// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.ticket.viewTicketCode',
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
      METHOD_NAME: 'ticket.viewTicketCode',
      SECURITY_TYPE: SecurityType.None.name,
      REQUIRED: [
        'id'
      ],
      PARAMETERS: {
        'id': 'long',
        'startNumber': 'int',
        'eachPageNumber': 'int'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '40005': '查看卷号错误'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('ticketViewTicketCodeService', constructor);
    }
  }
});