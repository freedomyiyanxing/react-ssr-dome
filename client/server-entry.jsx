import React from 'react';

import Home from './component/home/home';
import Details from './component/details/details';

const createApp = () => {
  const App = () => (
    <div>
      <Home />
      <Details />
    </div>
  );
  return App;
};

export default {
  createApp,
};
