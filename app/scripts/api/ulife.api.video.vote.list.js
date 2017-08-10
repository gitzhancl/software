// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.video.vote.list',
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
      METHOD_NAME: 'video.vote.list',
      SECURITY_TYPE: SecurityType.None.name,
      REQUIRED: [
        'typeId'
      ],
      PARAMETERS: {
        'typeId': 'int',
        'page': 'int',
        'rows': 'int'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '30901': '不存在该评论'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('videoVoteListService', constructor);
    }
  }
});