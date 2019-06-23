import React from 'react';

import classes from './test.css';

const Details = () => {
  const handleClick = () => {
    console.log(' —————————— 详情页');
  };

  return (
    <div>
      <button type="button" onClick={handleClick}>1点击测试</button>
      <h2 className={classes.text}>测试热更新1</h2>
      <div>22再次测试 ejs 模板 是okd</div>
      <span>我没按你别跟新咯</span>
      <p>this is details page</p>
      <div>多试两遍把。。。1。</div>
    </div>
  );
};

export default Details;
