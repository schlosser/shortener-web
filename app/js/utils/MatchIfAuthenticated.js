'use strict';

import React from 'react';
import {Match, Redirect} from 'react-router';
import AuthStore from '../stores/AuthStore';

// Matches `...rest` (params passed in) to `Component` if the user is
// known to be authenticated. Otherwise, redirects to login.
const MatchIfAuthenticated = React.createClass({
  render() {
    let {component: Component, ...rest} = this.props;
    return (
      <Match {...this.props} render={props => (
        AuthStore.auth.isAuthenticated === true ? (
          <Component {...props}/>
        ) : (
          AuthStore.auth.isAuthenticated === false ? (
            <Redirect to={{
              pathname: '/login',
              state: { fromUrl: props.location }
            }}/>
          ) : (
            <div>Poop</div>
          )
        )
      )}/>
    );
  }
});

export default MatchIfAuthenticated;
