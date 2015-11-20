'use strict';

var fs = require('fs'),
    _ = require('lodash');

module.exports = function (grunt) {

    grunt.registerMultiTask('domain', 'Generate domain.js for client', function () {
        var data = grunt.util._.clone(this.data);
        delete data.src;
        var debug = data.debug || false;
        var env = data.env || '';
        var path = data.path || 'client/ko/lib/data/domain.js';

        fs.writeFileSync(path, 'if (typeof my_web === \'undefined\') { my_web = {}; }');
        fs.appendFileSync(path, 'if (typeof my_web.domain === \'undefined\') { my_web.domain = {}; }');

        if (debug) {
            fs.appendFileSync(path, 'my_web.domain.home = \'http://gumabae.iptime.org\';');

        } else {
            fs.appendFileSync(path, 'my_web.domain.home = \'http://gumabae.iptime.org\';');
        }

        grunt.log.ok(JSON.stringify(data));
    });

};
