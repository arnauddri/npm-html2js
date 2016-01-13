var async = require('async');
var fs = require('fs');
var glob = require('glob')
var jade = require('jade');
var path = require('path');
var util = require('util');
var htmlmin = require('htmlmin');

var templateModule = fs.readFileSync(path.join(__dirname, './../tmpl/templateModule.tmpl'), 'utf-8');
var templateCache = fs.readFileSync(path.join(__dirname, './../tmpl/templateCache.tmpl'), 'utf-8');

module.exports = function (opts, callback) {
  opts = opts || {};

  var filename = 'template.js';

  var tplPath = opts.tplPath || path.join(process.cwd(), '**/*.tpl.html')
  var output = opts.output || path.join(process.cwd(), filename);
  var moduleName = opts.moduleName || 'app.template'
  var basePath = opts.basePath;
  var quotes = opts.quotes;
  var exclude = opts.exclude || '';
  var minify = opts.minify;

  function processFileData(route, html) {

    if (basePath)
      route = route.replace(basePath + '/', '');
    if (route.indexOf('.jade') !== -1)
      html = jade.render(html, {pretty: true});
    if (minify)
      html = htmlmin(html, {
        collapseBooleanAttributes: true,
        collapseWhitespace: true,
        removeComments: true
      });

    html = html.replace(/\\/g, '\\\\');
    html = html.replace(/'/g, '\\\'');
    html = html.replace(/\r?\n/g, '\\n\' +\n    \'');

    //if (quotes)
    //html = html. replace("'", '"')

    return util.format(templateCache, route, html)
  }

  glob(tplPath, function (err, files) {
    if (err) throw new Error(err);

    var tpl = [];

    async.each(

      files,

      function (file, callback) {
        if (file.indexOf(exclude)) return;
        var h = (function (f) {
          return function (err, data) {
            if (err) throw err;
            tpl.push(processFileData(f, data));
            callback();
          };
        }(file));
        fs.readFile(file, 'utf8', h);
      },

      function (err) {
        if (err) throw err;
        var template = util.format(templateModule, moduleName, tpl.join(''));
        fs.writeFileSync(output, template, 'utf8');
        if (callback) callback();
      }

    );
  })
};
