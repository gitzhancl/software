// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.ticket.updateStatus',
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
      METHOD_NAME: 'ticket.updateStatus',
      SECURITY_TYPE: SecurityType.None.name,
      REQUIRED: [
        'codeFlowRequest'
      ],
      PARAMETERS: {
        'codeFlowRequest': 'Api_TICKET_CodeFlowRequest'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '40003': '状态操作错误'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('ticketUpdateStatusService', constructor);
    }
  }
});