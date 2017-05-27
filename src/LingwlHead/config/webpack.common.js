/**
 * @author: @dima1034
 */

const webpack = require('webpack');
const helpers = require('./helpers');

/*
 * Webpack Plugins
 */
// problem with copy-webpack-plugin
const AssetsPlugin = require('assets-webpack-plugin');
const NormalModuleReplacementPlugin = require('webpack/lib/NormalModuleReplacementPlugin');
const NoEmitOnErrorsPlugin = require("webpack/lib/NoEmitOnErrorsPlugin");
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const ngcWebpack = require('ngc-webpack');
const HtmlElementsPlugin = require('./html-elements-plugin');
const DebugWebpackPlugin = require('debug-webpack-plugin');

const HMR = helpers.hasProcessFlag('hot');
const AOT = helpers.hasNpmFlag('aot');
const METADATA = {
      title: 'Angular2 Webpack Starter by gdi2290 from dima1034',
      baseUrl: '/',
      isDevServer: helpers.isWebpackDevServer()
};
/*
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */
module.exports = function (options) {
      isProd = options.env === 'production';
      return {
            /*
             * Cache generated modules and chunks to improve performance for multiple incremental builds.
             * This is enabled by default in watch mode.
             * You can pass false to disable it.
             *
             * See: http://webpack.github.io/docs/configuration.html#cache
             */
            //cache: false,

            /*
             * The entry point for the bundle
             * Our Angular.js app
             *
             * See: http://webpack.github.io/docs/configuration.html#entry
             */
            entry: {
                  'polyfills': './wwwroot/src/polyfills.ts',
                  'main': AOT ? './wwwroot/src/main.aot.ts' : './wwwroot/src/main.ts'
            },
            /*
             * Options affecting the resolving of modules.
             * Параметры влияющие на разрешение (поиск) модулей
             *
             * See: http://webpack.github.io/docs/configuration.html#resolve
             */
            resolve: {

                  /*
                   * An array of extensions that should be used to resolve modules.
                   *
                   * See: http://webpack.github.io/docs/configuration.html#resolve-extensions
                   */
                  extensions: ['.ts', '.js', '.json'],
                  //extensions: ['.ts', '.js', '.json', '.scss', '.less', '.css'],

                  //(OLD) An array of directory names to be resolved to the current directory
                  //(NEW) Tell webpack what directories should be searched when resolving modules
                  //для поиска в первую очередь (поиск с приоритетом) в какой-то директории используеться второй аргумент
                  modules: [helpers.wwwroot('src'), helpers.root('node_modules')],

            },
            /*
             * Options affecting the normal modules.
             *
             * See: http://webpack.github.io/docs/configuration.html#module
             */
            module: {

                  rules: [

                        /*
                         * Typescript loader support for .ts
                         *
                         * Component Template/Style integration using `angular2-template-loader`
                         * Angular 2 lazy loading (async routes) via `ng-router-loader`
                         *
                         * `ng-router-loader` expects vanilla JavaScript code, not TypeScript code. This is why the
                         * order of the loader matter.
                         *
                         * See: https://github.com/s-panferov/awesome-typescript-loader
                         * See: https://github.com/TheLarkInn/angular2-template-loader
                         * See: https://github.com/shlomiassaf/ng-router-loader
                         */
                        {
                              test: /\.ts$/,
                              use: [{
                                          loader: '@angularclass/hmr-loader',
                                          options: {
                                                pretty: !isProd,
                                                prod: isProd
                                          }
                                    },
                                    { // MAKE SURE TO CHAIN VANILLA JS CODE, I.E. TS COMPILATION OUTPUT.
                                          loader: 'ng-router-loader',
                                          options: {
                                                loader: 'async-import',
                                                genDir: 'compiled',
                                                aot: AOT
                                          }
                                    }, {
                                          loader: 'awesome-typescript-loader',
                                          options: {
                                                configFileName: 'tsconfig.webpack.json'
                                          }
                                    }, {
                                          loader: 'angular2-template-loader'
                                    }, {
                                          loader: 'angular-router-loader'
                                    }, {
                                          loader: 'angular2-template-loader'
                                    }

                              ],
                              exclude: [/\.(spec|e2e)\.ts$/]
                        },
                        /*
                         * Json loader support for *.json files.
                         *
                         * See: https://github.com/webpack/json-loader
                         */
                        {
                              test: /\.json$/,
                              use: 'json-loader'
                        },

                        /*
                         * to string and css loader support for *.css files (from Angular components)
                         * Returns file content as string
                         *
                         */
                        {
                              test: /\.css$/,
                              use: ['to-string-loader', 'css-loader'],
                              exclude: [helpers.root('node_modules')]
                              //exclude: [helpers.wwwroot('src/styles')]
                        },

                        /*
                         * to string and sass loader support for *.scss files (from Angular components)
                         * Returns compiled css content as string
                         *
                         */
                        {
                              test: /\.scss$/,
                              use: ['to-string-loader', 'css-loader', 'sass-loader'],
                              exclude: [helpers.root('node_modules')]
                              //exclude: [helpers.wwwroot('src/styles')]                              
                        },

                        /* Raw loader support for *.html
                         * Returns file content as string
                         *
                         * See: https://github.com/webpack/raw-loader
                         */
                        {
                              test: /\.html$/,
                              use: 'raw-loader',
                              exclude: [helpers.wwwroot('src/index.html')]
                        },

                        /* 
                         * File loader for supporting images, for example, in CSS files.
                         */
                        {
                              test: /\.(jpg|png|gif)$/,
                              use: 'file-loader'
                        },

                        /* File loader for supporting fonts, for example, in CSS files.
                         */
                        {
                              test: /\.(eot|woff2?|svg|ttf)([\?]?.*)$/,
                              use: 'file-loader'
                        }

                  ],

            },

            /*
             * Add additional plugins to the compiler.
             *
             * See: http://webpack.github.io/docs/configuration.html#plugins
             */
            plugins: [
                  new AssetsPlugin({
                        path: helpers.wwwroot('dist'),
                        filename: 'webpack-assets.json',
                        prettyPrint: true
                  }),

                  /*
                   * Plugin: ForkCheckerPlugin
                   * Description: Do type checking in a separate process, so webpack don't need to wait.
                   *
                   * See: https://github.com/s-panferov/awesome-typescript-loader#forkchecker-boolean-defaultfalse
                   */
                  new CheckerPlugin(),
                  /*
                   * Plugin: CommonsChunkPlugin
                   * Description: Shares common code between the pages.
                   * It identifies common modules and put them into a commons chunk.
                   *
                   * See: https://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin
                   * See: https://github.com/webpack/docs/wiki/optimization#multi-page-app
                   */
                  new CommonsChunkPlugin({
                        //имя сборки
                        name: 'polyfills',
                        chunks: ['polyfills']
                  }),
                  // This enables tree shaking of the vendor modules
                  new CommonsChunkPlugin({

                        name: 'vendor',
                        //явно указываем из каких модулей нужно выносить общий функционал
                        chunks: ['main'],
                        //выносим все модули которые используються хотя бы в @minChunks@ количестве (usually: 2) -> 
                        //тоесть общий код для хотя бы 2-х модулей
                        //или задаем функцию которая будет решать что включать в сборку, а что упустить

                        //vendor pass chunk for node_modules inside 
                        minChunks: (module, count) => /node_modules/.test(module.resource)
                  }),
                  // Specify the correct order the scripts will be injected in
                  new CommonsChunkPlugin({
                        // The order of this array matters
                        name: ['polyfills', 'vendor'].reverse()
                  }),

                  /**
                   * Plugin: ContextReplacementPlugin
                   * Description: Provides context to Angular's use of System.import
                   *
                   * See: https://webpack.github.io/docs/list-of-plugins.html#contextreplacementplugin
                   * See: https://github.com/angular/angular/issues/11580
                   */
                  new ContextReplacementPlugin(
                        // The (\\|\/) piece accounts for path separators in *nix and Windows
                        /angular(\\|\/)core(\\|\/)src(\\|\/)linker/,
                        helpers.wwwroot('src'), // location of your src
                        {
                              // your Angular Async Route paths relative to this root directory
                        }
                  ),

                  /*
                   * Plugin: CopyWebpackPlugin
                   * Description: Copy files and directories in webpack.
                   *
                   * Copies project static assets.
                   *
                   * See: https://www.npmjs.com/package/copy-webpack-plugin
                   */
                  new CopyWebpackPlugin([{
                              from: 'wwwroot/src/assets',
                              to: 'assets'
                        },
                        {
                              from: 'wwwroot/src/meta'
                        }
                  ]),

                  /*
                   * Plugin: HtmlWebpackPlugin
                   * Description: Simplifies creation of HTML files to serve your webpack bundles.
                   * This is especially useful for webpack bundles that include a hash in the filename
                   * which changes every compilation.
                   *
                   * See: https://github.com/ampedandwired/html-webpack-plugin
                   */
                  new HtmlWebpackPlugin({
                        template: 'wwwroot/src/index.html',
                        title: METADATA.title,
                        chunksSortMode: 'dependency',
                        metadata: METADATA,
                        inject: 'head'
                  }),
                  new HtmlWebpackPlugin({
                        template: 'wwwroot/src/Index.cshtml',
                        filename: '../../Views/Home/Index.cshtml',
                        title: METADATA.title,
                        chunksSortMode: 'dependency',
                        metadata: METADATA,
						inject: false
                  }),

                  /*
                   * Plugin: ScriptExtHtmlWebpackPlugin
                   * Description: Enhances html-webpack-plugin functionality
                   * with different deployment options for your scripts including:
                   *
                   * See: https://github.com/numical/script-ext-html-webpack-plugin
                   */
                  new ScriptExtHtmlWebpackPlugin({
                        defaultAttribute: 'defer'
                  }),

                  /*
                   * Plugin: HtmlElementsPlugin
                   * Description: Generate html tags based on javascript maps.
                   *
                   * If a publicPath is set in the webpack output configuration, it will be automatically added to
                   * href attributes, you can disable that by adding a "=href": false property.
                   * You can also enable it to other attribute by settings "=attName": true.
                   *
                   * The configuration supplied is map between a location (key) and an element definition object (value)
                   * The location (key) is then exported to the template under then htmlElements property in webpack configuration.
                   *
                   * Example:
                   *  Adding this plugin configuration
                   *  new HtmlElementsPlugin({
                   *    headTags: { ... }
                   *  })
                   *
                   *  Means we can use it in the template like this:
                   *  <%= webpackConfig.htmlElements.headTags %>
                   *
                   * Dependencies: HtmlWebpackPlugin
                   */
                  new HtmlElementsPlugin({
                        headTags: require('./head-config.common')
                  }),

                  /**
                   * Plugin LoaderOptionsPlugin (experimental)
                   *
                   * See: https://gist.github.com/sokra/27b24881210b56bbaff7
                   */
                  new LoaderOptionsPlugin({}),

                  /**
                   * Plugin: CopyWebpackPlugin
                   * Description: The NormalModuleReplacementPlugin allows you to replace resources that match resourceRegExp with newResource
                   */

                  // Fix Angular 2
                  new NormalModuleReplacementPlugin(
                        /facade(\\|\/)async/,
                        helpers.root('node_modules/@angular/core/src/facade/async.js')
                  ),
                  new NormalModuleReplacementPlugin(
                        /facade(\\|\/)collection/,
                        helpers.root('node_modules/@angular/core/src/facade/collection.js')
                  ),
                  new NormalModuleReplacementPlugin(
                        /facade(\\|\/)errors/,
                        helpers.root('node_modules/@angular/core/src/facade/errors.js')
                  ),
                  new NormalModuleReplacementPlugin(
                        /facade(\\|\/)lang/,
                        helpers.root('node_modules/@angular/core/src/facade/lang.js')
                  ),
                  new NormalModuleReplacementPlugin(
                        /facade(\\|\/)math/,
                        helpers.root('node_modules/@angular/core/src/facade/math.js')
                  ),

                  new ngcWebpack.NgcWebpackPlugin({
                        disabled: !AOT,
                        tsConfig: helpers.root('tsconfig.webpack.json'),
                        resourceOverride: helpers.root('config/resource-override.js')
                  }),

                  // new DebugWebpackPlugin({
                  //       // Defaults to ['webpack:*'] which can be VERY noisy, so try to be specific
                  //       scope: [
                  //             'webpack:compiler: *', //include compiler logs
                  //             'webpack:plugin:HtmlElementsPlugin' // include a specific plugin's logs
                  //       ],
                  //       // Inspect the arguments passed to an event
                  //       // These are triggered on emits
                  //       listeners: {
                  //             'webpack:compiler:run': function (compiler) {
                  //                   // Read some data out of the compiler
                  //                   console.log(compiler);
                  //             }
                  //       },
                  //       // Defaults to the compiler's setting
                  //       debug: true
                  // }), 

                  new webpack.ProvidePlugin({
                        _: 'lodash'
                  }),

                  //new NoEmitOnErrorsPlugin()

            ],

            /*
             * Include polyfills or mocks for various node stuff
             * Description: Node configuration
             *
             * See: https://webpack.github.io/docs/configuration.html#node
             */
            node: {
                  global: true,
                  crypto: 'empty',
                  process: true,
                  module: false,
                  clearImmediate: false,
                  setImmediate: false
            }

      };
}