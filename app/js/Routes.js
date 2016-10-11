'use strict';

import React                       from 'react';
import {Router, Route, IndexRoute} from 'react-router';
import CreateBrowserHistory        from 'history/lib/createBrowserHistory';

import App                         from './App';
import LoginPage                   from './pages/LoginPage';
import HomePage                    from './pages/HomePage';
import SearchPage                  from './pages/SearchPage';
import NotFoundPage                from './pages/NotFoundPage';

import loginRequired from './utils/RouteHelpers';

export default (
  <Router history={CreateBrowserHistory()}>
    <Route path="/" component={App} onEnter={loginRequired}>
      <IndexRoute component={HomePage} />
      <Route path="search" component={SearchPage} />
    </Route>
    <Route path="/login" component={LoginPage} />
    <Route path="*" component={NotFoundPage} />
  </Router>
);
