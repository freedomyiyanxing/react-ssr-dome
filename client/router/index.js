import uuid from 'uuid';
import loadable from '@loadable/component';

// import Home from '../component/home/home';
// import Details from '../component/details/details';

const Home = loadable(() => import('../component/home/home'));
const Details = loadable(() => import('../component/details/details'));

const routers = [
  {
    key: uuid,
    path: '/index',
    component: Home,
    exact: true,
  },
  {
    key: uuid,
    path: '/details',
    component: Details,
    exact: true,
  },
];

export default routers;
