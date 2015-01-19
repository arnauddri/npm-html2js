/* globals describe, it */
'use strict';

var fs = require('fs');

var html2js = require('../src/index.js');
var path = require('path');

describe('html2js', function() {
  it('should work', function(done) {
    var opts ={
      isJade: true,
      extension: 'jade',
      tplPath: '**/*.tpl.jade',
      moduleName: 'template.js',
      filename: 'example/output/template.js',
      basePath: 'example/files',
      quotes: true,
      output: path.join(__dirname, 'output/template.js')
    }
    html2js(opts, function() {
      var output = fs.readFileSync(opts.output)
      done();
    });
  });
});
