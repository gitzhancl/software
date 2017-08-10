/**
 * Created by Zhangke on 2015/12/10.
 */
'use strict';

define(
	'ulife.cms.page.index',
	[
		'jquery',
		'jquery.cookie',
		'angular',
		'domReady',
		'ulife.cms.module.myApp',

		'bootstrap'
	],
	function($, cookie, angular, domReady, app) {
		
		// if (window.location.host == "manage.ucaiyuan.com"
		//  || window.location.host == "cms.ucaiyuan.com"
		//  || window.location.host == "cms-demo.ucaiyuan.com" ) {
		// 	if ($.cookie("_cmsttk") !== "ulifeulife") {
		// 		window.location.href = "/login.html";
		// 	}
		// }

		if ($.cookie("_cmsttk") !== "ulifeuser" && $.cookie("_cmsttk") !== "ulifeadmin") {
			$.cookie("cms_page_ref", window.location.hash, {path: '/', domain: '.ucaiyuan.com', expires: 10});
			window.location.href = "/login.html";
		}

		domReady(function() {

			angular.bootstrap(document, ['MyApp']);

			// The following is required if you want AngularJS Scenario tests to work
			$('html').addClass('ng-app: MyApp');


		});
	}
)