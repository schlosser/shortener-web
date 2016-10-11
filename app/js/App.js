'use strict';

import React              from 'react';

import AuthActions from './actions/AuthActions';
import AuthStore   from './stores/AuthStore';
import Navbar             from './components/Navbar';
import Footer             from './components/Footer';
import firebase from 'firebase';

const propTypes = {
  params: React.PropTypes.object,
  query: React.PropTypes.object,
  children: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.object
  ])
};

class App extends React.Component {

  constructor(props) {
    super(props);
    firebase.auth().onAuthStateChanged(AuthStore.onAuthStateChanged);
  }

  componentWillMount() {
    console.log('About to mount App');

  }

  renderChildren() {
    return React.cloneElement(this.props.children, {
      params: this.props.params,
      query: this.props.query,
    });
  }

  render() {
    return (
      <div>

        <Navbar />

        {this.renderChildren()}

        <Footer />

      </div>
    );
  }

}

App.propTypes = propTypes;

export default App;
