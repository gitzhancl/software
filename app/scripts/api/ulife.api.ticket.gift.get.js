// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.ticket.gift.get',
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
      METHOD_NAME: 'ticket.gift.get',
      SECURITY_TYPE: SecurityType.None.name,
      REQUIRED: [
        'ticketIds'
      ],
      PARAMETERS: {
        'ticketIds': 'string'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '34026': '终端不正确',
      '34027': '兑换券未上架，请联系客服！'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('ticketGiftGetService', constructor);
    }
  }
});