'use strict';

import Reflux from 'reflux';
import AuthActions from '../actions/AuthActions';
import * as firebase from 'firebase';

const AuthStore = Reflux.createStore({
  listenables: AuthActions,

  init() {
    this.user = null;
  },

  getState () {
    return {
      user: this.getUser()
    };
  },

  getUser() {
    if (!this.user) {
      this.user = firebase.auth().currentUser;
    }

    return this.user;
  },

  setUser(user) {
    console.log('setUser', user)
    this.user = user;
    console.log('getState: ', this.getState());
    this.trigger(this.getState());
  },

  throwError(err) {
    this.trigger(err);
  },

  asdf() {
    if (this.user) {
      console.log('checkLoginStatus setting to this.user');
      this.setUser(this.user);
    } else if (firebase.auth().currentUser) {
      console.log('checkLoginStatus setting to firebase currentUser');
      this.setUser(firebase.auth().currentUser);
    }

    return this.user !== null;
  },

  onAuthStateChanged(user) {
    if (user) {
      // User is signed in
      console.log('onAuthStateChanged', user);
      this.setUser(user);
    } else {
      // User is signed out
      console.log('User is signed out');
    }
  },

  onLogin() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  },

  onLogout() {
    console.log("logoutUser", user);
    // AuthAPI.logout(this.user).then(() => {
    //   this.setUser(null);
    // });
  }

});

export default AuthStore;
