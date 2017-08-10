define(
  [
    'jquery',
    'jquery.cookie',
    'store',
    'ulife.cms.module.myApp',
    'moment',
    'underscore',
    'ulife.api.role.user.authority',

    'ulife.cms.directive.module.sortable',
    'ulife.cms.directive.module.seledepartment',
    'ulife.cms.directive.datetimepicker',
    'ulife.cms.directive.tooltip',
    'ulife.cms.directive.dateformat',
    'ulife.cms.directive.btnAu'
  ],
  function ($, cookie, store, app, moment, _, roleUserAuthority) {


    roleUserAuthority.injectTo(app);

    app.factory('authorityService', [
      'roleUserAuthorityService',
      function(roleUserAuthorityService) {
 
        var ruAuthority = {};

        var upath = window.location.pathname + window.location.hash;
        upath = upath.substr(1, upath.length);
        
        var showMenu = function(auArr) {

          _.each(auArr, function(pageItem, key, list){

            //左侧一级菜单权限匹配
            _.each($(".cms-layout-left .panel-heading .collapsed:contains('" + pageItem.name + "')"), function(item){
              if ($.trim($(item).text()) == pageItem.name)
                $(item).parents(".panel-heading")
                  .removeClass("hide")
            })

            // 二级菜单权限匹配
            _.each($(".cms-layout-left .panel-collapse .list-group-item:contains('" + pageItem.name + "')"), function(item){
              if ($.trim($(item).text()) == pageItem.name) {
                $(item).removeClass("hide")

                // 按页面
                var tHash = ('/' + $(item).attr("href")).replace(window.location.pathname, '')

                store.set("cms_" + tHash, pageItem.buttonList);
              }
            })


            if(_.isArray(pageItem.second) && pageItem.second.length > 0) {
              showMenu(pageItem.second)
            }

          })
        }
        
        if ($.cookie("_cmsttk") === "ulifeadmin") {

          $(".cms-layout-left .panel-heading").removeClass("hide");
          $(".cms-layout-left .panel-collapse .list-group-item").removeClass("hide");


        } else {
          // 获取权限

          $.when(roleUserAuthorityService.sendRequest({}, true, false))
            .done(function(result) {
              
              ruAuthority = result.value;

              showMenu(ruAuthority);

            })
            .fail(function(code, errMsg) {
              window.location.href="/login.html";
            });
        }




        return ruAuthority

      }
    ]);
  });