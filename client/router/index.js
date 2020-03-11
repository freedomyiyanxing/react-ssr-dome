import uuid from 'uuid';
import loadable from '@loadable/component';

import { homeLoadData } from '../component/home/home';

const Homes = loadable(() => import('../component/home/home'));
const Details = loadable(() => import('../component/details/details'));

const routers = [
  {
    key: uuid(),
    path: '/index',
    component: Homes,
    exact: true,
    loadData: homeLoadData,
  },
  {
    key: uuid(),
    path: '/details',
    component: Details,
    exact: true,
  },
];

export default routers;
