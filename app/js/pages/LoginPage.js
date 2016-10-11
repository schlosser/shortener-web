'use strict';

import React         from 'react';
import Reflux from 'reflux';
import AuthStore from '../stores/AuthStore';
import AuthActions from '../actions/AuthActions';
import {Router, Link, browserHistory}        from 'react-router';
import DocumentTitle from 'react-document-title';
import firebase from 'firebase';

var LoginPage = React.createClass({
  mixins: [
    Router.State,
    Router.Navigation,
    Reflux.connect(AuthStore),
    Reflux.ListenerMixin
  ],

  componentDidMount () {
    this.listenTo(AuthStore, this.onAuthChanged);
    firebase.auth().onAuthStateChanged(AuthStore.onAuthStateChanged);
  },

  onAuthChanged(auth) {
    console.log('LoginPage:onAuthChanged', auth.user)
    this.setState(auth);

    if (this.state.user) {
      var redirectUrl = '/';
      console.log('redirectUrl: ', redirectUrl)
      this.props.history.push(redirectUrl);
    }
  },

  render() {
    return (
      <DocumentTitle title="Login">
        <div className="splash-content">
          <h1 className="splash">Shortener.io</h1>
          <p>Your personal URL Shortener</p>
          <div className="button google-login"
            onClick={AuthActions.login}>Login with Google</div>
        </div>
      </DocumentTitle>
    );
  },
});

export default LoginPage;
