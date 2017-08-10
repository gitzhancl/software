/**
 * Created by Zhangke on 2015/11/9.
 */
'use strict';

define(
    'ulife.cms.page.login',
    [
        'jquery',
        'angular',
        'domReady',
        'ulife.cms.module.loginApp',

        'bootstrap'
    ],
    function($, angular, domReady, app) {

        domReady(function() {

            angular.bootstrap(document, ['LoginApp']);

            // The following is required if you want AngularJS Scenario tests to work
            $('html').addClass('ng-app: LoginApp');


        });
    }
)
