// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.group.activities',
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
      METHOD_NAME: 'group.activities',
      SECURITY_TYPE: SecurityType.None.name,
      REQUIRED: [
      ],
      PARAMETERS: {
        'size': 'int',
        'from': 'int',
        'name': 'string',
        'activityId': 'long',
        'startTime': 'long',
        'endTime': 'long',
        'type': 'int',
        'status': 'int'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '31100': '团购列表加载失败！'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('groupActivitiesService', constructor);
    }
  }
});