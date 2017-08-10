// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.cms.page.publish',
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
      METHOD_NAME: 'cms.page.publish',
      SECURITY_TYPE: SecurityType.None.name,
      REQUIRED: [
        'pageId'
      ],
      PARAMETERS: {
        'pageId': 'int',
        'startTime': 'long'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '30106': '发布失败，请检查内容再次发布'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('cmsPagePublishService', constructor);
    }
  }
});