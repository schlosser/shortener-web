'use strict';

import React     from 'react';
import ReactDOM  from 'react-dom';
import firebase from 'firebase';
import App    from './App';

if ( process.env.NODE_ENV !== 'production' ) {
  // Enable React devtools
  window.React = React;
}

// Firebase configuration
var config = {
  apiKey: "AIzaSyDjQ3fXW5mhnNW_kpTEY-P1iImiRhex1-s",
  authDomain: "url-shortener-1508b.firebaseapp.com",
  databaseURL: "https://url-shortener-1508b.firebaseio.com",
  storageBucket: "url-shortener-1508b.appspot.com",
  messagingSenderId: "156999012315"
};

firebase.initializeApp(config);

ReactDOM.render(<App/>, document.getElementById('app'));
