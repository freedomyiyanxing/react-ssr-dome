import ownerDocument from './ownerDocument';

function ownerWindow(node) {
  const doc = ownerDocument(node);
  // eslint-disable-next-line no-undef
  return doc.defaultView || window;
}

export default ownerWindow;
