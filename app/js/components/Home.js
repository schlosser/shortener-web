'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import ShortlinkForm from './ShortlinkForm';

class Home extends React.Component {

  static get propTypes() {
    return {
      onSubmit: PropTypes.func,
    };
  }

  render() {
    return (
      <div>
        <ShortlinkForm onSubmit={this.props.onSubmit}/>
        <div className="detail-canvas"></div>
      </div>
    );
  }
}

export default Home;

