const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const SSRServerPlugin = require('./plugins/server-plugin');
const utils = require('./utils');
const config = require('../config/index');

module.exports = {
  mode: 'production',
  entry: {
    app: utils.resolve('client/server-entry.jsx'),
  },
  output: {
    path: config.build.assetsRoot,
    filename: 'server-entry.js',
    libraryTarget: 'commonjs2', // 按commonjs打包
  },
  target: 'node', // 指定 node 运行环境;
  devtool: config.server.devtool, // 这个不太懂, 应该是源文件转换的意思
  externals: [
    nodeExternals({
      whitelist: [ /\.(css|less|styl)/ ], // 忽然css | less | styl ... 让webpack处理
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  module: {
    rules: [
      ...utils.rules,
      ...utils.styleLoaders({
        cssPrecompiled: config.dev.cssPrecompiled,
        sourceMap: config.server.cssSourceMap,
      })
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.server.env,
    }),
    new MiniCssExtractPlugin({
      filename: utils.assetsPath('css/[name].css'),
    }),
    // 这是将服务器的整个输出
    // 构建为单个 JSON 文件的插件
    new SSRServerPlugin({
      filename: utils.assetsPath('json/server-bundle.json'), // 输出路径
    })
  ]
};
