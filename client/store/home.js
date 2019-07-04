import { observable, action, toJS } from 'mobx';

class HomeStore {
  @observable banners;

  constructor(banners = {}) {
    this.banners = banners;
  }

  @action fetchData() {
    return new Promise((resolve) => {
      console.log('sssss');
      resolve(true);
      this.banners = {
        index: 1,
        id: 'dfsdfsdf',
        text: '这是一个Home数据',
      };
    });
  }

  toJson() {
    return {
      banners: toJS(this.banners),
    };
  }
}

export default HomeStore;
