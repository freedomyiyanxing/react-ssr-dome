import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const Main = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

const root = document.getElementById('root');

// 完美的避开错误 Warning: Expected server HTML to contain a matching <div> in <div>.;
const renderOrHydrate = root.innerHTML.trim().length ? 'hydrate' : 'render';
ReactDom[renderOrHydrate](<Main />, root);

// 告诉 webpack 允许此模块的热更新
// 热更新
if (module.hot) {
  module.hot.accept();
}
