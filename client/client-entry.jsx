import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { loadableReady } from '@loadable/component';
import App from './App';

const Main = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
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
