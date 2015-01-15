#!/usr/bin/env node
var CombinedStream = require('combined-stream')
var async          = require('async');
var fs             = require('fs');
var glob           = require('glob')
var jade           = require('jade');
var path           = require('path');
var through        = require('through2');
var util           = require('util');

var argv = require('yargs')
  .default('j', true)
  .describe('j', 'are templates jade files?')
  .boolean('j')
  .default('o', 'template.js')
  .describe('o', 'path to output file')
  .describe('i', 'path to source file')
  .argv

var isJade = argv.j

var templateModule = fs.readFileSync(path.join(__dirname, './../tmpl/templateModule.tmpl'), 'utf-8');
var templateCache  = fs.readFileSync(path.join(__dirname, './../tmpl/templateCache.tmpl'), 'utf-8');

var filename  = argv.o || 'template.js'
var extension = (isJade) ? 'jade' : 'html';
var tplPath   = argv.i || '**/*.tpl.' + extension
var file      = path.join(process.cwd(), filename);

glob(tplPath, function (er, files) {
  var cs = CombinedStream.create()
  var tpl = [];

  async.eachSeries(
    files,
    function (file, done) {
      cs.append(function (next) {
        next(fs.createReadStream(path.resolve(file)))
      })
      done()
    },
    function (err) {
      if (err)
        throw err

      cs.pipe(through(function(chunk, enc, cb) {
        var route = chunk.toString().split('\n')[0]
        var html = chunk.toString();
        html = html.replace(route, '')

        route = route.replace(/\/\/\ /g, '').replace(/'|"/g, '')

        if (isJade)
          html = jade.render(html, { pretty: true });

        html = html.replace(/\r?\n/g, '\\n\' +\n    \'');
        var tmpl = util.format(templateCache, route, html)
        tpl.push(tmpl)

        cb();
      }))
    }
  )

  cs.on('end', function() {
    var template = util.format(templateModule, 'app.template', tpl.join(''))
    fs.writeFileSync(file, template, 'utf8')
  })
})
