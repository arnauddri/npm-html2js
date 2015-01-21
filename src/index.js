var CombinedStream = require('combined-stream')
var async          = require('async');
var fs             = require('fs');
var glob           = require('glob')
var jade           = require('jade');
var path           = require('path');
var through        = require('through2');
var util           = require('util');

var templateModule = fs.readFileSync(path.join(__dirname, './../tmpl/templateModule.tmpl'), 'utf-8');
var templateCache  = fs.readFileSync(path.join(__dirname, './../tmpl/templateCache.tmpl'), 'utf-8');

module.exports = function(opts, callback) {
  opts = opts || {}


  var filename   = 'template.js'

  var tplPath    = opts.tplPath || path.join(process.cwd(), '**/*.tpl.html')
  var output     = opts.output || path.join(process.cwd(), filename);
  var moduleName = opts.moduleName || 'app.template'
  var basePath   = opts.basePath;
  var quotes     = opts.quotes;
  var exclude    = opts.exclude || '';

  glob(tplPath, function (err, files) {
    if (err)
      throw new Error(err)

    var cs = CombinedStream.create()
    var tpl = [];

    async.eachSeries(
      files,
      function (file, done) {
        if (file.indexOf(exclude))
          return done();

        cs.append(fs.createReadStream(path.resolve(file)))
        done()
      },
      function (err) {
        if (err)
          throw err

        var filesIndex = 0;
        cs.pipe(through(function(chunk, enc, cb) {
          var route = files[filesIndex]

          var html = chunk.toString();

          if (basePath)
            route = route.replace(basePath + '/', '');
          if (route.indexOf('.jade'))
            html = jade.render(html, { pretty: true });

          html = html.replace(/'/g, '"');
          html = html.replace(/\r?\n/g, '\\n\' +\n    \'');

          //if (quotes)
            //html = html. replace("'", '"')

          var tmpl = util.format(templateCache, route, html)
          tpl.push(tmpl)

          filesIndex++

          cb();
        }))
      }
    )

    cs.on('end', function() {
      var template = util.format(templateModule, moduleName, tpl.join(''))
      fs.writeFileSync(output, template, 'utf8')

      if (callback)
        callback();
    })
  })
}
