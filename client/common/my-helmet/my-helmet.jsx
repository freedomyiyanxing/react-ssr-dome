import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

const MyHelmet = (props) => {
  const { content, store, title } = props;
  const contents = [];
  if (store && Array.isArray(content)) {
    content.forEach((v) => {
      contents.push(JSON.stringify(store.toJson()[v]));
    });
  }
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="keywords" content={store ? contents : content} />
    </Helmet>
  );
};

MyHelmet.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]).isRequired,
  store: PropTypes.objectOf(PropTypes.object),
};

MyHelmet.defaultProps = {
  store: null,
};

export default MyHelmet;
