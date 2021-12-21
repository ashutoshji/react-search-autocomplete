import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const escapeRegExp = (str = '') => (
  str.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1')
);

const Highlight = ({ search = '', children = '' }) => {
  const patt = new RegExp(`(${escapeRegExp(search)})`, 'i');
  const parts = String(children).split(patt);

  if (search) {
    return parts.map((part, index) => (
      patt.test(part) ? <mark key={index}>{part}</mark> : part
    ));
  } else {
    return children;
  }
};

const UserItem = ({ query, user: { DocumentTitle, DocumentExcerpt, DocumentURI } }) => {
  console.log('query', query)
  return (
    <div class="card basic-card basic-card-light">
                <div class="card-content">
                    <span class="card-title">
                    <Highlight search={query}>{DocumentTitle.Text}</Highlight>
                    </span>
                    <p class="card-text">
                    <Highlight search={query}>{DocumentExcerpt.Text}</Highlight>
                     </p>
                </div>

                <div class="card-link">
                    <a href={DocumentURI} title=""><span>{DocumentURI}</span></a>
                </div>
    </div>
  );
};

UserItem.prototype = {
  user: PropTypes.object.isRequired,
  query: PropTypes.string.isRequired
};

export default UserItem;
