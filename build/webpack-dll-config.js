const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'production',
  devtool: false,
  entry: {
    vendor: [
      'react',
      'react-dom',
      'react-router-dom',
      'mobx',
      'mobx-react',
      'prop-types',
      'react-helmet',
    ],
  },
  output: {
    path: path.join(__dirname, '../static/js'),
    filename: '[name]_library_[chunkhash].js',
    /**
     * output.library
     * 将会定义为 window.${output.library}
     * 在这次的例子中，将会定义为`window.vendor_library`
     */
    library: '[name]_library'
  },
  plugins: [
    new webpack.DllPlugin({
      /**
       * path
       * 定义文件生成的位置
       * [name]的部分由entry的名字替换
       */
      path: path.join(__dirname, '../static/json/[name]-manifest.json'), // 输出在当前文件夹下面
      /**
       * name
       * dll bundle 输出到那个全局变量上
       * 和 output.library 一样即可。
       */
      name: '[name]_library',
      context: path.join(__dirname, '..')
    })
  ]
};
