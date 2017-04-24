'use strict';

import React         from 'react';
import PropTypes     from 'prop-types';
import DocumentTitle from 'react-document-title';

const propTypes = {
  currentUser: PropTypes.object
};

class NotFoundPage extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <DocumentTitle title="404: Not Found">
        <section className="not-found-page">

          Page Not Found

        </section>
      </DocumentTitle>
    );
  }

}

NotFoundPage.propTypes = propTypes;

export default NotFoundPage;
