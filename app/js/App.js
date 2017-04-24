'use strict';

import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MatchIfAuthenticated from './utils/MatchIfAuthenticated';
import * as firebase from 'firebase';
import Console from './components/Console';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      auth: {
        user: null,
        isAuthenticated: false,
        authCallbackSuccess: false,
      },
    };
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged.bind(this));
  }

  onAuthStateChanged(user) {
    if (user) {
      // User is signed in
      console.log('User is signed in');
      this.setState({
        auth: {
          user: user,
          isAuthenticated: true,
          authCallbackSuccess: true,
        }
      });
    } else {
      // User is signed out
      console.log('User is signed out');
      this.setState({
        auth: {
          user: null,
          isAuthenticated: false,
          authCallbackSuccess: true,
        }
      });
    }
  }

  onSignIn() {
    console.log('AuthStore: Signing in user...');
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  }

  onSignOut() {
    console.log('AuthStore: Signing out user...');
    firebase.auth().signOut();
  }

  render() {
    const LoginRoute = (props) => {
      return (
        <LoginPage
          onSignIn={this.onSignIn}
          auth={this.state.auth}
          {...props}/>
      );
    };

    const ConsoleRoute = (props) => {
      return (
        <Console
          onSignOut={this.onSignOut}
          {...props} />
      );
    };

    return (
      <BrowserRouter>
        <div className="pageContent">
          {
            this.state.auth.authCallbackSuccess ? (
              <Switch>
                <Route path="/login" component={LoginRoute} />
                <MatchIfAuthenticated auth={this.state.auth} component={ConsoleRoute} pattern="/"/>
                <Route component={NotFoundPage} />
              </Switch>
            ) : (
              <div>Loading Auth...</div>
            )
          }
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
