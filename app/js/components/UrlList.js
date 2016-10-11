'use strict';

import React from 'react';
import * as _ from 'lodash';

class UrlList extends React.Component {

  constructor(props) {
    super(props);
  }

  getState() {
    return {
      items: {
        "abc" : {
          "count" : 0,
          "dateCreated" : 1474164167499,
          "longUrl" : "http://abc.xyz",
          "slug" : "abc"
        },
        "alpha" : {
          "count" : 1,
          "dateCreated" : 1475183743678,
          "longUrl" : "http://yihjen.com",
          "slug" : "alpha"
        },
        "amazon" : {
          "count" : 0,
          "dateCreated" : 1475179594528,
          "longUrl" : "https://www.amazon.com",
          "slug" : "amazon"
        },
        "chris" : {
          "count" : 1,
          "dateCreated" : 1475358559163,
          "longUrl" : "http://poop.bike",
          "slug" : "chris"
        },
        "conor" : {
          "count" : 0,
          "dateCreated" : 1475179551282,
          "longUrl" : "http://conorbloomer.com",
          "slug" : "conor"
        },
        "cool" : {
          "count" : 0,
          "dateCreated" : 1475179764944,
          "longUrl" : "https://schlosser.io/",
          "slug" : "cool"
        },
        "dan" : {
          "count" : 20,
          "dateCreated" : 1475158931294,
          "longUrl" : "https://schlosser.io",
          "slug" : "dan"
        },
        "dev" : {
          "count" : 1,
          "dateCreated" : 1475718016742,
          "longUrl" : "http://poop.bike",
          "slug" : "dev"
        },
        "firebase" : {
          "count" : 0,
          "dateCreated" : 1474310217947,
          "longUrl" : "http://firebase.google.com",
          "slug" : "firebase"
        },
        "goog" : {
          "count" : 1,
          "dateCreated" : 1474164148653,
          "longUrl" : "http://www.google.com",
          "slug" : "goog"
        },
        "isaac" : {
          "count" : 0,
          "dateCreated" : 1475179543080,
          "longUrl" : "http://isaaclevien.com",
          "slug" : "isaac"
        },
        "jeff" : {
          "count" : 1,
          "dateCreated" : 1475964791610,
          "longUrl" : "http://jhil.co",
          "slug" : "jeff"
        },
        "nathan" : {
          "count" : 0,
          "dateCreated" : 1475179529466,
          "longUrl" : "http://nathansavoy.com",
          "slug" : "nathan"
        },
        "test" : {
          "count" : 0,
          "dateCreated" : 1475179520793,
          "longUrl" : "https://test.com",
          "slug" : "test"
        },
        "zebra" : {
          "count" : 0,
          "dateCreated" : 1474164183777,
          "longUrl" : "http://zebra.link",
          "slug" : "zebra"
        }
      }
    };
  }

  render() {
    var items = [];
    _.forIn(this.getState().items, (value, key) => {
      var className = key === 'goog' ? 'url-list-item active' : 'url-list-item';
      items.push(
        <li className={className}>
          <h3>s7r.io/{key}</h3>
          <h5>{value.longUrl}</h5>
        </li>
      );
    });
    return (
      <ul className="url-list">
        {items}
      </ul>
    );
  }
}

export default UrlList;
