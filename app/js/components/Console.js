'use strict';

import React from 'react';
import { BrowserRouter, Match, Miss, Link } from 'react-router';
import AuthActions from '../actions/AuthActions';
import AuthStore from '../stores/AuthStore';
import Navbar from './Navbar';
import Footer from './Footer';
import ShortlinkList from './ShortlinkList';
import ShortlinkDetail from './ShortlinkDetail';

class Console extends React.Component {

  render() {
    return (
      <div>
        <Navbar />
        <div className="sidebar">
          <ShortlinkList />
        </div>
        <div className="details">
          <ShortlinkDetail />
        </div>
        <Footer />
      </div>
    );
  }
}

export default Console;

