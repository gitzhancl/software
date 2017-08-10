/**
 * Created by Zhangke on 2015/12/9.
 */
define([
        'jquery',
        'jquery.cookie',
        'md5',
        'ulife.cms.module.loginApp',


        'ulife.api.role.user.login'
    ],
    function ($, cookie, md5, app, roleUserLogin) {
        roleUserLogin.injectTo(app);

        app.controller('LoginCtrl', ['$scope', '$location', '$route', 'roleUserLoginService',

            function ($scope, $location, $route, roleUserLoginService) {
 
                var loginOut = function () {
                    $.cookie("_cmsttk", "", {path: '/', domain: '.ucaiyuan.com', expires: 0});
                }

                loginOut();
                var loginIndex = function () {
                    var username = $("#username").val();
                    var password = $("#password").val();


                    $.when(roleUserLoginService.sendRequest({
                            "loginName": username,
                            "password": password
                        }))
                        .done(function (result) {
                            $.cookie("_cmsttk", "ulifeuser", {path: '/', domain: '.ucaiyuan.com', expires: 10});
                            $.cookie("_cmsCustomId", result.customerId, {path: '/', domain: '.ucaiyuan.com', expires: 10});
                            if($.cookie("cms_page_ref")){
                                window.location.href =window.location.origin +'/index.html'+ $.cookie("cms_page_ref");
                            }else{
                                window.location.href = "/index.html";
                            }
                            
                        })
                        .fail(function (code, errMsg) {
                            alert(errMsg);
                        })
                }
                $("#submit_btn").on("click", function () {
                    loginIndex();
                })

                document.onkeydown = function (event) {
                    var e = event || window.event || arguments.callee.caller.arguments[0];
                    if (e && e.keyCode == 13) { // enter 键
                        loginIndex();
                        //$("#submit_btn").click();
                    }
                };

                var login = function () {
                    $.cookie("_cmsttk", "ulifeadmin", {path: '/', domain: '.ucaiyuan.com', expires: 10});
                    window.location.href = "/index.html"
                }


            }
        ]);
    });
