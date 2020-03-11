/* eslint-disable */
import React, { useState, useRef, useCallback, useEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import useForkRef from '../api/useForkRef';
import ownerDocument from '../api/ownerDocument';
import useEventCallback from '../api/useEventCallback';
import createChainedFunction from '../api/createChainedFunction';
import Portal from '../Portal';
import ModalManager, { ariaHidden } from './ModalManager';

const defaultManager = new ModalManager();

function getContainer(container) {
  container = typeof container === 'function' ? container() : container;
  return ReactDOM.findDOMNode(container);
}

function getHasTransition(props) {
  return props.children ? props.children.props.hasOwnProperty('in') : false;
}

/**
 * @return {null}
 */
const Modal = React.forwardRef(/**
 * @return {null}
 */
function Modal(props, ref) {
  const {
    open,
    children,
    container,
    disablePortal = false,
    disableScrollLock = false,
    manager = defaultManager,
    closeAfterTransition = false,
    keepMounted = false,
    disableBackdropClick = false,
    disableEscapeKeyDown = false,
    onBackdropClick,
    onClose,
    onRendered,
    onEscapeKeyDown,
  } = props;

  const [exited, setExited] = useState(true);
  const modal = useRef({});
  const mountNodeRef = useRef(null);
  const modalRef = useRef(null);
  const handleRef = useForkRef(modalRef, ref);
  const hasTransition = getHasTransition(props);
  const getDoc = () => ownerDocument(mountNodeRef.current);
  const getModal = () => {
    modal.current.modalRef = modalRef.current;
    modal.current.mountNode = mountNodeRef.current;
    return modal.current;
  };

  const handleMounted = () => {
    manager.mount(getModal(), { disableScrollLock });

    // Fix a bug on Chrome where the scroll isn't initially 0.
    modalRef.current.scrollTop = 0;
  };

  const handleOpen = useEventCallback(() => {
    const resolvedContainer = getContainer(container) || getDoc().body;

    manager.add(getModal(), resolvedContainer);

    // The element was already mounted.
    if (modalRef.current) {
      handleMounted();
    }
  });

  const isTopModal = useCallback(() => manager.isTopModal(getModal()), [manager]);

  const handlePortalRef = useEventCallback(node => {
    mountNodeRef.current = node;
    if (!node) {
      return;
    }

    if (onRendered) {
      onRendered();
    }

    if (open && isTopModal()) {
      handleMounted();
    } else {
      ariaHidden(modalRef.current, true);
    }
  });

  const handleClose = useCallback(() => {
    manager.remove(getModal());
  }, [manager]);

  useEffect(() => {
    return () => {
      handleClose();
    };
  }, [handleClose]);

  useEffect(() => {
    if (open) {
      handleOpen();
    } else if (!hasTransition || !closeAfterTransition) {
      handleClose();
    }
  }, [open, handleClose, hasTransition, closeAfterTransition, handleOpen]);

  if (!keepMounted && !open && (!hasTransition || exited)) {
    return null
  }

  const handleEnter = () => {
    setExited(false);
  };

  const handleExited = () => {
    setExited(true);
    if (closeAfterTransition) {
      handleClose();
    }
  };

  const handleBackdropClick = event => {
    if (event.target !== event.currentTarget) {
      return;
    }

    if (onBackdropClick) {
      onBackdropClick(event);
    }

    if (!disableBackdropClick && onClose) {
      onClose(event, 'backdropClick');
    }
  };

  const handleKeyDown = event => {
    // We don't take event.defaultPrevented into account:
    //
    // event.preventDefault() is meant to stop default behaviours like
    // clicking a checkbox to check it, hitting a button to submit a form,
    // and hitting left arrow to move the cursor in a text input etc.
    // Only special HTML elements have these default behaviors.
    if (event.key !== 'Escape' || !isTopModal()) {
      return;
    }

    // Swallow the event, in case someone is listening for the escape key on the body.
    event.stopPropagation();

    if (onEscapeKeyDown) {
      onEscapeKeyDown(event);
    }

    if (!disableEscapeKeyDown && onClose) {
      onClose(event, 'escapeKeyDown');
    }
  };

  // const inlineStyle = styles(theme || { zIndex });
  const childProps = {};
  if (children.tabIndex === undefined) {
    childProps.tabIndex = '-1';
  }

  // It's a Transition like component
  if (hasTransition) {
    childProps.onEnter = createChainedFunction(handleEnter, children.props.onEnter);
    childProps.onExited = createChainedFunction(handleExited, children.props.onExited);
  }


  return (
    <Portal disablePortal={disablePortal}>
      <div style={{
        position: 'fixed',
        zIndex: 1200,
        right: 0,
        bottom: 0,
        top: 0,
        left: 0,
      }}
      >
        {
          open
            ? children
            : null
        }
      </div>
    </Portal>
  );
});

Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  disablePortal: PropTypes.bool,
};

export default Modal;
