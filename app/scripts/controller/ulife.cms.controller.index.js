/**
 * Created by Zhangke on 2015/12/9.
 */
define([
		'ulife.cms.module.myApp',
		'ulife.framework.services',
		'ulife.cms.business.config',
		'ulife.cms.menu.config',

		"ulife.cms.service.authority",
		'ulife.cms.service.getDepartment'
	],
	function(app, services, BizConfig, MenuConfig) {

		app.controller('IndexCtrl', [
			'$scope',
			'$location',
			'$route',
			'authorityService',
			'deportmentService',
			function($scope,
							 $location,
							 $route,
							 authorityService,deportmentService) {


			}
		]);
	});


