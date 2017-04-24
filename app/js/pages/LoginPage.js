'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';
import {Redirect} from 'react-router-dom';

class LoginPage extends React.Component {

  static get propTypes() {
    return {
      location: PropTypes.shape({
        state: PropTypes.shape({
          fromUrl: PropTypes.object,
        })
      }),
      auth: PropTypes.shape({
        user: PropTypes.object,
        isAuthenticated: PropTypes.bool,
      }),
      onSignIn: PropTypes.func,
    };
  }

  render() {
    const fromUrl = this.props.location.state ? this.props.location.state.fromUrl : '/';
    return (
      <div>
        {this.props.auth.isAuthenticated && (
          <Redirect to={fromUrl || '/'} />
        )}
        <DocumentTitle title="Login">
          <div className="splash-content">
            <h1 className="splash">Shortener.io</h1>
            <p>Your personal URL Shortener</p>
            <div className="button google-login"
              onClick={this.props.onSignIn}>Login with Google</div>
          </div>
        </DocumentTitle>
      </div>
    );
  }
};

export default LoginPage;
