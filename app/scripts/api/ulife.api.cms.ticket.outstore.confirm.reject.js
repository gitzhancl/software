// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.cms.ticket.outstore.confirm.reject',
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
      METHOD_NAME: 'cms.ticket.outstore.confirm.reject',
      SECURITY_TYPE: SecurityType.UserLogin.name,
      REQUIRED: [
        'id',
        'version'
      ],
      PARAMETERS: {
        'id': 'long',
        'version': 'int'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '63001': '不存在该出库单',
      '63002': '参数错误'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('cmsTicketOutstoreConfirmRejectService', constructor);
    }
  }
});