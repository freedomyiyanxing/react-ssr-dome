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
  constructor(props) {
    super(props);
    this.state = {
      open: 'render之前',
    };
  }

  componentDidMount() {
    // setTimeout(() => {
    //   this.setState({
    //     open: 'componentDidMount 操作了一下',
    //   });
    // }, 2000);
  }

  handleClick = () => {
    console.log('我是首页');
  };

  render() {
    const { homeStore } = this.props;
    const { open } = this.state;
    const { banners } = homeStore;
    console.log('你render了嘛', homeStore);
    return (
      <>
        <MyHelmet
          title="home"
          store={homeStore}
          content={['banners', 'shops', 'products', 'recommend', 'historys']}
        />
        <div>
          <p>{banners.index}</p>
          <p>{banners.id}</p>
          <p>{banners.text}</p>
        </div>
        <p>{open}</p>
        <div className={classes.root}>
          <button type="button" onClick={this.handleClick}>点击测试</button>
          <h2>222测试错误信息hahah </h2>
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
