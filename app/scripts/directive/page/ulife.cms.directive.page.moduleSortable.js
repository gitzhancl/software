/**
 * Created by Zhangke on 2015/12/11.
 */
define([
		'ulife.cms.module.myApp',
		'jquery',
		'jqueryui.sortable'
	],
	function(app, $) {

		app.directive('ulifeModuleSortable', ['$rootScope', function($rootScope) {
			return {
				restrict: 'A',
				scope: true,
				compile: function(tElement, tAttrs, transclude) {
					return {
						pre: function preLink(scope, iElement, iAttr, controller) {
							tElement.sortable({
								items: tAttrs.ulifeModuleSortable,
								sort: function () {
									// gets added unintentionally by droppable interacting with sortable
									// using connectWithSortable fixes this, but doesn't allow you to customize active/hoverClass options
									$(this).removeClass("ui-state-default");
								},
								stop: _.bind(function (event, ui) {
									var databindingIds = [];
									var sorts = [];
									$.each(tElement.find("[data-databinding-id]"), function(index, item) {
										databindingIds.push($(item).data("databindingId"));
										sorts.push(index * 1000)
									})
									var ids = databindingIds.join(",");
									sorts = sorts.join(",");

									this.pageHandler.sortModule(ids, sorts);
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
