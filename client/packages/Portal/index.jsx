import React, { useEffect, useLayoutEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import useForkRef from '../api/useForkRef';

const useEnhancedEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

/**
 * @return {null}
 */
const Portal = React.forwardRef((props, ref) => {
  const {
    children,
    disablePortal,
  } = props;
  const [mountNode, setMountNode] = useState(null);
  const handleRef = useForkRef(children.ref, ref);
  console.log(ref);
  useEnhancedEffect(() => {
    if (!disablePortal) {
      setMountNode(document.body);
    }
  }, [disablePortal]);

  if (disablePortal) {
    return React.cloneElement(children, {
      ref: handleRef,
    });
  }

  return mountNode ? ReactDOM.createPortal(children, mountNode) : mountNode;
});

Portal.propTypes = {
  children: PropTypes.node.isRequired,
  disablePortal: PropTypes.bool.isRequired,
};

export default Portal;
