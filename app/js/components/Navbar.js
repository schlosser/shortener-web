'use strict';

import React from 'react';

class Navbar extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <nav>
        <div className="nav-content nav-sidebar">
          <div className="site-title">Shortener</div>
        </div>
        <div className="nav-content nav-details">
          <h1 className="page-title">s7r.io/title</h1>
          <h2 className="page-subtitle">https://www.google.com/</h2>
        </div>
        <div className="nav-content">
          <div className="button text-button">Sign out</div>
        </div>
      </nav>
    );
  }

}

export default Navbar;
