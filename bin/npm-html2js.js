#!/usr/bin/env node
var fs             = require('fs');
var path           = require('path');

var html2js = require('./../src/index.js');

var args = process.argv.slice(2);

var isJade = false;

var templateModule = fs.readFileSync(path.join(__dirname, './../tmpl/templateModule.tmpl'), 'utf-8');
var templateCache  = fs.readFileSync(path.join(__dirname, './../tmpl/templateCache.tmpl'), 'utf-8');
var usage          = fs.readFileSync(path.join(__dirname, './../tmpl/usage.md')).toString()

var filename;
var extension  = 'html';
var tplPath    = '**/*.tpl.'
var moduleName = 'app.template'

var arg;
while (args.length) {
  arg = args.shift();
  switch (arg) {
    case '-h':
    case '--help':
      console.error(usage);
      process.exit(0);
      break;
    case '-j':
    case '--jade':
      isJade = true
      extension = (isJade) ? 'jade' : 'html';
      break;
    case '-i':
    case '--input':
      tplPath = args.shift()
      break;
    case '-o':
    case '--output':
      filename = args.shift()
      break;
    case '-m':
    case '--module':
      moduleName = args.shift()
      break;
    default:
      break;
  }
}

var output = (filename) ? path.join(process.cwd(), filename) : null

tplPath = ('**/*.tpl.') ?  tplPath + extension : tplPath;

html2js(tplPath, output, moduleName, isJade)
