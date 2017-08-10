// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.cms.userBlackList.add',
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
      METHOD_NAME: 'cms.userBlackList.add',
      SECURITY_TYPE: SecurityType.None.name,
      REQUIRED: [
        'loginName',
        'description',
        'newCreator'
      ],
      PARAMETERS: {
        'loginName': 'string',
        'description': 'string',
        'newCreator': 'string'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '40444': '操作失败',
      '40445': '该用户已经不能登录!',
      '40446': '操作失败，没有该用户！'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('cmsUserBlackListAddService', constructor);
    }
  }
});