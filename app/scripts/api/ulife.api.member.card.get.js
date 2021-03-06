// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.member.card.get',
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
      METHOD_NAME: 'member.card.get',
      SECURITY_TYPE: SecurityType.None.name,
      REQUIRED: [
        'customer'
      ],
      PARAMETERS: {
        'customer': 'string'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '40072': '用户名不存在'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('memberCardGetService', constructor);
    }
  }
});