import HomeStore from './home';

export {
  HomeStore,
};

export const createStoreMap = () => ({
  homeStore: new HomeStore(),
});
