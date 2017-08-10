// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.video.comment.list',
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
      METHOD_NAME: 'video.comment.list',
      SECURITY_TYPE: SecurityType.None.name,
      REQUIRED: [
        'videoId'
      ],
      PARAMETERS: {
        'page': 'int',
        'rows': 'int',
        'videoId': 'int'
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
      app.factory('videoCommentListService', constructor);
    }
  }
});