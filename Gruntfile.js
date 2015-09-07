'use strict';

module.exports = function(grunt) {

  // Load NPM tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // Enter the name of the file for the dashboard you want to generate
  // The file needs to be located at /app/data/[yourFile].json
  // var dashboardName = 'sanitarium';
  // This function gets the json file and brings it into GRUNT
  // var dashboard = grunt.file.readJSON('./app/data/' + dashboardName + '.json');

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    clean: ['./public/*.*', './public/**/'],

    jade: {
      compile: {
        options: {
          pretty: true
        },
        files: [
          {
            expand: true,
            cwd: './app/',
            src: [
              'index.jade',
              'views/*.jade'
            ],
            dest: 'public/',
            ext: '.html'
          }
        ]
      }
    },

    less: {
      compile: {
        options: {
          compress: false,
          yuicompress: false,
          sourceMap: true
        },
        expand: true,
        flatten: true,
        cwd: './app/',
        src: ['assets/css/dashboards2/dashboards2.less'],
        dest: './public/assets/css',
        ext: '.css'
      }
    },

    uglify: {
      compile: {
        expand: true,
        cwd: './app/',
        src: [
          'index.js',
          'modules/**/*.js'
        ],
        dest: './public',
        ext: '.js'
      }
    },

    copy: {
      assets: {
        files: [{
          expand: true,
          cwd: './app/',
          src: 'data/*.json',
          dest: './public'
        }, {
          expand: true,
          cwd: './app/',
          src: 'assets/fonts/*.*',
          dest: './public'
        }, {
          expand: true,
          cwd: './app/',
          src: 'assets/css/*.css',
          dest: './public'
        }, {
          expand: true,
          cwd: './app/',
          src: [
            'assets/js/**/*.js'
          ],
          dest: './public'
        }, {
          expand: true,
          cwd: './app/',
          src: 'assets/images/*.*',
          dest: './public'
        }]
      }
    },

    develop: {
      server: {
        nodeArgs: ['--debug'],
        file: 'server.js',
        env: {
          NODE_ENV: 'development'
        }
      }
    },

    watch: {
      tasks: ['compile'],
      options: {
        livereload: 9000
      },
      files: [
        './app/*.*',
        './app/assets/css/**/*.*',
        './app/assets/font/*.*',
        './app/assets/images/**/*.*',
        './app/assets/js/*.*',
        './app/assets/js/vendor/*.*',
        './app/data/*.*',
        './app/layouts/**/*.*',
        './app/views/**/*.*'
      ]
    }

  });

  // Task to compile files
  grunt.registerTask('compile', ['clean', 'jade', 'less', 'uglify', 'copy']);

  // Default task - runs all other tasks then starts the server
  grunt.registerTask('default', ['compile', 'develop', 'watch']);

};
