// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.channel.cms.insertChannelConfig',
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
      METHOD_NAME: 'channel.cms.insertChannelConfig',
      SECURITY_TYPE: SecurityType.None.name,
      REQUIRED: [
        'parentChannelId',
        'childChannelId',
        'dept',
        'deliverType'
      ],
      PARAMETERS: {
        'parentChannelId': 'string',
        'childChannelId': 'string',
        'dept': 'string',
        'terminal': 'string',
        'deliverType': 'string'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '50005': '保存渠道配置异常',
      '50006': '渠道配置已存在',
      '50007': 'online渠道终端不能为空'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('channelCmsInsertChannelConfigService', constructor);
    }
  }
});