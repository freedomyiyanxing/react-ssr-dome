const path = require('path');
const open = require('open');
const chalk = require('chalk');
const fs = require('fs');
const express = require('express');
const ip = require('ip');
const favicon = require('serve-favicon');

const config = require('../config/index');
const devServer = require('./dev-server');
const ServerRender = require('./server-render');

const app = express();

// 静态资源映射到 dist 路径下
app.use(express.static('dist'));

// 页签logo
app.use(favicon(path.join(__dirname, '../favicon.ico')));

// 获取运行环境
const isProd = process.env.NODE_ENV === 'production';

let renderer;
let readyPromise;

// 获取模板文件
const template = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf-8');

if (isProd) { // 运行时
  console.log(chalk.red('运行时'));

  let bundle = require('../dist/static/json/server-bundle.json');
  let loadableStats = require('../dist/static/json/loadable-stats.json');
  console.log(chalk.green(' ----- 服务器 准备 完成 可以请求了 -----'));
  renderer = new ServerRender(bundle, template, loadableStats);
} else { // 开发时
  console.log(chalk.red('开发时'));

  readyPromise = devServer(app, (bundle, loadableStats) => {
    renderer = new ServerRender(bundle, template, loadableStats);
  });
}

const render = (req, res) => {
  console.log(chalk.cyan('visit url: ' + req.url));

  renderer.renderToString(req, res).then((html) => {
    res.send(html);
  })
};

/**
 * 开发时得 先等webpack打完包 才执行render
 */
app.get('*', isProd ? render : (req, res) => {
  readyPromise.then(() => render(req, res))
});

const port = process.env.PORT || config.dev.port;
const uri = 'http://localhost:' + port;
const ips = 'http://' + ip.address() + ':' + port;

app.listen(port, (err) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log(chalk.cyan('\n' + '- Local: ' + uri + '\n'));
  console.log(chalk.cyan('- On your Network: ' + ips + '\n'));

  // 是否自动打开网页
  if (config.dev.autoOpenBrowser) {
    open(uri);
  }
});
