const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

const webpackBase = require('./webpack-base-config');
const config = require('../config/index');
const utils = require('./utils');

// 在入口(entry)中注入热替换
Object.keys(webpackBase.entry).forEach((name) => {
  webpackBase.entry[name].push(
    'react-hot-loader/patch',
    'webpack-hot-middleware/client?noInfo=true&reload=true',
  );
});

// 设置eslint配置
const createEslintRule = () => ({
  test: /\.(js|jsx)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  exclude: utils.resolve('node_modules'),
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: config.dev.showEslintErrorsInOverlay,
  },
});

module.exports = merge(webpackBase, {
  mode: 'development',
  output: {
    path: config.dev.assetsRoot,
    filename: utils.assetsPath('js/[name].js'),
    publicPath: config.dev.assetsPublicPath,
  },
  module: {
    rules: [
      createEslintRule(),
      ...utils.styleLoaders({
        cssPrecompiled: config.dev.cssPrecompiled,
        sourceMap: config.dev.cssSourceMap,
      })
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.target': JSON.stringify(config.dev.env), // 用来区分环境
    }),
    new webpack.SourceMapDevToolPlugin(), // 生成map文件, 方便调试 (但是没用过 得看文档 https://www.webpackjs.com/plugins/source-map-dev-tool-plugin/)
    new MiniCssExtractPlugin({
      filename: utils.assetsPath('css/[name].css'),
    }),
    // 热更新
    new webpack.HotModuleReplacementPlugin(),
  ],
});
