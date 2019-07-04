import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';

import MyHelmet from '../../common/my-helmet/my-helmet';
import { HomeStore } from '../../store/index';
import classes from './tset.css';

@inject(store => ({
  homeStore: store.homeStore,
}))
@observer
class Home extends React.Component {
  handleClick = () => {
    console.log('我是首页');
  };

  render() {
    const { homeStore } = this.props;
    const { banners } = homeStore;
    return (
      <>
        <MyHelmet
          title="home"
          store={homeStore}
          content={['banners', 'shops', 'products', 'recommend', 'historys']}
        />
        <h2>{banners.text}</h2>
        <div className={classes.root}>
          <button type="button" onClick={this.handleClick}>点击测试</button>
          <h2>222测试错误信息 覆盖的</h2>
          <h2>我是首页标题</h2>
          <div>哈哈哈哈</div>
          <p>11---this is changsha---22</p>
          <div>服务器开发做好了呀</div>
          <div>暂时貌似还可以样的哈</div>
          <span>不要按F10就不要替换12</span>
        </div>
      </>
    );
  }
}

Home.propTypes = {
  homeStore: PropTypes.instanceOf(HomeStore),
};

Home.defaultProps = {
  homeStore: null,
};

// 服务端调用获取异步数据
export const homeLoadData = stores => stores.homeStore.fetchData();

export default Home;
