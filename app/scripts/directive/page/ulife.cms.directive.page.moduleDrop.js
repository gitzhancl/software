/**
 * Created by Ulife on 2015/12/21.
 */
define([
        'ulife.cms.module.myApp',
        'underscore',
        'jqueryui.droppable'
    ],
    function(app, _, addModule) {

        app.directive('ulifeModuleDrop', [
            '$rootScope',
            function($rootScope) {
                return {
                    restrict: 'AM',
                    scope: true,
                    contoller: 'PageEditCtrl',
                    compile: function(tElement, tAttrs, transclude) {
                        return {
                            pre: function preLink(scope, iElement, iAttr, controller) {
                            },
                            post: function postLink(scope, iElement, iAttr, controller) {

                                iElement.droppable({
                                    activeClass: "ui-state-default",
                                    hoverClass: "ui-state-hover",
                                    accept: ":not(.ui-sortable-helper)",
                                    drop: _.bind(function( event, ui ) {
                                        var that = this;

                                        var insertArr =  function(index, arrItem) {
                                            if (!that.pageHandler.modules.modules || !_.isArray(that.pageHandler.modules.modules)) {
                                                that.pageHandler.modules.isNotExsit = false;
                                                return [arrItem];
                                            }
                                            var preArr = that.pageHandler.modules.modules.slice(0,index + 1);
                                            var nextArr = that.pageHandler.modules.modules.slice(index + 1,that.pageHandler.modules.modules.length);
                                            preArr.push(arrItem);
                                            return preArr.concat(nextArr);
                                        }

                                        var index = $(event.target.parentElement).find(".ui-droppable").index(event.target);
                                        var newModule = {
                                            moduleId: ui.draggable.data("moduleId"),
                                            sort: index * 1000 + 1
                                        };
                                        $.when(this.pageHandler.addModule(newModule))
                                            .done(function(resultModule) {
                                                that.pageHandler.modules.modules = insertArr(index, resultModule);
                                                that.$apply();
                                            })
                                    }, scope)
                                });
                            }
                        }
                    }
                };
            }]);
    });
