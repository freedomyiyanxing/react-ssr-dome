import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { loadableReady } from '@loadable/component';
import { Provider } from 'mobx-react';

import App from './App';
import { HomeStore } from './store/index';

// 获取服务端渲染出的数据
/* eslint-disable-next-line */
const initialSate = window.__INITIAL__STATE__ || {};

const homeStore = new HomeStore(initialSate.homeStore);

const Main = () => (
  <Provider
    homeStore={homeStore}
  >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

const root = document.getElementById('root');

loadableReady().then(() => {
  ReactDom.hydrate(<Main />, root);
});

// 告诉 webpack 允许此模块的热更新
// 热更新
if (module.hot) {
  module.hot.accept();
}
