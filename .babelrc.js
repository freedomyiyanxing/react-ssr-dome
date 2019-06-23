const presets = [
  [
    '@babel/preset-env',
    {
      'useBuiltIns': 'entry',
      'corejs': '3.0.0',
      'targets': { // 设置 "chrome": "58", "ie": "11" 把es6解析成es5
        'chrome': '58',
        'ie': '11'
      },
    },
  ],
  '@babel/preset-react',
];

const plugins = [
  '@loadable/babel-plugin',
  "@babel/plugin-transform-runtime",
  '@babel/plugin-syntax-dynamic-import', // import('../component/goods') 配置 import异步调用语法
  [
    '@babel/plugin-proposal-decorators', { 'legacy': true } // 装饰器语法 @ 配置
  ],
  [
    '@babel/plugin-proposal-class-properties', { 'loose': true } // 解析 class 语法
  ]
];

const env = {
  'development': {
    'plugins': ['react-hot-loader/babel']
  }
};

module.exports = {
  presets, plugins, env,
};
