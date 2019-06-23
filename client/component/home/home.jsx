import React from 'react';

import classes from './tset.css';
// import img from '../../assets/images/IMG_9187_.jpg';
const Home = () => {
  const handleClick = () => {
    console.log('我是首页');
  };

  return (
    <>
      <div className={classes.root}>
        <button type="button" onClick={handleClick}>点击测试</button>
        <h2>222测试错误信息 覆盖的</h2>
        <h2>我是首页标题</h2>
        <div>哈哈哈哈</div>
        <p>11---this is changsha---22</p>
        <div>服务器开发做好了呀</div>
        <div>暂时貌似还可以样的哈</div>
        <span>不要按F10就不要替换12</span>
      </div>
      <div>我敢你妈妈</div>
    </>
  );
};

export default Home;
