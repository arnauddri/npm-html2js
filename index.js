var CombinedStream = require('combined-stream')
var async          = require('async');
var fs             = require('fs');
var glob           = require('glob')
var jade           = require('jade');
var path           = require('path');
var through        = require('through2');
var util           = require('util');

var templateModule = fs.readFileSync(path.join(__dirname, './tmpl/templateModule.tmpl'), 'utf-8');
var templateCache  = fs.readFileSync(path.join(__dirname, './tmpl/templateCache.tmpl'), 'utf-8');

function jade2js() {
  glob('**/*.tpl.jade', function (er, files) {
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
          route = route.replace(/\/\/\ /g, '').replace(/'|"/g, '')

          var html = chunk.toString();
          html = jade.render(chunk.toString(), { pretty: true });
          html = html.replace(/\r?\n/g, '\\n\' +\n    \'');

          var tmpl = util.format(templateCache, route, html)

          tpl.push(tmpl)

          cb();
        }))
      }
    )

    cs.on('end', function() {
      var template = util.format(templateModule, 'app.template', tpl.join(''))
      console.log(template);
    })
  })
}

module.exports = jade2js;
