/* globals describe, it */
'use strict';

var fs = require('fs');

var html2js = require('../src/index.js');
var path = require('path');

describe('html2js', function() {
  it('should work', function() {
    var opts ={
      isJade: true,
      extension: 'jade',
      tplPath: '**/*.tpl.jade',
      moduleName: 'template.js',
      filename: 'example/output/template.js',
      basePath: 'example',
      quotes: true,
      output: path.join(__dirname, 'template.js')
    }
    html2js(opts);
  });
});
