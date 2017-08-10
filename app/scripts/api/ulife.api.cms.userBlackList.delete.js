// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.cms.userBlackList.delete',
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
      METHOD_NAME: 'cms.userBlackList.delete',
      SECURITY_TYPE: SecurityType.None.name,
      REQUIRED: [
        'ids'
      ],
      PARAMETERS: {
        'ids': 'string'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '40444': '操作失败',
      '40447': '操作失败，没有可删除的会员黑名单！'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('cmsUserBlackListDeleteService', constructor);
    }
  }
});