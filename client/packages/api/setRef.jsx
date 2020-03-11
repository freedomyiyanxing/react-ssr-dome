export default function setRef(ref, value) {
  if (typeof ref === 'function') {
    ref(value);
    return;
  }
  if (ref) {
    // eslint-disable-next-line no-param-reassign
    ref.current = value;
  }
}
