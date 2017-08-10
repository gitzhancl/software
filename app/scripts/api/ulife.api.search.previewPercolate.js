// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.search.previewPercolate',
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
      METHOD_NAME: 'search.previewPercolate',
      SECURITY_TYPE: SecurityType.None.name,
      REQUIRED: [
        'percolateRequest'
      ],
      PARAMETERS: {
        'percolateRequest': 'Api_SEARCH_PercolateRequest'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('searchPreviewPercolateService', constructor);
    }
  }
});