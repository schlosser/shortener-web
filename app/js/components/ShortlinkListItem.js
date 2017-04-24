'use strict';

import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

class ShortlinkListItem extends React.Component {
  static get propTypes() {
    return {
      shortlink: PropTypes.object,
    };
  }

  handleClick() {
    // ShortlinkActions.select(this.props.shortlink.slug);
  }

  render() {
    const {shortlink} = this.props;
    return (
      <NavLink to={'/edit/' + shortlink.slug}>
        <div className='shortlink-list-item'>
            <h3>s7r.io/{shortlink.slug}</h3>
            <h5 className="shortlink-list-item-long-url">{shortlink.longUrl}</h5>
        </div>
      </NavLink>
    );
  }
};

export default ShortlinkListItem;

