// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.member.isLoginFirst',
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
      METHOD_NAME: 'member.isLoginFirst',
      SECURITY_TYPE: SecurityType.None.name,
      REQUIRED: [
        'customerId'
      ],
      PARAMETERS: {
        'customerId': 'long'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('memberIsLoginFirstService', constructor);
    }
  }
});