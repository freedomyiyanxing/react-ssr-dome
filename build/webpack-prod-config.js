const merge = require('webpack-merge');
const webpack = require('webpack');
const os = require('os');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const webpackBase = require('./webpack-base-config');
const config = require('../config/index');
const utils = require('./utils');

module.exports = merge(webpackBase, {
  mode: 'production',
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    publicPath: config.build.assetsPublicPath,
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js'),
  },
  module: {
    rules: [
      ...utils.styleLoaders({
        cssPrecompiled: config.dev.cssPrecompiled,
        sourceMap: config.build.cssSourceMap,
      })
    ],
  },
  devtool: config.build.devtool,
  optimization: {
    runtimeChunk: {
      name: 'manifest'
    },
    splitChunks: {
      cacheGroups: {
        chunks: 'initial',
        vendor: {
          test: /([\\/]node_modules[\\/])/,
          name: 'vendor',
          chunks: 'all'
        },
        'async-vendors': {
          test: /[\\/]node_modules[\\/]/,
          minChunks: 3,
          chunks: 'async',
          name: 'async-vendors'
        }
      }
    },
    minimizer: [
      new OptimizeCSSAssetsPlugin({ // 压缩css
        cssProcessorOptions: {
          map: { inline: false }
        }
      }),
      new UglifyJsPlugin({ // 压缩js
        cache: true, // 开启缓存
        parallel: os.cpus().length - 1, // 开启多核打包
      }),
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.target': JSON.stringify(config.build.env),
    }),
    new MiniCssExtractPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css')
    }),
    // keep module.id stable when vendor modules does not change
    new webpack.HashedModuleIdsPlugin(),
    // enable scope hoisting
    new webpack.optimize.ModuleConcatenationPlugin()
  ]
});
