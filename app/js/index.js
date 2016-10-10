'use strict';

// Initialize Firebase
const config = {
  apiKey: "AIzaSyDjQ3fXW5mhnNW_kpTEY-P1iImiRhex1-s",
  authDomain: "url-shortener-1508b.firebaseapp.com",
  databaseURL: "https://url-shortener-1508b.firebaseio.com",
  storageBucket: "url-shortener-1508b.appspot.com",
  messagingSenderId: "156999012315"
};
const firebaseApp = firebase.initializeApp(config);

import React     from 'react';
import ReactDOM  from 'react-dom';
import Routes    from './Routes';
import firebase from 'firebase';

if ( process.env.NODE_ENV !== 'production' ) {
  // Enable React devtools
  window.React = React;
}


ReactDOM.render(Routes, document.getElementById('app'));
