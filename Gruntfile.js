/**
 * grunt build 打包开发环境H5
 * grunt create:api 根据autogen/apigen/api.json 文件生成 app/scripts/api 下的文件
 * grunt create:rconfig 生成ulife.b2c.h5.require.config.js 文件
 * grunt create 先执行 grunt create:api 在执行 grunt create:rconfig
 */


'use strict';

module.exports = function(grunt) {

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Configurable paths
    var config = {
        app: 'app',
        dist: 'dist',
        tmp: '.tmp',
        timestamp: Date.now(),
        version: ""
    };

    var testConfig = {
        ossHost: ''
    };


    // Define the configuration for all the tasks
    grunt.initConfig({

        // Project settings
        config: config,
        testConfig: testConfig,

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            bower: {
                files: ['bower.json'],
                tasks: ['wiredep']
            },
            js: {
                files: ['<%= config.app %>/js/{,*/}*.js'],
                tasks: ['jshint'],
                options: {
                    livereload: true
                }
            },
            gruntfile: {
                files: ['Gruntfile.js']
            },
            styles: {
                files: ['<%= config.app %>/css/{,*/}*.css'],
                tasks: ['newer:copy:styles']
            }
        },

        // Empties folders to start fresh
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        "dist"
                    ]
                }]
            },
            server: '.tmp'
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                '<%= config.app %>/js/{,*/}*.js'
            ]
        },

        // Add vendor prefixed styles
        autoprefixer: {
            options: {
                browsers: ['> 1%', 'last 10 versions', 'Firefox ESR', 'Opera 12.1']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/styles/',
                    src: '{,*/}*.css',
                    dest: '.tmp/styles/'
                }]
            }
        },

        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        useminPrepare: {
            options: {
                dest: '<%= config.dist %>',
                src: '<%= config.app %>'
            },
            html: [
                '<%= config.app %>/*.html'
            ]
        },

        // Performs rewrites based on rev and the useminPrepare configuration
        usemin: {
            options: {
                assetsDirs: [
                    '<%= config.dist %>',
                    '<%= config.dist %>/images',
                    '<%= config.dist %>/js',
                    '<%= config.dist %>/css'
                ],
                blockReplacements: {
                    js: function(block) {
                        if (config.version) {
                            if (block.dest[0] != '/') {
                                return '<script src="' + testConfig.ossHost + '/' + config.version + '/' + block.dest + '"></script>';
                            } else {
                                return '<script src="' + testConfig.ossHost + '/' + config.version + block.dest + '"></script>';
                            }
                        } else {
                            if (block.dest[0] != '/') {
                                return '<script src="' + '/' + block.dest + '"></script>';
                            } else {
                                return '<script src="' + block.dest + '"></script>';
                            }
                        }
                    },
                    css: function(block) {
                        if (config.version) {
                            if (block.dest[0] != '/') {
                                return '<link rel="stylesheet" href="' + testConfig.ossHost + '/' + config.version + '/' + block.dest + '">';
                            } else {
                                return '<link rel="stylesheet" href="' + testConfig.ossHost + '/' + config.version + block.dest + '">';
                            }
                        } else {
                            if (block.dest[0] != '/') {
                                return '<link rel="stylesheet" href="' + '/' + block.dest + '">';
                            } else {
                                return '<link rel="stylesheet" href="' + block.dest + '">';
                            }
                        }
                    },
                }
            },
            html: ['<%= config.dist %>/{,*/}*.html'],
            css: ['<%= config.dist %>/styles/{,*/}*.css']
        },


        // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    timestamp: true,
                    cwd: '<%= config.app %>',
                    dest: '<%= config.dist %>',
                    src: [
                        '*.{ico,png,txt}',
                        'images/{,*/}*.webp',
                        'json/{,*/}*.json',
                        'fonts/{,*/}*',
                        'docs/{,*/}*',
                        'styles/fonts/{,*/}*',
                        'views/{,*/}*.html',
                        'scripts/{,*/}*.js',
                        'scripts/*/{,*/}*.js',
                        'scripts/*/*/{,*/}*.js',
                        '!scripts/page/*.js',
                        '!scripts/module/*.js',
                        '!scripts/route/*.js',
                        '!scripts/service/ulife.cms.service.dependencyResolverFor.js',
                        '!scripts/base/*.js',
                        // '*.html',
                        'font/{,*/}*.*'
                    ]
                }]
            },

            base: {
                expand: true,
                dot: true,
                cwd: '<%= config.app %>/scripts/base',
                dest: '<%= config.dist %>/scripts',
                src: 'ulife.cms.base.<%= config.target %>.1.0.js'

            },

            html: {
                expand: true,
                dot: true,
                timestamp: true,
                cwd: '<%= config.app %>',
                dest: '<%= config.dist %>',
                src: [
                    '*.html',
                    'header/*.html',
                    'footer/*.html'
                ],
                options: {
                    process: function (content) {
                        return content;
                    }
                }
            },

            image: {
                expand: true,
                dot: true,
                timestamp: true,
                cwd: '<%= config.app %>',
                dest: '<%= config.dist %>',
                src: [
                    'images/{,*/}*.*',
                    'images/*/{,*/}*.*',
                    'images/*/*/{,*/}*.*',
                    'images/*/*/*/{,*/}*.*'
                ]
            },

            styles: {
                expand: true,
                dot: true,
                cwd: '.tmp/concat/styles',
                dest: '<%= config.dist %>/styles/',
                src: '{,*/}*.css'
            },

            test: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= config.dist %>/',
                    dest: '<%= config.dist %>/<%= config.version %>/',
                    src: [
                        'styles/{,*/}*.css',
                        'scripts/{,*/}*.js',
                        'images/**'
                    ]
                }]
            }
        },

        rename: {
            business: {
                files: [
                    {
                        src: ['<%= config.dist %>/scripts/config/ulife.cms.business.<%= config.target %>.config.js'],
                        dest: '<%= config.dist %>/scripts/config/ulife.cms.business.config.js'
                    }
                ]
            },
            base: {
                files: [
                    {
                        src: ['<%= config.dist %>/scripts/ulife.cms.base.<%= config.target %>.1.0.js'],
                        dest: '<%= config.dist %>/scripts/ulife.cms.base.js'
                    }
                ]
            }
        },

        compress: {
            test: {
                options: {
                    archive: '<%= config.dist %>/dist.zip',
                    store: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= config.dist %>',
                    src: ['**', "!app/scripts/**", "!app/styles/**"],
                    dest: 'dist'
                }]
            }
        },

        requirejs: {
            index: {
                options: {
                    optimize: 'none',
                    preserveLicenseComments: false,
                    baseUrl: './<%= config.app %>/',
                    out: './<%= config.tmp %>/concat/scripts/ulife.cms.index.js',
                    mainConfigFile: "./<%= config.app %>/scripts/ulife.cms.require.config.js",
                    paths: {
                        'text': './<%= config.app %>/scripts/vendor/text',
                        'ulife.cms.business.config': './<%= config.app %>/scripts/config/ulife.cms.business.<%= config.target %>.config'
                    },
                    include: ["JSON", "ulife.cms.page.index"],
                    insertRequire: ['ulife.cms.page.index']
                }
            },
            login: {
                options: {
                    optimize: 'none',
                    preserveLicenseComments: false,
                    baseUrl: './<%= config.app %>/',
                    out: './<%= config.tmp %>/concat/scripts/ulife.cms.login.js',
                    mainConfigFile: "./<%= config.app %>/scripts/ulife.cms.require.config.js",
                    paths: {
                        'text': './<%= config.app %>/scripts/vendor/text',
                        'ulife.cms.business.config': './<%= config.app %>/scripts/config/ulife.cms.business.<%= config.target %>.config'
                    },
                    include: ["JSON", "ulife.cms.page.login"],
                    insertRequire: ['ulife.cms.page.login']
                }
            }
        }
    });

    grunt.registerTask("useminirequire", function(target) {

        grunt.task.run([
            'useminPrepare',
            'concat',
            'requirejs',
            'uglify:generated',
            'cssmin:generated',
            'copy:html',
            //'copy:styles',
            'usemin'
        ]);
    });

    grunt.registerTask('build', function(target) {
        //标识环境
        if (target) {
            config.target = target;
        } else {
            config.target = "dev";
        }

        grunt.task.run([
            'clean:dist',
            'copy:image',
            'copy:dist',
            'useminirequire',
            'rename:business',
            'copy:base',
            'rename:base',
            'clean:server'
        ]);
    });


    grunt.registerTask('default', [
        'build'
    ]);

    grunt.registerTask('create', function (what, version) {
        if (what == 'api') {
            var generator = require('./autogen/apigen/apigen');
            var done = this.async();
            generator.autogen(grunt, done);
        } else if (what == 'rconfig') {
            var generator = require('./autogen/requireConfig/requireConfigGen');
            var done = this.async();
            generator.autogen(grunt, done);
        } else {
            var generator = require('./autogen/apigen/apigen');
            var done = function(){};
            generator.autogen(grunt, done);

            var generator2 = require('./autogen/requireConfig/requireConfigGen');
            generator2.autogen(grunt, done);
        }
    });

};
