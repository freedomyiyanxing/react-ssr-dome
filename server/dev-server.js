const path = require('path');
const webpack = require('webpack');
const Mfs = require('memory-fs');
const chalk = require('chalk');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackDevMiddleware = require('webpack-dev-middleware');

const clientConfig = require('../build/webpack-dev-config');
const serverConfig = require('../build/webpack-server-config');
let index = 0; // 记录更新的次数

function setupDevServer (app, callback) {
  let resolves = null;
  let bundle = null;
  let loadableStats = null;

  // 创建一个promise对象
  const readyPromise = new Promise((resolve, reject) => { resolves = resolve });

  const update = () => {
    if (bundle && loadableStats) {
      // 当服务端打包完成, 和客户端打包完成 且获取到客户端打包的ejs模板时 调用回调函数, 调用resolve promise成功
      callback(bundle, loadableStats);
      resolves(true);
      console.log(chalk.yellow(' 每次 更新 打包完成 时触发 ----', index));
      index += 1; // 每次更新完 加1
    }
  };

  const readFile = (fs, filename) => fs.readFileSync(path.join(clientConfig.output.path, filename), 'utf-8');

  // 客户端打包
  const clientCompiler = webpack(clientConfig);

  // 使用webpack-dev-middleware中间件服务webpack打包后的资源文件
  /**
   * webpackDevMiddleware
   * 1. 接受webpack打包后的实例文件, 并保存在内存中,
   * 2. 在注册完express中间件后, 根据访问路径输 响应对应的文件
   */
  const devMiddleware = webpackDevMiddleware(clientCompiler, {
    publicPath: clientConfig.output.publicPath, // 必填项 输出资源绑定在服务器上的跟目录 在这里是 '/' => 'localhost:3333/'
    logLevel: 'warn', // 在控制台 输入警告的日志
  });

  // 为 app 注册中间件
  app.use(devMiddleware);

  // 打包完成时的钩子事件
  clientCompiler.hooks.done.tap('done', stats => {
    const info = stats.toJson();
    if (stats.hasWarnings()) {
      console.warn(info.warnings);
    }

    if (stats.hasErrors()) {
      console.error(info.errors);
      return;
    }
    // 获取代码拆分的json说明文件
    loadableStats = JSON.parse(readFile(devMiddleware.fileSystem, 'static/json/loadable-stats.json'));
    update();
  });

  // 热更新中间件 (无法解决错误覆盖到页面上)
  app.use(webpackHotMiddleware(clientCompiler, {
    log: console.log,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000,
  }));

  // 监视服务端打包入口文件，有更改就更新
  const serverCompiler = webpack(serverConfig);
  // 使用内存文件系统读写
  const mfs = new Mfs();
  serverCompiler.outputFileSystem = mfs;
  // 监听服务端打包更新
  serverCompiler.watch({
    aggregateTimeout: 1000,
  }, (err, stats) => {
    if (err) {
      return;
    }
    const info = stats.toJson();
    if (stats.hasWarnings()) {
      console.warn(info.warnings);
    }

    if (stats.hasErrors()) {
      console.error(info.errors);
      return;
    }
    bundle = JSON.parse(readFile(mfs, 'static/json/server-bundle.json'));
    update();
  });

  // 返回 Promise对象
  return readyPromise;
}

module.exports = setupDevServer;
