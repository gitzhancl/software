/**
 * Created by Zhangke on 2015/12/8.
 */
define([
    'angular',
    'jquery',
    'ulife.cms.route.index',
    'ulife.cms.service.dependencyResolverFor',

    'ngDialog',
    'angular-tree-control',

    'angular.route',
    'angular.sanitize',
    'ulife.framework.controllers',
    'ulife.framework.services',
    'ulife.framework.filters',
    'ulife.framework.directives'

  ],
  function(angular, $, config, dependencyResolverFor, ngDialog, treeControl){

    var app = angular.module('MyApp', [
      'ngRoute',
      'controllers',
      'services',
      'filters',
      'directives',
      'ngSanitize',
      'ngDialog',
      'treeControl'
    ]);

    app.config(
      [
        '$routeProvider',
        '$locationProvider',
        '$controllerProvider',
        '$compileProvider',
        '$filterProvider',
        '$provide',

        function($routeProvider, $locationProvider, $controllerProvider, $compileProvider, $filterProvider, $provide){

          app.controller = $controllerProvider.register;
          app.directive  = $compileProvider.directive;
          app.filter     = $filterProvider.register;
          app.factory    = $provide.factory;
          app.service    = $provide.service;

          if (config.routes !== undefined) {
            angular.forEach(config.routes, function(route, path){
              $routeProvider.when(path, {
                templateUrl: route.templateUrl,
                resolve    : dependencyResolverFor(route.dependencies)
              });
            });
          }

          if (config.defaultRoutePaths !== undefined) {
            $routeProvider.otherwise({redirectTo: config.defaultRoutePaths});
          }
        }
      ]);

    return app;
  });