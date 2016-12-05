'use strict';

import React from 'react';
import ShortlinkActions from '../actions/ShortlinkActions';

const ShortlinkListItem = React.createClass({

  handleClick() {
    ShortlinkActions.select(this.props.shortlink.slug);
  },

  render() {
    const shortlink = this.props.shortlink;
    const selected = this.props.selected;
    const className = 'shortlink-list-item' + (selected ? ' selected' : '');
    return (
      <li className={className} onClick={this.handleClick}>
        <h3>s7r.io/{shortlink.slug}</h3>
        <h5>{shortlink.longUrl}</h5>
      </li>
    );
  }
});

export default ShortlinkListItem;

