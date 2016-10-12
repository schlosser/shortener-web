'use strict';

import React from 'react';
import { BrowserRouter, Match, Miss, Link } from 'react-router';
import AuthActions from '../actions/AuthActions';
import AuthStore from '../stores/AuthStore';
import Navbar from './Navbar';
import Footer from './Footer';
import UrlList from './UrlList';

class Console extends React.Component {

  componentWillMount() {
    console.log('About to mount Console');
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="sidebar">
          <UrlList />
        </div>
        <div className="details">
          {this.renderChildren()}
        </div>
        <Footer />
      </div>
    );
  }
}

export default Console;
