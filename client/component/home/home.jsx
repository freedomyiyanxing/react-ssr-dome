import React from 'react';

import classes from './tset.css';
import img from '../../assets/images/IMG_9187_.jpg';

const Home = () => (
  <>
    <div className={classes.root}>
      <h2>1234</h2>
      <h2>我是首页标题</h2>
      <div>哈哈哈哈</div>
      <p>11---this is changsha---22</p>
      <div>服务器开发做好了呀</div>
      <div>暂时貌似还可以样的哈</div>
      <span>不要按F10就不要替换12</span>
    </div>
    <div>我敢你妈妈</div>
    <img width="300" src={img} alt="" />
  </>
);

export default Home;
