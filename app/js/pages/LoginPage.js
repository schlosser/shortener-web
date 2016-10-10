'use strict';

import React         from 'react';
import Reflux from 'reflux';
import AuthStore from '../stores/AuthStore';
import AuthActions from '../actions/AuthActions';
import {Router, Link}        from 'react-router';
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
    this.listenTo(AuthStore, this.onAuthChange);
  },

  onAuthChange(auth) {
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
        <section className="login-page">

          <div>
            Login
          </div>

          <div className="button google-login"
            onClick={AuthActions.login}>Login with Google</div>
        </section>
      </DocumentTitle>
    );
  },
});

export default LoginPage;
