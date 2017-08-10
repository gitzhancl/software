// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.common.address',
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
      METHOD_NAME: 'common.address',
      SECURITY_TYPE: SecurityType.None.name,
      REQUIRED: [
        'parentId'
      ],
      PARAMETERS: {
        'parentId': 'long'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '40410': '参数错误',
      '40414': '数据服务引擎异常'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('commonAddressService', constructor);
    }
  }
});