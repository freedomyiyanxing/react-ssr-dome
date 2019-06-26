const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const LoadablePlugin = require('@loadable/webpack-plugin');

const utils = require('./utils');
const config = require('../config/index');

module.exports = {
  entry: {
    app: [utils.resolve('client/client-entry.jsx')], // 使用数组, 方便在开发时打包 注入热替换
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'], // 省略文件后缀名;
  },
  module: {
    rules: [
      ...utils.rules,
    ],
  },
  plugins: [
    new webpack.DllReferencePlugin({
      context: path.join(__dirname, '..'),
      manifest: require('./vendor-manifest.json'), // 映射的路径
    }),
    new CopyWebpackPlugin([ // 复制文件插件
      {
        from: utils.resolve('static-dll'), // 原址
        to: config.dev.assetsSubDirectory, // 目的地
      }
    ]),
    new LoadablePlugin({
      filename: utils.assetsPath('/json/loadable-stats.json'), // 打包后的路径
    }),
  ],
  performance: { // 配置如何展示性能提示。例如，如果一个资源超过 250kb，webpack 会对此输出一个警告来通知你。
    hints: false // 参数false (不提示) | "error" (错误提示) | "warning (警告提示)"
  }
};
