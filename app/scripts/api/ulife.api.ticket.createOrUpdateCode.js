// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.ticket.createOrUpdateCode',
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
      METHOD_NAME: 'ticket.createOrUpdateCode',
      SECURITY_TYPE: SecurityType.None.name,
      REQUIRED: [
        'codeCreateRequest'
      ],
      PARAMETERS: {
        'codeCreateRequest': 'Api_TICKET_CodeCreateRequest'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '40007': '创建卷号生成单错误'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('ticketCreateOrUpdateCodeService', constructor);
    }
  }
});