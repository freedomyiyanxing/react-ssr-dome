const React = require('react');
const ReactDOMServer = require('react-dom/server');
const vm = require('vm');
const { ChunkExtractor } = require('@loadable/server');

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

      const render = () => {
        const context = {};
        const extractor = new ChunkExtractor({
          stats: this.loadableStats,
          entrypoints: ['app'],
        });
        const component = createApp(context, req);
        const app = ReactDOMServer.renderToString(
          extractor.collectChunks(React.createElement(component))
        );

        if (context.url) {
          res.status(302).setHeader('Location', context.url);
          res.end();
          return;
        }

        resolve(this._generateHTML(app, extractor));
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
   * @returns {String|Promise<String>}
   * @private
   */
  _generateHTML (appString, extractor) {
    return this.template
      .replace('<!--react-ssr-head-->',
        `${extractor.getLinkTags()}\n${extractor.getStyleTags()}
      `)
      .replace('<!--appString-->', appString)
      .replace('<!--react-ssr-outlet-->', extractor.getScriptTags());
  }
}

module.exports = ServerRender;
