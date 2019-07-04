import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { Provider, useStaticRendering } from 'mobx-react';
import App from './App';
import { createStoreMap } from './store/index';
import routers from './router/index';

// mobx静态数据渲染
useStaticRendering();

//
const promiseAll = [];

const createApp = (stores, contextRouter, req) => {
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
