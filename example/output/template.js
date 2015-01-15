angular.module('app.template', []);
  .run(['$templateCache', function($templateCache) {
    .$templateCache.put('template/file1.html',
    '\n' +
    '<div>\n' +
    '  <h1>Hello World from file1!</h1>\n' +
    '</div>')
  .$templateCache.put('template/file2.html',
    '\n' +
    '<div>\n' +
    '  <h1>Hello World from file2!</h1>\n' +
    '</div>')
  .$templateCache.put('template/subfile1.html',
    '\n' +
    '<div>\n' +
    '  <h1>Hello World from subfile1!</h1>\n' +
    '</div>')
  .$templateCache.put('template/subfile1.html',
    '\n' +
    '<div>\n' +
    '  <h1>Hello World from subfile2!</h1>\n' +
    '</div>')

  }]);
