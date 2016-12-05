'use strict';

import React from 'react';
import Reflux from 'reflux';
import ShortlinkStore from '../stores/ShortlinkStore';
import ShortlinkActions from '../actions/ShortlinkActions';
import ShortlinkListItem from './ShortlinkListItem';

const ShortlinkList = React.createClass({
  mixins: [Reflux.connect(ShortlinkStore, 'shortlinks')],

  componentWillMount() {
    ShortlinkActions.load();
  },

  render() {
    let items = [];
    for (let shortlink of this.state.shortlinks.items) {
      items.push(
        <ShortlinkListItem key={shortlink.slug} shortlink={shortlink} selected={shortlink.slug === this.state.shortlinks.selected}/>
      );
    };
    return this.state.shortlinks.areLoaded ? (
      <ul className="shortlink-list">
        {items}
      </ul>
    ) : (
      <div>Spinner...</div>
    );
  }
});

export default ShortlinkList;

