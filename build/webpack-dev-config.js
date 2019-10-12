const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

const webpackBase = require('./webpack-base-config');
const config = require('../config/index');
const utils = require('./utils');

// 设置错误显示的字体颜色
const ansiColors = {
  lightgrey: '12fdf4',
  red: 'FF0000',
  darkgrey: '658cff',
};

// 设置错误div的内联样式
const overlayStyles = {
  color: 'rgb(245, 7, 7)',
  background: 'rgba(16, 16, 16, 0.9)',
  fontSize: '20px',
};

const styles = encodeURIComponent(JSON.stringify(overlayStyles));
const colors = encodeURIComponent(JSON.stringify(ansiColors));

// 在入口(entry)中注入热替换
// overlayWarnings=true 配置能解决eslint报错 错误样式覆盖到DOM上
Object.keys(webpackBase.entry).forEach((name) => {
  webpackBase.entry[name].push(
    'react-hot-loader/patch',
    'webpack-hot-middleware/client' +
    '?path=/__webpack_hmr&noInfo=false&reload=true&overlay=true&overlayWarnings=true' +
    '&overlayStyles=' + styles +
    '&ansiColors=' + colors,
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
    new webpack.SourceMapDevToolPlugin(), // 生成map文件, 方便调试 (点击控制台React插件, 右键点击组件 能索引到源文件)
    new MiniCssExtractPlugin({
      filename: utils.assetsPath('css/[name].css'),
    }),
    // 热更新
    new webpack.HotModuleReplacementPlugin(),
  ],
});
