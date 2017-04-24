'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import Navbar from './Navbar';
import Footer from './Footer';
import ShortlinkList from './ShortlinkList';
import ShortlinkDetail from './ShortlinkDetail';
import NotFoundPage from '../pages/NotFoundPage';
import Home from './Home';
import { Route, Switch, Link, Redirect } from 'react-router-dom';
import * as firebase from 'firebase';
import * as _ from 'lodash';

class Console extends React.Component {

  static get propTypes() {
    return {
      onSignOut: PropTypes.func,
      history: PropTypes.object,
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      areLoaded: false,
      items: [],
      selected: null,
    };
  }

  componentWillMount() {
    this.firebaseRef = firebase.database().ref('links');
    this.firebaseRef.limitToLast(25).on('value', (dataSnapshot) => {
      const shortlinks = [];

      dataSnapshot.forEach((childSnapshot) => {
        const shortlink = childSnapshot.val();
        shortlink['.key'] = childSnapshot.key;
        shortlinks.push(shortlink);
      });

      this.setState({
        areLoaded: true,
        items: shortlinks,
      });
    });
  }

  onSubmit(initialSlug, slug, longUrl, failure) {
    const newShortlinkRef = this.firebaseRef.child(slug);

    if (this.state.items.filter(shortlink => {
      return shortlink.slug === slug;
    }).length > 0 && initialSlug != slug) {
      failure('This URL is taken.');
      return;
    }

    if (!initialSlug) {
      // Create new entry
      newShortlinkRef.set({
        count: 0,
        dateCreated: Date.now(),
        longUrl: longUrl,
        slug: slug,
      });
    } else if (initialSlug === slug) {
      // Update new longUrl
      newShortlinkRef.child('longUrl').set(longUrl);
    } else {
      // Move shortlink to new slug.
      const oldShortlinkRef = this.firebaseRef.child(initialSlug);
      oldShortlinkRef.once('value', (dataSnapshot) => {
        const oldShortlink = dataSnapshot.val();
        oldShortlink.slug = slug;
        oldShortlink.longUrl = longUrl;
        newShortlinkRef.set(oldShortlink);
      });
      oldShortlinkRef.remove();
    }
    this.props.history.push('/edit/' + slug);
  }

  onDelete(slug) {
    this.firebaseRef.child(slug).remove();
    this.props.history.push('/');
  }

  render() {
    const ShortlinkDetailRoute = (props) => {
      const selectedLink = _.find(this.state.items, (link) => {
        return link.slug === props.match.params.slug;
      });

      if (!this.state.areLoaded) {
        return <div>Loading...</div>;
      }

      return selectedLink ? (
        <ShortlinkDetail
          shortlink={selectedLink}
          onSubmit={this.onSubmit.bind(this)}
          onDelete={this.onDelete.bind(this)}/>
      ) : (
        <NotFoundPage />
      );
    };

    const HomeRoute = () => (
      <Home onSubmit={this.onSubmit.bind(this)}/>
    );

    return (
      <div>
        <Navbar onSignOut={this.props.onSignOut} />
        <div className="sidebar">
          <Link to="/" className="new-button">
            <span className="text-wrapper">
              <span className="text">Create New Link</span>
            </span>
          </Link>
          {
            this.state.areLoaded ? (
              <ShortlinkList
                items={this.state.items} />
            ) :(
              <div>Spinner...</div>
            )
          }
        </div>
        <div className="details">
          <Switch>
            <Route exact path="/" component={HomeRoute}/>
            <Route path="/edit/:slug" component={ShortlinkDetailRoute}/>
          </Switch>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Console;

