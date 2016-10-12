'use strict';

import Reflux from 'reflux';
import AuthActions from '../actions/AuthActions';
import firebaseApp from '../utils/Firebase';

const AuthStore = Reflux.createStore({
  listenables: AuthActions,

  init: function() {
    this.auth = this.getInitialState();
  },

  getInitialState: function() {
    return {
      user: null,
      // This will be null until we know for a fact if we're authenticated or not
      // (because onAuthStateChanged was called).
      isAuthenticated: null
    };
  },

  onAuthStateChanged: function(user) {
    console.log('AuthStore:onAuthStateChanged', user);
    if (user) {
      // User is signed in
      console.log('User is signed in');
      console.log(this);
      this.auth = {
        user: user,
        isAuthenticated: true
      };
    } else {
      // User is signed out
      console.log('User is signed out');
      this.auth = {
        user: null,
        isAuthenticated: false
      };
    }

    console.log('AuthStore: state:', this.auth);
    this.trigger(this.auth);
  },

  onSignIn: function() {
    console.log("Signing in user...");
    const provider = new firebaseApp.auth.GoogleAuthProvider();
    firebaseApp.auth().signInWithPopup(provider);
  },

  onSignOut: function() {
    console.log("Signing out user...");
    firebaseApp.auth().signOut();
  }
});

export default AuthStore;
