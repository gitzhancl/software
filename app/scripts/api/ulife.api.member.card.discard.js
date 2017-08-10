// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.member.card.discard',
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
      METHOD_NAME: 'member.card.discard',
      SECURITY_TYPE: SecurityType.None.name,
      REQUIRED: [
        'cardNos',
        'sumBalance'
      ],
      PARAMETERS: {
        'cardNos': 'string',
        'sumBalance': 'double'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '40415': '可退余额有变动，请重新申请退款'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('memberCardDiscardService', constructor);
    }
  }
});