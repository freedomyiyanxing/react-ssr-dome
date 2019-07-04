const React = require('react');
const vm = require('vm');
const ReactDOMServer = require('react-dom/server');
const { ChunkExtractor } = require('@loadable/server');
const serializeJavascript = require('serialize-javascript');

const getStoreState = (stores) => {
  return Object.keys(stores).reduce((result, storeName) => {
    result[storeName] = stores[storeName].toJson();
    return result
  }, {})
};

class ServerRender {
  constructor (bundle, template, loadableStats) {
    this.template = template;
    this.serverEntry = bundle;
    this.loadableStats = loadableStats;
  }

  renderToString (req, res) {
    return new Promise((resolve) => {
      const serverEntry = this._createEntry(this.serverEntry);
      const createApp = serverEntry.default.createApp;
      const createStore = serverEntry.default.createStoreMap();
      const promiseAll = serverEntry.default.promiseAll;

      const render = () => {
        const context = {};
        const extractor = new ChunkExtractor({
          stats: this.loadableStats,
          entrypoints: ['app'],
        });
        const component = createApp(createStore, context, req);

        Promise.all(promiseAll).then(() => {
          const app = ReactDOMServer.renderToString(
            extractor.collectChunks(React.createElement(component))
          );

          // 把数据json化;
          const appStore = serializeJavascript(getStoreState(createStore));

          // 路由重定向
          if (context.url) {
            res.status(302).setHeader('Location', context.url);
            res.end();
            return;
          }

          resolve(this._generateHTML(app, extractor, appStore));
        })
      };

      render();
    })
  };

  /**
   * 解析 运行 服务端js
   * @param bundle
   * @returns {any}
   * @private
   */
  _createEntry (bundle) {
    const code = bundle.files[bundle.entry];
    const sandbox = {
      console,
      module,
      require
    };

    /**
     * vm 虚拟机 用于编译js 运行js
     * code 将被编译和运行的JavaScript代码
     * sandbox 一个将被上下文隔离化的对象。如果是undefined, 会生成一个新的对象
     */
    vm.runInNewContext(code, sandbox);

    return sandbox.module.exports;
  }

  /**
   * 模板拼接,
   * @param appString
   * @param extractor
   * @param appStore
   * @returns {String|Promise<String>}
   * @private
   */
  _generateHTML (appString, extractor, appStore) {
    return this.template
      .replace('<!--react-ssr-head-->', `${extractor.getLinkTags()}\n${extractor.getStyleTags()}`)
      .replace('<!--appString-->', appString)
      .replace('<!--appStore-->', `<script type="text/javascript">window.__INITIAL__STATE__ = ${appStore}</script>`)
      .replace('<!--react-ssr-outlet-->', extractor.getScriptTags());
  }
}

module.exports = ServerRender;
