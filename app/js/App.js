'use strict';

import React from 'react';
import Reflux from 'reflux';
import { BrowserRouter, Match, Miss } from 'react-router';
import MatchIfAuthenticated from './utils/MatchIfAuthenticated';
import AuthStore from './stores/AuthStore';
import firebaseApp from './utils/Firebase';
import Console from './components/Console';
import NotFoundPage from './pages/NotFoundPage';

var App = React.createClass({
  mixins: [Reflux.listenTo(AuthStore, 'onAuthStoreChanged')],

  getInitialState() {
    console.log('App:getInitialState', AuthStore);
    return {
      auth: {
        user: null,
        isAuthenticated: null
      }
    };
  },

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
    const pageContent = (this.state.auth.isAuthenticated !== null) ? (
      <div>Retrieving authentication state...</div>
    ) : (
      <div>
        <Match exactly pattern="/login" />
        <MatchIfAuthenticated pattern="/" component={Console} />
        <Miss component={NotFoundPage} />
      </div>
    );
    return (
      <BrowserRouter>
        <div>
          { pageContent }
        </div>
      </BrowserRouter>
    );
  }
});

export default App;
