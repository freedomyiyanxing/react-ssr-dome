const path = require('path');

module.exports = {
  dev: {
    assetsRoot: path.join(__dirname, '../dist'), // 输出路径
    assetsSubDirectory: 'static', // 输出文件
    assetsPublicPath: '/',
    showEslintErrorsInOverlay: true, // 是否输出eslint警告
    cssSourceMap: true, // 是否输出map文件
    cssPrecompiled: ['less', 'styl'], // 需要配置的css预编译
    port: 3333, // 端口号
    autoOpenBrowser: false, // 是否自动打开网页
  },
  build: {
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    assetsRoot: path.resolve(__dirname, '../dist'),
    devtool: 'source-map', // 适用于生产环境
    cssSourceMap: false, // 是否输出map文件
  },
  server: {
    devtool: 'source-map', // 适用于生产环境
    cssSourceMap: false, // 是否输出map文件
    env: '"server"',
  },
};
