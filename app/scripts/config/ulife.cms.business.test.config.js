/**
 * Created by Ulife on 2016/1/8.
 */
define([], function () {
    'use strict';

    var PREVIEW_LINK = {
        "h5home": "http://h5-test.ucaiyuan.com/home.html?action=preview&cmsPageId=",
        "pchome": "http://www-test.ucaiyuan.com/index?preview=",
        "h5channel": "http://h5-test.ucaiyuan.com/channel.html?action=preview&id=",
        "pcchannel": "http://www-test.ucaiyuan.com/channel/",
        "h5exchangeIndex": "http://h5-test.365ulife.com/exchangeIndex.html?action=preview&cmsPageId=",
        "pcexchangeIndex": "http://www-test.365ulife.com/exchangeIndex?action=preview&id="
    }


    var EVIEW_LINK = {
        "h5home": "http://h5-test.ucaiyuan.com/home.html",
        "pchome": "http://www-test.ucaiyuan.com/index",
        "h5channel": "http://h5-test.ucaiyuan.com/channel.html?id=",
        "pcchannel": "http://www-test.ucaiyuan.com/channel/",
        "h5exchangeIndex" : "http://h5-test.365ulife.com/exchangeIndex.html",
        "pcexchangeIndex": "http://www-test.365ulife.com/exchangeIndex?id="
    }

    return {
        setting:{
            "preview_links": PREVIEW_LINK,
            "view_links": EVIEW_LINK
        }
    };
});