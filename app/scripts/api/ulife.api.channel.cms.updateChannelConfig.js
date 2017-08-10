// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.channel.cms.updateChannelConfig',
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
      METHOD_NAME: 'channel.cms.updateChannelConfig',
      SECURITY_TYPE: SecurityType.None.name,
      REQUIRED: [
        'id'
      ],
      PARAMETERS: {
        'id': 'long',
        'deliver': 'string',
        'order': 'string',
        'dept': 'string',
        'pay': 'string',
        'om': 'string',
        'remarks': 'string'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '50004': '更新渠道配置异常'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('channelCmsUpdateChannelConfigService', constructor);
    }
  }
});