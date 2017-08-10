/**
 * Created by Zhangke on 2015/12/11.
 */
define([
		'ulife.cms.module.myApp',
		'jquery',
		'jqueryui.sortable'
	],
	function(app, $) {

		app.directive('ulifeContentSortable', ['$rootScope', function($rootScope) {
			return {
				restrict: 'A',
				scope: true,
				compile: function(tElement, tAttrs, transclude) {
					return {
						pre: function preLink(scope, iElement, iAttr, controller) {
							tElement.sortable({
								items: tAttrs.ulifeContentSortable,
								sort: function () {
									$(this).removeClass("ui-state-default");
								},
								start:_.bind(function (event, ui) {
									//this.editModule.sortContent.startIndex = $(ui.item[0].parentElement).find("[ng-repeat]").index(ui.item[0]);
									this.editModule.sortContent.startIndex = $(ui.item[0]).prevAll().length;
								}, scope),
								update: _.bind(function (event, ui) {
									//this.editModule.sortContent.endIndex = $(ui.item[0].parentElement).find("[ng-repeat]").index(ui.item[0]);
									this.editModule.sortContent.endIndex = $(ui.item[0]).prevAll().length;
									this.editModule.sortContent.sort();
								}, scope)
							});
						},
						post: function postLink(scope, iElement, iAttr, controller) {

						}
					}
				}
			};
		}]);
});
