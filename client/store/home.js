import { observable, action, toJS } from 'mobx';

class HomeStore {
  @observable banners;

  // (踩过的坑) 传递参数 一定是要把参数放在 对象中,
  // 为什么要传参数? 因为客户端渲染时 要获取服务端生成的store
  // 保证服务store的数据同步到客户端store当中, 只有同步了数据 才不会导致组件多次render
  constructor({ banners = {} } = {}) {
    this.banners = banners;
  }

  @action fetchData() {
    return new Promise((resolve) => {
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
