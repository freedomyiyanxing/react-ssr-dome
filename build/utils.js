const path = require('path');
const os = require('os');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const config = require('../config/index');

const resolve = dir => {
  // 返回的路径 D:\code\react\react-server-rendering\react-ssr-dome1\client\client-entry.jsx
  return path.join(__dirname, '..', dir);
};

// 合并路径 'static' + _path
const assetsPath = function (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory;
  // path.join => static\js\[name].js
  // path.posix.join => static/js/[name].js (posix.join 得到的是 /xx/xx 路径)
  return path.posix.join(assetsSubDirectory, _path);
};

/**
 * 生产对应的loader
 * @param options
 * @param loaderName
 * @returns {{css: *, less: *, postcss: *}}
 * @privateloaders
 */
const _cssLoaders = (options, loaderName) => {
  options = options || {};

  const loaderObj = {
    cssLoader: {
      loader: 'css-loader',
      options: {
        sourceMap: options.sourceMap,
        modules: {
          mode: 'local',
          localIdentName: '[name]_[local]--[hash:base64:5]',
          context: path.resolve(__dirname, 'src'),
          hashPrefix: 'my-custom-hash',
        }
      }
    },

    postcssLoader: {
      loader: 'postcss-loader',
      options: {
        sourceMap: options.sourceMap,
        ident: 'postcss',
      },
    },

    lessLoader: {
      loader: 'less-loader',
      options: {
        sourceMap: options.sourceMap,
      },
    },

    stylLoader: {
      loader: 'stylus-loader',
      options: {
        sourceMap: options.sourceMap,
      },
    },
  };

  // 提取css;
  const generateLoaders = (name) => {
    if (name) {
      return [
        {
          loader: MiniCssExtractPlugin.loader,
        },
        loaderObj.cssLoader,
        loaderObj.postcssLoader,
        loaderObj[name + 'Loader'],
      ]
    } else {
      return [
        {
          loader: MiniCssExtractPlugin.loader,
        },
        loaderObj.cssLoader,
        loaderObj.postcssLoader,
      ]
    }
  };

  return generateLoaders(loaderName);
};

const styleLoaders = (options) => {
  const output = [];

  // const cssModuleLoaders = _cssLoaders(options);

  // 默认配置自带css 解析
  output[0] = {
    test: /\.css$/,
    use: _cssLoaders(options),
  };

  // 遍历需要配置的loader (less || styl || scss || sass)
  options.cssPrecompiled.forEach((v) => {
    let obj = {
      test: new RegExp('\\.' + v + '$'),
      use: _cssLoaders(options, v),
      exclude: resolve('node_modules'),
    };
    output.push(obj);
  });

  return output;
};

const rules = [
  {
    test: /\.(js|jsx)$/,
    exclude: resolve('node_modules'), // 忽略当前文件
    use: [
      {
        loader: 'thread-loader', // 加速编译
        options: {
          workers: os.cpus().length - 1, // 开启多核编译
        },
      },
      {
        loader: 'babel-loader',
        options: {
          babelrc: false,
          configFile: path.join(__dirname, '../babel/client-babel.js'),
        },
      }
    ],
  },
  {
    test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
    loader: 'url-loader',
    options: {
      limit: 10000,
      name: assetsPath('img/[name].[hash:7].[ext]')
    }
  }
];

module.exports = {
  rules,
  resolve,
  assetsPath,
  styleLoaders,
};
