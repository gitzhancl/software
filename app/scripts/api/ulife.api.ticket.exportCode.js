// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.ticket.exportCode',
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
      METHOD_NAME: 'ticket.exportCode',
      SECURITY_TYPE: SecurityType.None.name,
      REQUIRED: [
        'id',
        'userEmail'
      ],
      PARAMETERS: {
        'id': 'long',
        'userEmail': 'string'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '40006': '导出卷号密码错误'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('ticketExportCodeService', constructor);
    }
  }
});