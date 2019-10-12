import React, { useState } from 'react';
/* eslint-disable */

import MyHelmet from '../../common/my-helmet/my-helmet';
import Dialog from '../../common/dialog/index';

import classes from './test.css';

const Details = () => {
  const [open, setOpen] = useState(true);

  const handleClose  = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <MyHelmet
        title="details"
        content={['我是详情页']}
      />
      <div>
        <h2 className={classes.text}>测试热更新1</h2>
        <div>22再次测试 ejs 模板 是okd</div>
        <span>我没按你别跟新咯</span>
        <p>this is details page</p>
        <div>多试两遍把。。。1。</div>
        <button type="button" onClick={handleClickOpen}>点击打开弹出框</button>
        <Dialog isOpen={open} handleClose={handleClose}>
          <div>弹出框</div>
        </Dialog>
      </div>
    </>
  );
};

export default Details;
