'use strict';

import React from 'react';
import Reflux from 'reflux';
import { BrowserRouter, Match, Miss } from 'react-router';
import MatchIfAuthenticated from './utils/MatchIfAuthenticated';
import AuthStore from './stores/AuthStore';
import firebaseApp from './utils/Firebase';
import Console from './components/Console';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';

var App = React.createClass({
  mixins: [Reflux.listenTo(AuthStore, 'onAuthStoreChanged')],

  // getInitialState() {
  //   console.log('App:getInitialState', AuthStore);
  //   return {
  //     auth: {
  //       user: null,
  //       isAuthenticated: null
  //     }
  //   };
  // },

  componentWillMount() {
    console.log('About to mount App');
    firebaseApp.auth().onAuthStateChanged(AuthStore.onAuthStateChanged.bind(this));
  },

  onAuthStoreChanged(data) {
    console.log('App:onAuthStoreChanged', data);
    this.setState({
      auth: data
    });
  },

  render() {
    const pageContent = (this.state === null) ? (
      <div>Retrieving authentication state...</div>
    ) : (
      <div className="content">
        <MatchIfAuthenticated pattern="/console" component={Console} />
        <Match pattern="/login" component={LoginPage} />
        <Miss component={NotFoundPage} />
      </div>
    );
    return (
      <BrowserRouter>
        <div className="pageContent">
          { pageContent }
        </div>
      </BrowserRouter>
    );
  }
});

export default App;
