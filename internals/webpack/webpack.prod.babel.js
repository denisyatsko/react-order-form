// Important modules this config uses
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OfflinePlugin = require('offline-plugin');
const { HashedModuleIdsPlugin } = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const loadPostCss = require('../modules/css');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = require('./webpack.base.babel')({
  mode: 'production',

  // In production, we skip all hot-reloading stuff
  entry: [
    require.resolve('react-app-polyfill/ie11'),
    path.join(process.cwd(), 'app/app.js'),
  ],

  // // Utilize long-term caching by adding content hashes (not compilation hashes) to compiled assets
  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].chunk.js',
    publicPath: './',
  },

  optimization: {
    minimize: false,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          warnings: false,
          compress: {
            comparisons: false,
          },
          parse: {},
          mangle: true,
          output: {
            comments: false,
            ascii_only: true,
          },
        },
        parallel: true,
        cache: true,
        sourceMap: true,
      }),
    ],
    nodeEnv: 'production',
    sideEffects: true,
    concatenateModules: true,
    splitChunks: {
      chunks: 'all',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: true,
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
        },
        main: {
          chunks: 'all',
          minChunks: 2,
          reuseExistingChunk: true,
          enforce: true,
        },
      },
    },
    runtimeChunk: true,
  },

  use: [
    'cache-loader',
    'style-loader',
    {
      loader: 'css-loader?url=false',
      options: {
        sourceMap: false,
        modules: true,
      },
    },
    loadPostCss({ sourceMap: false, minimize: true }),
  ],

  // use: [
  //   'cache-loader',
  //   {
  //     loader: MiniCssExtractPlugin.loader,
  //     options: {
  //       publicPath: '/public',
  //     },
  //   },
  //   {
  //     loader: 'css-loader?url=false',
  //     options: {
  //       sourceMap: false,
  //       modules: true,
  //     },
  //   },
  //   loadPostCss({ sourceMap: false, minimize: true }),
  // ],

  plugins: [
    // new MiniCssExtractPlugin({
    //   filename: 'public/css/style.css',
    //   ignoreOrder: false, // Enable to remove warnings about conflicting order
    // }),

    // Minify and optimize the index.html
    new HtmlWebpackPlugin({
      template: 'app/index.html',
      // styles: 'public/css/style.css',
      // minify: {
      //   removeComments: true,
      //   collapseWhitespace: true,
      //   removeRedundantAttributes: true,
      //   useShortDoctype: true,
      //   removeEmptyAttributes: true,
      //   removeStyleLinkTypeAttributes: true,
      //   keepClosingSlash: true,
      //   minifyJS: true,
      //   minifyCSS: true,
      //   minifyURLs: true,
      // },
      inject: true,
    }),

    // Put it in the end to capture all the HtmlWebpackPlugin's
    // assets manipulations and do leak its manipulations to HtmlWebpackPlugin
    new OfflinePlugin({
      relativePaths: false,
      publicPath: '/',
      appShell: '/',

      // No need to cache .htaccess. See http://mxs.is/googmp,
      // this is applied before any match in `caches` section
      excludes: ['.htaccess'],

      caches: {
        main: [':rest:'],

        // All chunks marked as `additional`, loaded after main section
        // and do not prevent SW to install. Change to `optional` if
        // do not want them to be preloaded at all (cached only when first loaded)
        additional: ['*.chunk.js'],
      },

      // Removes warning for about `additional` section usage
      safeToUseOptionalCaches: true,
    }),

    new HashedModuleIdsPlugin({
      hashFunction: 'sha256',
      hashDigest: 'hex',
      hashDigestLength: 20,
    }),

    new CopyWebpackPlugin([
      {
        from: './app/images',
        to: './img',
      },
      {
        from: './app/fonts',
        to: './fonts',
      },
      // {
      //   from: './public/css/',
      //   to: './css'
      // }
    ]),
  ],

  // performance: {
  //   assetFilter: assetFilename =>
  //     !/(\.map$)|(^(main\.|favicon\.))/.test(assetFilename),
  // },
});
