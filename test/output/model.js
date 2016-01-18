angular.module('template.js', [])
  .run(['$templateCache', function($templateCache) {
    $templateCache.put('file1.tpl.jade',
    '<div><h1>Hello World from file1!</h1></div>');
  $templateCache.put('file2.tpl.jade',
    '<div><h1>Hello World from file2!</h1></div>');
  $templateCache.put('subfolder/subfile1.tpl.jade',
    '<div><h1>Hello World from subfile1!</h1></div>');
  $templateCache.put('subfolder/subfile2.tpl.jade',
    '<div><h1>Hello World from subfile2!</h1></div>');

  }]);
