/**
 * Created by Zhangke on 2015/12/10.
 */
define([], function()
{
    return {
        defaultRoutePath: '/',
        routes: {
            '/': {
                templateUrl: '/views/index/ulife.cms.index.login.html',
                dependencies: [
                    '/scripts/controller/ulife.cms.controller.login.js'
                ]
            }
        }
    };
});