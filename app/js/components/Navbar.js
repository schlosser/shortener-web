'use strict';

import React from 'react';
import PropTypes from 'prop-types';

class Navbar extends React.Component {

  static get propTypes() {
    return {
      onSignOut: PropTypes.func,
    };
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <nav>
        <div className="nav-content nav-sidebar">
          <div className="site-title">Shortener</div>
        </div>
        <div className="nav-content nav-details"></div>
        <div className="nav-content">
          <div className="button text-button" onClick={this.props.onSignOut}>Sign out</div>
        </div>
      </nav>
    );
  }

}

export default Navbar;
