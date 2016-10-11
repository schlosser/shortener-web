'use strict';

import React         from 'react';
import {Link}        from 'react-router';
import DocumentTitle from 'react-document-title';

const propTypes = {
  currentUser: React.PropTypes.object
};

class HomePage extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <DocumentTitle title="Home">
        <div>Home</div>
        <div>Home</div>
        <div>Home</div>
        <div>Home</div>
        <div>Home</div>
        <div>Home</div>
      </DocumentTitle>
    );
  }

}

HomePage.propTypes = propTypes;

export default HomePage;
