import React from 'react';
import {
  Switch, Route, Link, Redirect,
} from 'react-router-dom';
import routers from './router/index';

const App = () => (
  <>
    {
      console.log('app0')
    }
    <Link to="/index">首页</Link>
    <Link to="/details">详情页2</Link>
    <Switch>
      {
        routers.map(router => (
          <Route {...router} />
        ))
      }
      <Redirect form="/" to="/index" exact />
    </Switch>
  </>
);

export default App;
