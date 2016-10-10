import React from 'react';
import Router from 'react-router';
import firebase from 'firebase'
import AuthStore from '../stores/AuthStore';

const loginRequired = function(nextState, replace) {
  console.log('loginRequired', AuthStore.getUser(), firebase.auth().currentUser);
  if (!AuthStore.getUser()) {
    replace({ nextPathname: nextState.location.pathname }, '/login');
  }
}

export default loginRequired;
