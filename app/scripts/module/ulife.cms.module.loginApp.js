/**
 * Created by Zhangke on 2015/12/8.
 */
define([
		'angular',
		'ulife.cms.route.login',
		'ulife.cms.service.dependencyResolverFor',

		'angular.route',
		'ulife.framework.controllers',
		'ulife.framework.services',
		'ulife.framework.filters',
		'ulife.framework.directives'

	],
	function (angular, config, dependencyResolverFor) {

		var app = angular.module('LoginApp', ['ngRoute', 'controllers', 'services', 'filters', 'directives']);

		app.config(
			[
				'$routeProvider',
				'$locationProvider',
				'$controllerProvider',
				'$compileProvider',
				'$filterProvider',
				'$provide',

				function($routeProvider, $locationProvider, $controllerProvider, $compileProvider, $filterProvider, $provide)
				{
					app.controller = $controllerProvider.register;
					app.directive  = $compileProvider.directive;
					app.filter     = $filterProvider.register;
					app.factory    = $provide.factory;
					app.service    = $provide.service;

					if(config.routes !== undefined)
					{
						angular.forEach(config.routes, function(route, path)
						{
							$routeProvider.when(path, {
								templateUrl:route.templateUrl,
								resolve:dependencyResolverFor(route.dependencies)
							});
						});
					}

					if(config.defaultRoutePaths !== undefined)
					{
						$routeProvider.otherwise({redirectTo:config.defaultRoutePaths});
					}
				}
			]);

		return app;
	});