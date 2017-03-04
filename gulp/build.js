'use strict';

const fs = require('fs');
const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const templateCache = require('gulp-angular-templatecache');
const endOfLine = require('os').EOL;
const defaultAssets = require('../config/assets/default');

// Imagemin task
gulp.task('imagemin', function() {
  return gulp.src(defaultAssets.client.img)
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{
        removeViewBox: false
      }],
      use: [pngquant()]
    }))
    .pipe(gulp.dest('public/dist/img'));
});


// Make sure upload directory exists
gulp.task('makeUploadsDir', function() {
  return fs.mkdir('public/uploads', function(err) {
    if (err && err.code !== 'EEXIST') {
      console.error(err);
    }
  });
});

// Angular template cache task
gulp.task('templatecache', function() {
  return gulp.src(defaultAssets.client.views)
    .pipe(templateCache('templates.js', {
      root: 'modules/',
      module: 'core',
      templateHeader: '(function () {' + endOfLine + '  \'use strict\';' + endOfLine + endOfLine + '  angular' + endOfLine + '    .module(\'<%= module %>\'<%= standalone %>)' + endOfLine + '    .run(templates);' + endOfLine + endOfLine + '  templates.$inject = [\'$templateCache\'];' + endOfLine + endOfLine + '  function templates($templateCache) {' + endOfLine,
      templateBody: '    $templateCache.put(\'<%= url %>\', \'<%= contents %>\');',
      templateFooter: '  }' + endOfLine + '})();' + endOfLine
    }))
    .pipe(gulp.dest('public/assets'));
});
