#!/usr/bin/env node
var fs             = require('fs');
var path           = require('path');

var html2js = require('./../src/index.js');

var args = process.argv.slice(2);


var templateModule = fs.readFileSync(path.join(__dirname, './../tmpl/templateModule.tmpl'), 'utf-8');
var templateCache  = fs.readFileSync(path.join(__dirname, './../tmpl/templateCache.tmpl'), 'utf-8');
var usage          = fs.readFileSync(path.join(__dirname, './../tmpl/usage.md')).toString()

var opts = {};
opts.isJade = false;
opts.extension  = 'html';
opts.tplPath    = '**/*.tpl.'
opts.moduleName = 'app.template'

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
      opts.isJade = true
      opts.extension = (opts.isJade) ? 'jade' : 'html';
      break;
    case '-i':
    case '--input':
      opts.tplPath = args.shift()
      break;
    case '-o':
    case '--output':
      opts.filename = args.shift()
      break;
    case '-m':
    case '--module':
      opts.moduleName = args.shift()
      break;
    case '-b':
    case '--base':
      opts.basePath = args.shift()
      break;
    case '-q':
    case '--quotes':
      opts.quotes = true
      break;
    default:
      break;
  }
}

opts.output = (opts.filename) ? path.join(process.cwd(), opts.filename) : null

opts.tplPath = ('**/*.tpl.') ?  opts.tplPath + opts.extension : opts.tplPath;

html2js(opts)
