import React, { useState } from 'react';
/* eslint-disable */

import MyHelmet from '../../common/my-helmet/my-helmet';
// import Dialog from '../../common/dialog/index';
import Modal from '../../packages/Modal';

import classes from './test.css';

const Details = () => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(!open);
  };

  return (
    <>
      <button type="button" onClick={handleClickOpen}>点击打开弹出框</button>
      <Modal open={open} handleClose={handleClose}>
        <div>弹出框</div>
      </Modal>
    </>
  );
};

export default Details;
