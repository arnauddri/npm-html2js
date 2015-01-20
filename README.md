# npm-html2js [![Build Status](https://travis-ci.org/arnauddri/npm-html2js.svg?branch=master)](https://travis-ci.org/arnauddri/npm-html2js) 

Use npm as a build tool to load all your jade/html templates into your $templateCache.

```
$ npm-html2js -i 'src/**/*.jade' -o 'dist/template.js'
angular.module('template.js', []);
  .run(['$templateCache', function($templateCache) {
    .$templateCache.put('files/file1.tpl.jade',
    '<div>\n' +
    '  <h1>Hello World from file1!</h1>\n' +
    '</div>')
  .$templateCache.put('files/file2.tpl.jade',
    '<div>\n' +
    '  <h1>Hello World from file2!</h1>\n' +
    '</div>')
  .$templateCache.put('files/subfolder/subfile1.tpl.jade',
    '<div>\n' +
    '  <h1>Hello World from subfile1!</h1>\n' +
    '</div>')
  .$templateCache.put('files/subfolder/subfile2.tpl.jade',
    '<div>\n' +
    '  <h1>Hello World from subfile2!</h1>\n' +
    '</div>')
  }]);
```

### Options

##### Input

Path to your templates. The module supports globbing so you can use path like ```src/**/*.tpl.html```

**example:**
```
  npm-html2js -i 'files/**/*.tpl.html'
```

##### output

Path to the expected output file.

**example:**
```
  npm-html2js ... -o 'dist/template.js'
```

##### module

The name of the parent Angular module for each set of templates. Defaults to the task target prefixed by templates.js

**example:**
```
  npm-html2js ... -m 'myModule'
```

##### jade

if the filename ends with ```.jade```, the task will automatically render file's content using Jade then comile into JS

##### base

The prefix relative to the project directory that should be stripped from each template path to produce a module identifier for the template. For example, a template located at ```src/projects/projects.tpl.html``` would be identified as just ```projects/projects.tpl.html```.

**example:**
```
  npm-html2js ... -b 'src'
```

##### help

Display the command line options
