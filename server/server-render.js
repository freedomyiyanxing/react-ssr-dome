const React = require('react');
const ReactDOMServer = require('react-dom/server');
const vm = require('vm');
const ejs = require('ejs');

class ServerRender {
  constructor (bundle, template) {
    this.template = template;
    this.serverEntry = this._createEntry(bundle);
  }

  renderToString () {
    return new Promise((resolve, reject) => {
      const serverEntry = this.serverEntry;
      const createApp = serverEntry.default.createApp;

      const render = () => {
        const component = createApp();
        const app = ReactDOMServer.renderToString(
          React.createElement(component)
        );
        resolve(this._generateHTML(app));
      }

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
   * @returns {String|Promise<String>}
   * @private
   */
  _generateHTML (appString) {
    return ejs.render(this.template, {
      appString,
    })
  }
}

module.exports = ServerRender;
