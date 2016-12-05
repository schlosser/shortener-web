'use strict';

import React         from 'react';
import Reflux         from 'reflux';
import AuthActions from '../actions/AuthActions';
import AuthStore from '../stores/AuthStore';
import DocumentTitle from 'react-document-title';
import {Redirect} from 'react-router';

var LoginPage = React.createClass({
  render() {
    const fromUrl = this.props.location.state ? this.props.location.state.fromUrl : '/';
    return (
      <div>
        {AuthStore.auth.isAuthenticated && (
          <Redirect to={fromUrl || '/'} />
        )}
        <DocumentTitle title="Login">
          <div className="splash-content">
            <h1 className="splash">Shortener.io</h1>
            <p>Your personal URL Shortener</p>
            <div className="button google-login"
              onClick={AuthActions.signIn}>Login with Google</div>
          </div>
        </DocumentTitle>
      </div>
    );
  }
});

export default LoginPage;
