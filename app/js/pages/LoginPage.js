'use strict';

import React         from 'react';
import AuthActions from '../actions/AuthActions';
import DocumentTitle from 'react-document-title';

var LoginPage = React.createClass({

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
  }
});

export default LoginPage;
