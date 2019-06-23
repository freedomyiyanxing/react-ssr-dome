import React from 'react';
import { StaticRouter } from 'react-router-dom';
import App from './App';

const createApp = (contextRouter, req) => {
  const Main = () => (
    <StaticRouter context={contextRouter} location={req.url}>
      <App />
    </StaticRouter>
  );
  return Main;
};

export default {
  createApp,
};
