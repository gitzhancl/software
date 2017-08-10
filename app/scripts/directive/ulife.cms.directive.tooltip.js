/**
 * Created by Zhangke on 2015/12/14.
 */
define([
		'ulife.cms.module.myApp',
		'jquery'
	],
	function(app, $) {

		app.directive('ulifeTooltip', ['$rootScope', function($rootScope) {
			return {
				restrict: 'A',
				scope: true,
				compile: function(tElement, tAttrs, transclude) {
					return {
						pre: function preLink(scope, iElement, iAttr, controller) {
						},
						post: function postLink(scope, iElement, iAttr, controller) {

							iElement.tooltip({
								title:tAttrs.ulifeTooltip,
								placement: tAttrs.ulifeTooltipPlacement || "right",
								container: 'body'
							})
						}
					}
				}
			};
		}]);
	});
