/**
 * Created by Ulife on 2016/1/4.
 */
define(
    [
        'ulife.cms.module.myApp',
        'moment',
        'underscore',
        'ulife.api.cms.page.getModuleList',
        'ulife.api.cms.page.get',
        'ulife.api.cms.page.update',
        'ulife.api.cms.page.publish',
        'ulife.api.cms.page.sortModule',
        'ulife.api.cms.module.getLibrary',
        'ulife.api.cms.page.addModule',
        'ulife.api.cms.page.deleteModule',
        'ulife.api.cms.page.updateModuleName',

        'ulife.cms.directive.page.moduleSortable',
        'ulife.cms.directive.datetimepicker',
        'ulife.cms.directive.datepicker',
        'ulife.cms.directive.tooltip',
        'ulife.cms.directive.page.moduleDrag',
        'ulife.cms.directive.page.moduleDrop'
    ],
    function(app, moment, _, getPageModuleList, getPage, updatePage, publishPage, sortModulePage, getModuleLibrary, addModulePage, deleteModulePage, updateModuleNamePage) {

        getPageModuleList.injectTo(app);
        getPage.injectTo(app);
        updatePage.injectTo(app);
        publishPage.injectTo(app);
        sortModulePage.injectTo(app);
        getModuleLibrary.injectTo(app);
        addModulePage.injectTo(app);
        deleteModulePage.injectTo(app);
        updateModuleNamePage.injectTo(app);

        app.factory('pageEditService', [
            '$route',
            '$filter',
            'cmsPageGetModuleListService',
            'cmsPageGetService',
            'cmsPageUpdateService',
            'cmsPagePublishService',
            'cmsPageSortModuleService',
            'cmsModuleGetLibraryService',
            'cmsPageAddModuleService',
            'cmsPageDeleteModuleService',
            'cmsPageUpdateModuleNameService',
            function($route, $filter, cmsPageGetModuleListService, cmsPageGetService, cmsPageUpdateService, cmsPagePublishService, cmsPageSortModuleService, cmsModuleGetLibraryService, cmsPageAddModuleService, cmsPageDeleteModuleService, cmsPageUpdateModuleNameService) {

                var returnObj = {
                    "pageId": null,
                    "modules": {},
                    "moduleLibrary": {},
                    "addModule": function(newModule) {
                        var def = $.Deferred();
                        newModule.pageId = this.pageId;
                        $.when(cmsPageAddModuleService.sendRequest(newModule))
                            .done(function(result) {
                                def.resolve(result);
                            })
                        return def.promise();
                    },
                    "sortModule": function(ids, sorts) {
                        $.when(cmsPageSortModuleService.sendRequest({
                            ids:ids,
                            sorts: sorts
                        })).done(function() {})
                    },
                    "pageInfo": {},
                    "savePageInfo": function() {

                        this.pageInfo.elements = JSON.stringify(this.pageInfo.elements)
                        $.when(cmsPageUpdateService.sendRequest(this.pageInfo))
                            .done(function(result) {
                            })
                            .fail(function(err) {
                                alert(err.message);
                            });

                        this.pageInfo.elements = JSON.parse(this.pageInfo.elements)
                    },
                    "publish": function() {
                        $.when(cmsPagePublishService.sendRequest({
                            "pageId": this.pageId,
                            "startTime": 0
                        }))
                            .done(function() {
                                alert("发布成功!")
                            })
                            .fail(function() {
                                alert("发布失败！");
                            })
                    },
                    "moduleHandler": {
                        data: {},
                        index: 0,
                        edit: function(index) {
                            this.data = returnObj.modules.modules[index];
                            this.index = index;
                        },
                        save: function() {
                            $.when(cmsPageUpdateModuleNameService.sendRequest({
                                id:this.data.databindingId,
                                name: this.data.name
                            }));
                        },
                        delete: function() {
                            returnObj.modules.modules.splice(this.index, 1);
                            if (returnObj.modules.modules.length == 0) {
                                returnObj.modules.isNotExsit = true;
                            }
                            cmsPageDeleteModuleService.sendRequest({
                                id: this.data.databindingId
                            })
                        }
                    }

                }

                return {
                    "init": function() {
                        returnObj.pageId = $route.current.params.id;

                        var def = $.Deferred();

                        $.when(cmsPageGetService.sendRequest({
                                "pageId": returnObj.pageId
                            }),
                            cmsPageGetModuleListService.sendRequest({
                                "pageId": returnObj.pageId
                            }))
                            .done(function(pageInfo, modules) {
                                
                                if (pageInfo.elements) {
                                    pageInfo.elements = JSON.parse(pageInfo.elements)
                                    if (!_.isObject(pageInfo.elements) && !pageInfo.elements && pageInfo.elements != "") {
                                        pageInfo.elements = JSON.parse(pageInfo.elements)
                                    }
                                }
                                returnObj.pageInfo = pageInfo;

                                if (modules.value && modules.value.length > 0) {
                                    returnObj.modules = {
                                        "modules": modules.value,
                                        "isNotExsit": false
                                    };
                                } else {
                                    returnObj.modules = {
                                        "modules": modules.value,
                                        "isNotExsit": true
                                    };
                                }

                            })
                            .then(function(pageInfo) {
                                return cmsModuleGetLibraryService.sendRequest({
                                    deviceId: pageInfo.deviceId
                                });
                            })
                            .done(function(moduleLib) {
                                returnObj.moduleLibrary = moduleLib.value;

                                def.resolve(returnObj);
                            })
                            .fail(function(){
                            })

                        return def.promise();
                    }
                }

            }
        ]);
    });