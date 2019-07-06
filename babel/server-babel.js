const { presets, plugin } = require('./babel-base');
console.log();

module.exports = {
  presets,
  plugins: ['dynamic-import-node', ...plugin], // 使用代码拆分 要在服务端配置添加dynamic-import-node包
};
