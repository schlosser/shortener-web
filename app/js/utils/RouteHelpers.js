import React from 'react';
import Router from 'react-router';
import firebase from 'firebase'
import AuthStore from '../stores/AuthStore';

const loginRequired = function(nextState, replace) {
  var user = AuthStore.getUser();
  console.log('loginRequired', user);
  if (!user) {
    replace({ nextPathname: nextState.location.pathname }, '/login');
  }
}

export default loginRequired;
