'use strict';

import React from 'react';
import Reflux from 'reflux';
import {Match, Redirect} from 'react-router';
import {AuthStore} from '../stores/AuthStore';

// Matches `...rest` (params passed in) to `Component` if the user is
// known to be authenticated. Otherwise, redirects to login.
const MatchIfAuthenticated = React.createClass({
  mixins: [Reflux.connect(AuthStore, 'auth')],

  getInitialState() {
    console.log('MatchIfAuthenticated:getInitialState', AuthStore);
    return {
      auth: {
        user: null,
        isAuthenticated: null
      }
    };
  },

  init(props = { component: Component, ...rest }) {
    this.component = Component;
    this.rest = rest;
  },

  render() {
    return (
      <Match {...this.rest} render={props => (
        this.state.auth.isAuthenticated ? (
          <Component {...props}/>
        ) : (
          <Redirect to={{
            pathname: '/login',
            state: { from: props.location }
          }}/>
        )
      )}/>
    );
  }
});

export default MatchIfAuthenticated;
