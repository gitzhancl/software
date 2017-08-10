/**
 * Created by Zhangke on 2015/11/12.
 */

var _ = require('underscore');
var request = require('request');
var Mustache = require('mustache');

var PREFIX = 'ulife.api.';
var ROOT_PATH = './autogen/apigen/';
var FILE_PATH = './app/scripts/api/';
var JOSNFILE_PATH = "/api.json";
//var FILE_PATH = './autogen/apigen/api/';
var SECURITY_LEVEL = ['UserLogin', 'None'];
var SECURITY_TYPE = {
    'UserLogin': 'SecurityType.UserLogin',
    'None': 'SecurityType.None'
};
var NORMAL_PARAM = ["isRequired", "name", "type"];

var API_MUSTACHE = 'api.mustache';

var SOURCE = [
    {
        name: 'ulife',
        src: 'http://gw-test.ucaiyuan.com/docs?json',
        filename: 'ulife.json',
        filterGroup: ['cms']
    }
];

function createJSON(grunt, done) {
    var count = 0;

    _.each(SOURCE, function(source, key, list) {
        var setting = {
            method: 'GET',
            url: source.src,
            gzip: true
        };

        request(setting, function(error, response, body) {
            count++;
            if (error) {
                return grunt.log.error(error);
            } else {
                grunt.log.ok('从服务端获得json索引文件:' + source.filename);
                grunt.file.write(ROOT_PATH + '/source/' + source.filename, body);
            }

            JOSNFILE_PATH = '/source/' + source.filename;
            if (count == SOURCE.length) {
                createAPI(grunt, done);
            }
        });
    });
}

function createAPI(grunt, done) {
    var apiTpl = grunt.file.read(ROOT_PATH +  API_MUSTACHE, {
        encoding: 'utf8'
    });

    grunt.log.ok('开始解析索引文件:api.json');

    var json = grunt.file.readJSON(ROOT_PATH + JOSNFILE_PATH, {
        encoding: 'utf8'
    });
    //grunt.file.delete(FILE_PATH);

    for (var i in json.apiList) {
        var it = json.apiList[i];
        if (it.parameterInfoList) {
            var info = it.parameterInfoList;
            it.requiredList = [];
            it.validList = [];
            if (_.isArray(info)) {

                //处理验证信息
                for(var infoIndex in info) {
                    //每个参数
                    var paramInfo = info[infoIndex];
                    var paramInfoLength = Object.getOwnPropertyNames(paramInfo).length;

                    if (paramInfo["isRequired"] === true) {
                        it.requiredList.push({
                            "name": paramInfo["name"]
                        });
                    }

                    /*
                    //验证条件
                    var tempArr = [{
                        "key": "isRequired",
                        "value": paramInfo["isRequired"]
                    }];
                    for(var paramInfoItem in paramInfo) {

                        if (_.indexOf(NORMAL_PARAM, paramInfoItem) == -1) {
                            tempArr.push({
                                "key": paramInfoItem,
                                "value": paramInfo[paramInfoItem]
                            })
                        }

                    }
                    tempArr[tempArr.length - 1]["last"] = true;

                    it.validList.push({
                        "name": paramInfo["name"],
                        "value": tempArr
                    })
                    */
                }

                if (info.length > 0) {
                    info[info.length - 1].last = true;
                }
            }

            /*
            if (it.validList.length > 0) {
                it.validList[it.validList.length - 1].last = true;
            }
            */
            if (it.requiredList.length > 0) {
                it.requiredList[it.requiredList.length - 1].last = true;
            }
        }

        if (it.errorCodeList) {
            var error = it.errorCodeList;

            if (_.isArray(error)) {
                error[error.length - 1].last = true;
            } else {
                error.last = true;
            }
        }

        it.securityType = SECURITY_TYPE[it.securityLevel];

        /*
        if (it.methodName.split(".").length >= 3) {
            it.serviceName = it.methodName.split(".")[2] + "." + it.methodName.split(".")[1];
        } else {
            it.serviceName = it.methodName.split(".")[1] + "." + it.methodName.split(".")[0];
        }
         it.serviceName = it.serviceName.replace(/\.([a-z])/, function($0, $1){
         return $1.toLocaleUpperCase();
         });
        */
        it.serviceName = it.methodName.replace(/\.([a-zA-Z])/, function($0, $1){
            return $1.toLocaleUpperCase();
        });
        it.serviceName = it.serviceName.replace(/\.([a-zA-Z])/, function($0, $1){
            return $1.toLocaleUpperCase();
        });
        it.serviceName = it.serviceName.replace(/\.([a-zA-Z])/, function($0, $1){
            return $1.toLocaleUpperCase();
        });
        it.serviceName = it.serviceName.replace(/\.([a-zA-Z])/, function($0, $1){
            return $1.toLocaleUpperCase();
        });
        it.serviceName = it.serviceName.replace(/\.([a-zA-Z])/, function($0, $1){
            return $1.toLocaleUpperCase();
        });


        if (it.mockReturnObject) {
            var mro = it.mockReturnObject;
            if (_.isArray(info) && info.length > 0) {
                info[info.length - 1].last = true;
            } else {
                info.last = true;
            }
        }

        var fileContent = Mustache.render(apiTpl, it);
        grunt.file.write(FILE_PATH  + PREFIX + it.methodName + '.js', fileContent);
        grunt.log.ok('File:  ' + PREFIX + it.methodName + '.js');
    }

    done();
}

/**
 * @description 从不同的source中获得所有的API接口
 */
function autogen(grunt, done) {
    createJSON(grunt, done);
    //createAPI(grunt, done)
}

exports.autogen = autogen;