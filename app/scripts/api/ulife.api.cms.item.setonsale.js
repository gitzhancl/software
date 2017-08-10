// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.cms.item.setonsale',
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
      METHOD_NAME: 'cms.item.setonsale',
      SECURITY_TYPE: SecurityType.None.name,
      REQUIRED: [
        'ids',
        'state'
      ],
      PARAMETERS: {
        'ids': 'string',
        'state': 'int'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '10004': '参数格式错误'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('cmsItemSetonsaleService', constructor);
    }
  }
});