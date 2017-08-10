// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.channel.cms.childChannel',
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
      METHOD_NAME: 'channel.cms.childChannel',
      SECURITY_TYPE: SecurityType.None.name,
      REQUIRED: [
        'parentId'
      ],
      PARAMETERS: {
        'parentId': 'string'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '50001': '获取子渠道异常'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('channelCmsChildChannelService', constructor);
    }
  }
});