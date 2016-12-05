'use strict';

import React from 'react';
import Reflux from 'reflux';
import ShortlinkActions from '../actions/ShortlinkActions';
import ShortlinkStore from '../stores/ShortlinkStore';
import * as _ from 'lodash';

const ShortlinkDetail = React.createClass({
  mixins: [Reflux.listenTo(ShortlinkStore, 'onShortlinkStoreUpdated')],

  getInitialState() {
    return {
      selected: false,
      shortlink: null
    };
  },

  handleClick() {
    ShortlinkActions.select(this.state.shortlink.slug);
  },

  onShortlinkStoreUpdated(shortlinks) {
    if (shortlinks.selected) {
      let shortlink = _.find(shortlinks.items, (link) => {
        return link.slug === shortlinks.selected;
      });
      this.setState({
        selected: true,
        shortlink: shortlink
      });
    }
  },

  render() {
    return this.state.selected ? (
      <div>
        <h1>s7r.io/{this.state.shortlink.slug}</h1>
        <h2>{this.state.shortlink.longUrl}</h2>
      </div>
    ) : (
      <div>Please select a link to get started.</div>
    );
  }
});

export default ShortlinkDetail;

