// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.cms.pullNew.publishOrCancel',
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
      METHOD_NAME: 'cms.pullNew.publishOrCancel',
      SECURITY_TYPE: SecurityType.None.name,
      REQUIRED: [
        'id'
      ],
      PARAMETERS: {
        'id': 'long'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '31104': '发布失败！'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('cmsPullNewPublishOrCancelService', constructor);
    }
  }
});