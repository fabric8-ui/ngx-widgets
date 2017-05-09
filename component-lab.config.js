const NgCliWebpackConfig = require('@angular/cli/models/webpack-config').NgCliWebpackConfig;

/**
 * Export a single configuration object
 */
module.exports = {
  /**
   * Webpack configuration object used to load your experiments
   */
  webpackConfig: require('./config/webpack.lab.js'),

/*
   webpackConfig: new NgCliWebpackConfig({
     target: 'development',
   }).config,
*/

  /**
   *  Host and port of the Component Lab webpack development server
   */
  host: 'localhost',
  port: 8080,

  /**
   * Additional list of files to include in the bundle
   */
  include: [],

  /**
   * Dictionary of suites. Each suite should be a lab configuration
   * module (see "Writing Experiments")
   */
  suites: {
    demo: './src/app/sort/lab/lab.module.ts'
  }
};
