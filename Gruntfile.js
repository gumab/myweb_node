'use strict';

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);
  grunt.loadTasks('lib/grunt-domain/tasks');

  grunt.initConfig({

      env: {
        dev: {
          NODE_ENV: 'local'
        },
        dist: {
          NOVA_ENV: 'production'
        }
      },

      // ================================================================
      // Nova options
      // ================================================================
      myweb: {
        app: '.',
        dist: 'dist'
      },


      // ================================================================
      // Grunt-express options (dev)
      // ================================================================
      express: {
        options: {
          NODE_ENV: 'local',
          NODE_PORT: 8080,
          NODE_LANG: 'ko'
        },
        dev: {
          options: {
            script: 'server/server.js',
            debug: true
          }
        }
      },


      // ================================================================
      // Open options (dev)
      // ================================================================
      open: {
        express: {
          url: 'http://gumabae.iptime.org/web'
        }
      },


      // ================================================================
      // Empties folders to start refresh
      // ================================================================
      clean: {
        dist: {
          files: [
            {
              dot: true,
              src: [
                '.tmp',
                'dist/**/*'
              ]
            }
          ]
        },
        server: '.tmp'
      },


      // ================================================================
      // domain.js (web.config)
      // ================================================================
      domain: {
        dev: {
          debug: true,
          env: 'dev'
        },
        dist: {
          debug: false
        }
      },

      // ================================================================
      // Make sure code styles are up to par and there are no obvious mistakes
      // ================================================================

      jshint: {
        client: {
          options: {
            jshintrc: 'client/.jshintrc'
          },
          src: [
            'client/**/*.js',
            '!client/bower_components/**/*.js',
            '!client/**/lib/**/*.js'
          ]
        },
        server: {
          options: {
            jshintrc: 'server/.jshintrc'
          },
          src: [
            'server/**/*.js'
          ]
        }
      },


      replace: {
        dist: {
          options: {
            patterns: [
              {
                match: /@@include\('(.*?)'\)/g,
                replacement: function (match, first) {
                  return grunt.file.read(path.join('.tmp/client/null', first));
                }
              },
              // UXE 요청 사항 => span.dash 앞뒤에 있는 white space 제거
              {
                match: /> <span class="dash">-<\/span> </g,
                replacement: '><span class="dash">-</span><'
              }
            ],
            usePrefix: false
          },
          files: [{
            expand: true,
            src: ['.tmp/client/**/*.html']
          }]
        }
      },


      // ================================================================
      // Converts AngularJs templates to JavaScript
      // ================================================================
      html2js: {
        web: {
          options: {
            base: 'client/web',
            singleModule: true,
            htmlmin: {
              collapseWhitespace: true,
              minifyJS: false,
              removeComments: true
            },
            src: ['client/web/**/*.html'],
            dest: 'dist/client/web/templates.js'
          }
        }
      },


      // ================================================================
      // Reads HTML for usemin blocks to enable smart builds that automatically
      // concat, minify and revision files. Creates configurations in memory so
      // additional tasks can operate on them
      // ================================================================
      useminPrepare: {
        html: [
          '<%=myweb.app%>/client/web/**/*.html'
        ],
        options: {
          root: '<%=myweb.app%>/client',
          dest: '<%=myweb.dist%>/client'
        }
      },


      // ================================================================
      // uglify
      // ================================================================
      uglify: {
        options: {
          mangle: false,
          sourceMap: true,
          sourceMapIncludeSources: true
        }
      },


      // ================================================================
      // minify
      // ================================================================
      usemin: {
        html: [
          '.tmp/client/*/index*.html'
        ]
      },


      // ================================================================
      // Copy remaining files
      // ================================================================
      copy: {
        dist: {
          files: [
            {
              expand: true,
              dot: true,
              cwd: '<%=myweb.app%>/client',
              dest: '<%=myweb.dist%>/client',
              src: [
                '**/*.html',
                '**/*.js' // temp coy for hyun
              ]
            },
            {
              expand: true,
              dot: true,
              cwd: '<%=myweb.app%>/server',
              dest: '<%=myweb.dist%>/server',
              src: [
                '**/*'
              ]
            }
          ]
        }
      },

      // ================================================================
      // Run some tasks in parallel to speed up the build process
      // ================================================================

      concurrent: {
        dist: ['jshint', 'copy:dist', 'compressjs', 'html2js']
      },


      // ================================================================
      // Watch options (dev)
      // ================================================================
      watch: {
        gruntfile: {
          files: ['Gruntfile.js']
        },
        html: {
          files: ['<%=myweb.app%>/client/**/*.html'],
          tasks: ['html2js', 'wait']
        },
        js: {
          files: [
            '<%=myweb.app%>/client/**/*.js',
            '!<%=myweb.app%>/client/*/data/templates-*.js'
          ],
          tasks: ['newer:jshint:client']
        },
        express: {
          files: [
            'server/server.js',
            'server/config/**/*.js',
            'server/routes/**/*.js'
          ],
          tasks: ['newer:jshint:server', 'express:dev', 'wait'],
          options: {
            spawn: false
          }
        }
      }
    }
  );


  // Used for delaying livereload until after server has restarted
  grunt.registerTask('wait', function () {
    grunt.log.ok('Waiting for server reloaded...');

    var done = this.async();

    setTimeout(function () {
      grunt.log.writeln('Done waiting!');
      done();
    }, 500);
  });


  grunt.registerTask('compressjs', [
    'useminPrepare',
    'concat:generated',
    'uglify:generated',
    'usemin'
  ]);


  grunt.registerTask('server', function () {
    grunt.task.run([
      'jshint',
      'domain:dev',
      //'html2js',
      //'open:express',
      'express:dev',
      'watch'
    ]);
  });


  grunt.registerTask('devbuild', [
    'clean:dist',
    'domain:dev',
    'html2js',
    'useminPrepare',
    'copy:dist',
    'concat:generated',
    'uglify:generated',
    'usemin'
  ]);
};
