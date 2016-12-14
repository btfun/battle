module.exports = function(config) {
  config.set({
         basePath: '',
         frameworks: ['mocha','chai'],
         plugins : [
            'karma-mocha',
            'karma-chai',
            'karma-coverage',
            'karma-chrome-launcher'
          ],
         files: ['./unit/*.js','./untest/*.js'],
         exclude: ['karma.conf.js'],
         reporters: ['progress'],
         port: 9876,
         colors: true,
         logLevel: config.LOG_INFO,
         autoWatch: true,
         browsers: ['Chrome'],
         captureTimeout: 60000,
         // if true, Karma captures browsers, runs the tests and exits
         singleRun: false,
         // how many browser should be started simultaneous
         concurrency: Infinity
     });
 };
