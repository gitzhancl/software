// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.stock.find',
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
      METHOD_NAME: 'stock.find',
      SECURITY_TYPE: SecurityType.None.name,
      REQUIRED: [
        'command',
        'key',
        'field',
        'value'
      ],
      PARAMETERS: {
        'command': 'string',
        'key': 'string',
        'field': 'string',
        'value': 'string'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('stockFindService', constructor);
    }
  }
});