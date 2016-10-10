'use strict';

import request from 'superagent';
import {camel} from 'change-case';
import helpers from './Helpers';

const APIUtils = {

  root: '//localhost:3000/api/',

  normalizeResponse(response) {
    return helpers.processObjectKeys(response, key => { return camel(key); });
  },

  get(path) {
    return new Promise((resolve, reject) => {
      request.get(this.root + path)
      .withCredentials()
      .end((err, res) => {
        if ( err || !res.ok ) {
          reject(this.normalizeResponse(err || res));
        } else {
          resolve(this.normalizeResponse(res));
        }
      });
    });
  },

  post(path, body) {
    return new Promise((resolve, reject) => {
      request.post(this.root + path, body)
      .withCredentials()
      .end((err, res) => {
        console.log(err, res);
        if ( err || !res.ok ) {
          reject(this.normalizeResponse(err || res));
        } else {
          resolve(this.normalizeResponse(res));
        }
      });
    });
  },

  patch(path, body) {
    return new Promise((resolve, reject) => {
      request.patch(this.root + path, body)
      .withCredentials()
      .end((err, res) => {
        if ( err || !res.ok ) {
          reject(this.normalizeResponse(err || res));
        } else {
          resolve(this.normalizeResponse(res));
        }
      });
    });
  },

  put(path, body) {
    return new Promise((resolve, reject) => {
      request.put(this.root + path, body)
      .withCredentials()
      .end((err, res) => {
        if ( err || !res.ok ) {
          reject(this.normalizeResponse(err || res));
        } else {
          resolve(this.normalizeResponse(res));
        }
      });
    });
  },

  del(path) {
    return new Promise((resolve, reject) => {
      request.del(this.root + path)
      .withCredentials()
      .end((err, res) => {
        if ( err || !res.ok ) {
          reject(this.normalizeResponse(err || res));
        } else {
          resolve(this.normalizeResponse(res));
        }
      });
    });
  }

};

export default APIUtils;
