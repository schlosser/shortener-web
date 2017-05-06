'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import {Route, Redirect} from 'react-router-dom';

// Matches `...rest` (params passed in) to `Component` if the user is
// known to be authenticated. Otherwise, redirects to login.
class MatchIfAuthenticated extends React.Component {

  static get propTypes() {
    return {
      component: PropTypes.func,
      auth: PropTypes.shape({
        isAuthenticated: PropTypes.bool,
        user: PropTypes.object,
      }),
    };
  }

  render() {
    let {component: Component} = this.props;
    return (
      <Route render={props => (
        (this.props.auth.isAuthenticated === true
          &&
         this.props.auth.user.email === 'dan.r.schlosser@gmail.com'
        ) ? (
          <Component {...props}/>
        ) : (
          this.props.auth.isAuthenticated === false ? (
            <Redirect to={{
              pathname: '/login',
              state: { fromUrl: props.location }
            }}/>
          ) : (
            <div>Authenication was null</div>
          )
        )
      )}/>
    );
  }
};

export default MatchIfAuthenticated;
