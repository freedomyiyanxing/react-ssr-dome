import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { Provider, useStaticRendering } from 'mobx-react';
import App from './App';
import { createStoreMap } from './store/index';
import routers from './router/index';

// mobx静态数据渲染
useStaticRendering();

// 保存所有异步获取数据的方法
const promiseAll = [];

/**
 * 创建入口组件
 * @param stores // store数据
 * @param contextRouter // 路由对象
 * @param req // request对象
 * @returns {function(): *}
 */
const createApp = (stores, contextRouter, req) => {
  // 遍历路由, 把异步获取数据的方法添加到 promiseAll当中
  routers.forEach((items) => {
    if (items.loadData) {
      promiseAll.push(items.loadData(stores));
    }
  });
  return () => (
    <Provider {...stores}>
      <StaticRouter context={contextRouter} location={req.url}>
        <App />
      </StaticRouter>
    </Provider>
  );
};

export default {
  createApp,
  createStoreMap,
  promiseAll,
};
