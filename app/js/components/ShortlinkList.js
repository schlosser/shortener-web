'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import ShortlinkListItem from './ShortlinkListItem';

class ShortlinkList extends React.Component {

  static get propTypes() {
    return {
      items: PropTypes.array,
    };
  }

  render() {
    return (
      <ul className="shortlink-list">
        {this.props.items.map(shortlink => (
          <ShortlinkListItem
            key={shortlink.slug}
            shortlink={shortlink}/>
        ))}
      </ul>
    );
  }
};

export default ShortlinkList;

