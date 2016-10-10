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
    <Route path="/" component={App}>
      <IndexRoute component={HomePage} onEnter={loginRequired}/>
      <Route path="/login" component={LoginPage} name="LoginPage"/>
      <Route path="/search" component={SearchPage} onEnter={loginRequired}/>
      <Route path="*" component={NotFoundPage} />
    </Route>
  </Router>
);
