/* eslint-disable */
import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import classes from './dialog.css';

const Dialog = (props) => {
  const {
    triggerCls, popoverCls, children, isOpen, handleClose,
  } = props;

  console.log(isOpen);

  return (
    <div className={classes.root} style={{ visibility: isOpen ? null : 'hidden' }}>
      {
        isOpen
          ? (
            <>
              <div className={`${classes.content} ${popoverCls}`}>
                {
                  children
                }
              </div>
              <div className={classes.mask} onClick={handleClose} />
            </>
          )
          : null
      }
    </div>
  )
};

Dialog.propTypes = {
  triggerCls: PropTypes.string,
  popoverCls: PropTypes.string,
  isOpen: PropTypes.bool,
  children: PropTypes.node.isRequired,
  handleClose : PropTypes.func.isRequired,
};

Dialog.defaultProps = {
  triggerCls: '',
  popoverCls: '',
  isOpen: false,
};

export default Dialog;