/* eslint-disable */
import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classes from './dialog.css';

function getContainer(container) {
  // findDOMNode 不支持函数试组件
  return ReactDOM.findDOMNode(typeof container === 'function' ? container() : container);
}

const useEnhancedEffect = typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;


const Dialog = (props) => {
  const {
    triggerCls, popoverCls, children, isOpen, handleClose,
  } = props;

  const [mountNode, setMountNode] = useState(null);

  useEnhancedEffect(() => {
    setMountNode(document.body)
  }, []);

  return mountNode ? ReactDOM.createPortal(children, mountNode) : mountNode;
};

Dialog.propTypes = {
  triggerCls: PropTypes.string,
  popoverCls: PropTypes.string,
  isOpen: PropTypes.bool,
  children: PropTypes.node.isRequired,
  handleClose: PropTypes.func.isRequired,
};

Dialog.defaultProps = {
  triggerCls: '',
  popoverCls: '',
  isOpen: false,
};

export default Dialog;