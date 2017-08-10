/**
 * Created by Ulife on 2016/1/8.
 */
define([], function () {
    'use strict';

    var PREVIEW_LINK = {
        "h5home": "http://h5-dev.ucaiyuan.com/home.html?action=preview&cmsPageId=",
        "pchome": "http://www-dev.ucaiyuan.com/index?preview=",
        "h5channel": "http://h5-dev.ucaiyuan.com/channel.html?action=preview&id=",
        "pcchannel": "http://www-dev.ucaiyuan.com/channel/",
        "h5exchangeIndex": "http://h5-dev.365ulife.com/exchangeIndex.html?action=preview&cmsPageId=",
        "pcexchangeIndex": "http://www-dev.365ulife.com/exchangeIndex?action=preview&id="
    }

    var EVIEW_LINK = {
        "h5home": "http://h5-dev.ucaiyuan.com/home.html",
        "pchome": "http://www-dev.ucaiyuan.com/index",
        "h5channel": "http://h5-dev.ucaiyuan.com/channel.html?id=",
        "pcchannel": "http://www-dev.ucaiyuan.com/channel/",
        "h5exchangeIndex" : "http://h5-dev.365ulife.com/exchangeIndex.html",
        "pcexchangeIndex": "http://www-dev.365ulife.com/exchangeIndex?id="
    }

    return {
        setting:{
            "preview_links": PREVIEW_LINK,
            "view_links": EVIEW_LINK
        }
    };
});