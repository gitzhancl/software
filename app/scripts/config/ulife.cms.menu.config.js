/**
 * Created by Ulife on 2016/1/13.
 */
define([], function () {
    'use strict';


    var tabs = $("[role=tab]");


    var MENUS = {

    }
    _.each(tabs, function(tItem, tIndex, tList){
        var key = $(tItem).attr("id");
        var title = $.trim($(tItem).find(".panel-title").text())

        MENUS[key] = {
            "name": title,
            "sub": [{}]
        }

        var subItem = $(tItem).next("[role=tabpanel]").find("[ng-href]");
        _.each(subItem, function(sItem, sIndex, sList) {
            var subTitle = $.trim($(sItem).text());
            var subHref = $(sItem).attr("ng-href");
            MENUS[key].sub.push({
                "name": subTitle,
                "link": subHref
            })
        })
    })

    MENUS["content"].sub[1]["sub"] = [
        {
            "name": "首页编辑",
            "link": "index.html#/homepage/edit/"
        }
    ]

    MENUS["content"].sub[2]["sub"] = [
        {
            "name": "页面编辑",
            "link": "index.html#/page/edit/"
        }
    ]

    return {
        "menu": MENUS
    };
});