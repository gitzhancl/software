/**
 * Created by Zhangke on 2015/11/12.
 */

var _ = require('underscore');
var request = require('request');
var Mustache = require('mustache');

var PREFIX = 'ulife.api.';
var ROOT_PATH = './autogen/requireConfig/';
var APP_PATH = './app/'
var SCRIPTS_PATH = 'scripts/';
//var APP_PATH + SCRIPTS_PATH = './autogen/requireConfig/';

var MUSTACHE = 'config.mustache';

var SOURCE = [
    { 'dirname': SCRIPTS_PATH + 'api' },
    { 'dirname': SCRIPTS_PATH + 'module' },
    { 'dirname': SCRIPTS_PATH + 'page' },
    { 'dirname': SCRIPTS_PATH + 'util' },
    { 'dirname': SCRIPTS_PATH + 'controller' },
    { 'dirname': SCRIPTS_PATH + 'directive' },
    { 'dirname': SCRIPTS_PATH + 'service' },
    { 'dirname': SCRIPTS_PATH + 'route' },
    { 'dirname': 'views' }
]

function createConfig(grunt, done) {
    var configTpl = grunt.file.read(ROOT_PATH +  MUSTACHE, {
        encoding: 'utf8'
    });

    grunt.log.ok('开始:');

    var data = [];
    for(var i = 0; i < SOURCE.length; i++ ) {
        var dirname = APP_PATH + SOURCE[i].dirname;
        var filter = APP_PATH + SOURCE[i].filter;
        data.push({});
        grunt.file.recurse(dirname, function callback(abspath, rootdir, subdir, filename) {
            if (filter && filter.length > 0) {
                if (_.indexOf(filter, filename) != -1) {
                    return;
                }
            }

            var tmp = {
                "filename": filename,
                "ext": "." + filename.replace(/.+\./, ""),
                "name": filename.replace(/\.\w+$/,''),
                "dirname": dirname.replace(/\.\/app\//,''),
                "subdir": subdir,
                "isJs": true
            };
            //grunt.log.ok(tmp.dirname);
            if (tmp.dirname == "views") {
                return;
                tmp.isJs = false;
                var nameArr = tmp.name.split(".");
                tmp.moduleName = nameArr[3];
            }
            data.push(tmp)
        });
        if (i == SOURCE.length - 1) {
            data[data.length - 1].last = true;
        }
    }
    var fileContent = Mustache.render(configTpl, {"data": data});
    grunt.file.write(APP_PATH + SCRIPTS_PATH  + 'ulife.cms.require.config.js', fileContent);
    grunt.log.ok(APP_PATH + SCRIPTS_PATH  + 'ulife.cms.require.config.js');

    done();
}

/**
 * @description 从不同的source中获得所有的API接口
 */
function autogen(grunt, done) {
    createConfig(grunt, done)
}

exports.autogen = autogen;