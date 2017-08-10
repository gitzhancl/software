/**
 * Created by Zhangke on 2015/12/15.
 */

define([
		'ulife.cms.module.myApp',
		'ulife.framework.services',
		'ulife.cms.business.config',
		'ulife.cms.menu.config',

		'ulife.api.cms.page.getList',

		"ulife.cms.service.authority"
	],
	function(app, services, BizConfig, MenuConfig, getHomepageList) {

		getHomepageList.injectTo(app);

		app.controller('HomepageListCtrl', [
			'$scope',
			'$location',
			'cmsPageGetListService',
			'$route',

			'authorityService',

			function($scope,
							 $location,
							 cmsPageGetListService,
							 $route,
							 authorityService) {

				$scope.menuConfig = MenuConfig.menu;

				$scope.gotoPageEdit = function(index) {
					$location.path('homepage/edit/' + index);
				}
				$scope.renderObj = {};

				$.when(cmsPageGetListService.sendRequest({
					"categoryId": 1
				}))
					.done(function(result) {
						$scope.renderObj = result;
						$scope.previewLinks = BizConfig.setting['preview_links'];
						$scope.$apply();
					})
					.fail(function() {
					})

			}
		]);

	});

