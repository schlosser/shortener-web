import firebase from 'firebase';

// Firebase configuration
const config = {
  apiKey: "AIzaSyDjQ3fXW5mhnNW_kpTEY-P1iImiRhex1-s",
  authDomain: "url-shortener-1508b.firebaseapp.com",
  databaseURL: "https://url-shortener-1508b.firebaseio.com",
  storageBucket: "url-shortener-1508b.appspot.com",
  messagingSenderId: "156999012315"
};

// The default Firebase app if one exists. If none exists, initializes one.
const firebaseApp = (() => {
  if (firebase.apps.length === 0) {
    return firebase.initializeApp(config);
  }
  return firebase.app();
})();

export default firebaseApp;
