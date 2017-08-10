/**
 * Created by Ulife on 2015/12/31.
 */
define([
        'ulife.cms.module.myApp',
        'jquery',
        'moment'
    ],
    function(app, $, moment) {

        app.directive('ulifeDateFormat', ['$filter',function($filter) {
            var dateFilter = $filter('date');
            return {
                require: 'ngModel',
                link: function(scope, elm, attrs, ctrl) {

                    function formatter(value) {
                        return dateFilter(value, 'yyyy-MM-dd HH:mm:ss'); //format
                    }

                    function parser() {
                        if (ctrl.$viewValue) {
                            return moment(dateFilter(ctrl.$viewValue)).format('x');
                        } else{
                            return null;
                        }

                    }

                    ctrl.$formatters.push(formatter);
                    ctrl.$parsers.unshift(parser);

                }
            };
        }]);
    });
