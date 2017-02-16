'use strict';

/* eslint comma-dangle:[0, "only-multiline"] */

module.exports = {
  client: {
    lib: {
      css: [
        // bower:css
        'public/lib/bootstrap/dist/css/bootstrap.css',
        'public/lib/bootstrap/dist/css/bootstrap-theme.css',
        'public/lib/angular-ui-notification/dist/angular-ui-notification.css'
        // endbower
      ],
      js: [
        // bower:js
        'public/lib/angular/angular.js',
        'public/lib/angular-animate/angular-animate.js',
        'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
        'public/lib/ng-file-upload/ng-file-upload.js',
        'public/lib/angular-messages/angular-messages.js',
        'public/lib/angular-mocks/angular-mocks.js',
        'public/lib/angular-resource/angular-resource.js',
        'public/lib/angular-ui-notification/dist/angular-ui-notification.js',
        'public/lib/angular-ui-router/release/angular-ui-router.js',
        'public/lib/owasp-password-strength-test/owasp-password-strength-test.js',
        // endbower
      ],
      tests: ['public/lib/angular-mocks/angular-mocks.js']
    },
    css: [
      'public/assets/**/*.css'
    ],
    sass: [
      'client/**/*.scss'
    ],
    js: [
      'client/core/app/config.js',
      'client/core/app/init.js',
      'client/*/*.module.js',
      'client/**/*.js'
    ],
    img: [
      'modules/**/*/img/**/*.jpg',
      'modules/**/*/img/**/*.png',
      'modules/**/*/img/**/*.gif',
      'modules/**/*/img/**/*.svg'
    ],
    views: ['client/**/*.tpl.html'],
    templates: ['build/templates.js']
  },
  server: {
    gulpConfig: ['gulpfile.js'],
    allJS: ['server.js', 'config/**/*.js', '/server/**/*.js'],
    models: 'server/**/*.model.js',
    routes: ['server/!(core)/*.routes.js', 'server/core/**/*.routes.js'],
    sockets: 'server/**/sockets/**/*.js',
    config: ['server/**/*.config.js'],
    policies: 'server/**/*.policy.js',
    views: ['server/**/*.view.html']
  }
};
