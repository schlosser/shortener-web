'use strict';

import Reflux from 'reflux';
import AuthActions from '../actions/AuthActions';
import * as firebase from 'firebase';

const AuthStore = Reflux.createStore({
  listenables: AuthActions,

  init() {
    this.auth = this.getInitialState();
  },

  getInitialState() {
    return {
      user: null,
      // This will be null until we know for a fact if we're authenticated or not
      // (because onAuthStateChanged was called).
      isAuthenticated: null
    };
  },

  onAuthStateChanged(user) {
    if (user) {
      // User is signed in
      console.log('AuthStore: User is signed in');
      this.auth = {
        user: user,
        isAuthenticated: true
      };
    } else {
      // User is signed out
      console.log('AuthStore: User is signed out');
      this.auth = {
        user: null,
        isAuthenticated: false
      };
    }

    this.trigger(this.auth);
  },

  onSignIn() {
    console.log("AuthStore: Signing in user...");
    let provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  },

  onSignOut() {
    console.log("AuthStore: Signing out user...");
    firebase.auth().signOut();
  }
});

export default AuthStore;
