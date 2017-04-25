'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import ShortlinkForm from './ShortlinkForm';
import ClickMap from './ClickMap';
import ClickCounts from './ClickCounts';

class ShortlinkDetail extends React.Component {

  static get propTypes() {
    return {
      shortlink: PropTypes.object,
      onSubmit: PropTypes.func,
      onDelete: PropTypes.func,
    };
  }

  constructor(props) {
    super(props);
    console.log('props:', this.props);
  }

  handleDelete(e) {
    e.preventDefault();
    console.log(this);
    this.props.onDelete(this.props.shortlink.slug);
  }

  render() {
    const {shortlink, onSubmit} = this.props;

    return (
      <div>
        <ShortlinkForm
          slug={shortlink.slug}
          longUrl={shortlink.longUrl}
          onSubmit={onSubmit}/>
        <div className="detail-canvas">
          <div className="content">
            <ClickCounts clicks={shortlink.clicks}/>
            <ClickMap clicks={shortlink.clicks} />
            <div className="centered-content">
              <div
                onClick={this.handleDelete.bind(this)}
                className="button black">
                Delete link
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default ShortlinkDetail;

