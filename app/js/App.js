'use strict';

import React from 'react';
import Reflux from 'reflux';
import { BrowserRouter, Match, Miss } from 'react-router';
import MatchIfAuthenticated from './utils/MatchIfAuthenticated';
import AuthStore from './stores/AuthStore';
import * as firebase from 'firebase';
import Console from './components/Console';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';

const App = React.createClass({
  mixins: [Reflux.connect(AuthStore, 'auth')],

  componentWillMount() {
    firebase.auth().onAuthStateChanged(AuthStore.onAuthStateChanged.bind(this));
  },

  render() {
    const pageContent = (this.state.auth.isAuthenticated === null) ? (
      <div>Retrieving authentication state...</div>
    ) : (
      <div className="content">
        <Match pattern="/login" component={LoginPage} />
        <MatchIfAuthenticated component={Console} pattern="/"/>
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
