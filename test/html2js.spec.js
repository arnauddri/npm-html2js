/* globals describe, it */
'use strict';

var expect = require('chai').expect
var fs = require('fs');

var html2js = require('../src/index.js');
var path = require('path');
var model = fs.readFileSync(path.join(__dirname, 'output/model.js'))

describe('html2js', function() {
  it('should produce the expected js', function(done) {
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
      expect(output.toString() === model.toString()).to.be.true;
      done();
    });
  });
});
