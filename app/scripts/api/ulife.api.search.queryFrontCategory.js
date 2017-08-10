// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.search.queryFrontCategory',
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
      METHOD_NAME: 'search.queryFrontCategory',
      SECURITY_TYPE: SecurityType.None.name,
      REQUIRED: [
      ],
      PARAMETERS: {
        'key': 'string',
        'terminal': 'int',
        'page': 'int',
        'rows': 'int'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('searchQueryFrontCategoryService', constructor);
    }
  }
});