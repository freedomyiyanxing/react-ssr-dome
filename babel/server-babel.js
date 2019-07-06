const presets = [
  [
    '@babel/preset-env',
    {
      'useBuiltIns': 'entry',
      'corejs': '3.0.0',
      'targets': { // 设置 "chrome": "58", "ie": "11" 把es6解析成es5 (最主要解决 es中的 const 不编译的问题)
        'chrome': '58',
        'ie': '11',
      },
    },
  ],
  '@babel/preset-react',
];

const plugins = [
  'dynamic-import-node',
  '@loadable/babel-plugin',
  '@babel/plugin-transform-runtime',
  '@babel/plugin-syntax-dynamic-import',
  ['@babel/plugin-proposal-decorators', { 'legacy': true }],
  ['@babel/plugin-proposal-class-properties', { 'loose': true }]
];

module.exports = {
  presets,
  plugins,
};
