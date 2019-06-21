const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'production',
  devtool: false,
  entry: {
    vendor: ['react', 'react-dom'],
  },
  output: {
    path: path.join(__dirname, '../static-dll/js'),
    filename: '[name].dll.js',
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
      path: path.join(__dirname, '.','[name]-manifest.json'), // 输出在当前文件夹下面
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
