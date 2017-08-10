// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.instoredetail.add',
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
      METHOD_NAME: 'instoredetail.add',
      SECURITY_TYPE: SecurityType.UserLogin.name,
      REQUIRED: [
        'inStoreId',
        'codes'
      ],
      PARAMETERS: {
        'inStoreId': 'long',
        'codes': 'string'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '62001': '不存在该入库单'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('instoredetailAddService', constructor);
    }
  }
});