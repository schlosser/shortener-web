'use strict';

import React from 'react';
import PropTypes from 'prop-types';

class Navbar extends React.Component {

  static get propTypes() {
    return {
      onSignOut: PropTypes.func,
      onToggleNav: PropTypes.func,
    };
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <nav>
        <div className="hamburger" onClick={this.props.onToggleNav}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
        <div className="nav-content nav-sidebar" onClick={this.props.onToggleNav}>
          <div className="site-title">Shortener</div>
        </div>
        <div className="nav-spacer"></div>
        <div className="nav-content">
          <div className="button text-button" onClick={this.props.onSignOut}>Sign out</div>
        </div>
      </nav>
    );
  }

}

export default Navbar;
