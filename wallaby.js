const wallabyWebpack = require('wallaby-webpack');
const angularTemplatePreprocessor = require('wallaby-ng-html2js-preprocessor');
const wallabyPostprocessor = wallabyWebpack({});

module.exports = function (wallaby) {
  return {
    files: [
      {
        pattern: 'src/**/*.html',
        load: false
      },
      {
        pattern: 'src/**/*.css',
        load: false
      },
      {
        pattern: 'src/**/*.ts',
        load: false
      },
      {
        pattern: 'src/**/*.spec.ts',
        ignore: true
      }
    ],

    tests: [{
      pattern: 'src/**/*.spec.ts',
      load: false
    }],

    testFramework: 'jasmine',

    preprocessors: {
      'src/**/*.html': function (file) {
        const html = file.content;
        return angularTemplatePreprocessor.transform(file, {stripPrefix: 'src/'})
          + '\nmodule.exports = ' + JSON.stringify(html) + ';';
      }
    },

    postprocessor: wallabyPostprocessor,

    setup: function () {
      // required to trigger test loading
      window.__moduleBundler.loadTests();
    },

    debug: true
  };
};
