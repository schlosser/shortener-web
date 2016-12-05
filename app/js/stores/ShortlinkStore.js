'use strict';

import Reflux from 'reflux';
import ShortlinkActions from '../actions/ShortlinkActions';
import * as firebase from 'firebase';

const AuthStore = Reflux.createStore({
  listenables: ShortlinkActions,

  init() {
    this.shortlinks = this.getInitialState();
  },

  getInitialState() {
    return {
      areLoaded: false,
      items: [],
      selected: null
    };
  },

  onLoad() {
    this.firebaseRef = firebase.database().ref('links');
    this.firebaseRef.limitToLast(25).on('value', (dataSnapshot) => {
      var shortlinks = [];

      dataSnapshot.forEach((childSnapshot) => {
        var shortlink = childSnapshot.val();
        shortlink['.key'] = childSnapshot.key;
        shortlinks.push(shortlink);
      });

      this.shortlinks.items = shortlinks;
      this.shortlinks.areLoaded = true;

      this.trigger(this.shortlinks);
    });
  },

  onSelect(slug) {
    this.shortlinks.selected = slug;
    this.trigger(this.shortlinks);
  }
});

export default AuthStore;
