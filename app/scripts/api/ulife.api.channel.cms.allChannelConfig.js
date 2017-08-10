// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.channel.cms.allChannelConfig',
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
      METHOD_NAME: 'channel.cms.allChannelConfig',
      SECURITY_TYPE: SecurityType.None.name,
      REQUIRED: [
      ],
      PARAMETERS: {
        'parentId': 'string',
        'childId': 'string',
        'terminal': 'string',
        'deliverType': 'string',
        'om': 'string',
        'pageNum': 'int',
        'pageSize': 'int'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '50003': '获取渠道和OM映射关系异常'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('channelCmsAllChannelConfigService', constructor);
    }
  }
});