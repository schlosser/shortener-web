'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import ShortlinkForm from './ShortlinkForm';
import {GoogleMap, Marker, withGoogleMap} from 'react-google-maps';

const GoogleMapWithClicks = withGoogleMap(props => (
  <GoogleMap
      defaultZoom={2}
      defaultOptions={{
        scrollwheel: false,
      }}
      defaultCenter={props.bounds.getCenter() }
      onClick={props.onMapClick}>
    {props.markers.map(marker => (
      <Marker {...marker} />
    ))}
  </GoogleMap>
));

class ShortlinkDetail extends React.Component {

  static get propTypes() {
    return {
      shortlink: PropTypes.object,
      onSubmit: PropTypes.func,
      onDelete: PropTypes.func,
    };
  }

  constructor(props) {
    super(props);
    console.log('props:', this.props);
  }

  getMarkers() {
    const clicks = this.props.shortlink.clicks || {};
    return Object.values(clicks).map((click) => ({
      position: {
        lat: click.loc.latitude,
        lng: click.loc.longitude,
      },
      key: click.t,
      defaultAnimation: 2,
    }));
  }

  handleDelete(e) {
    e.preventDefault();
    console.log(this);
    this.props.onDelete(this.props.shortlink.slug);
  }

  render() {
    const {shortlink, onSubmit} = this.props;

    const clickCount = shortlink.clicks ?
      (<h1>{Object.keys(shortlink.clicks).length} clicks</h1>)
      :
      (<h1>No clicks yet...</h1>);

    const bounds = new window.google.maps.LatLngBounds();
    const markers = this.getMarkers();
    markers.forEach(marker => {
      bounds.extend(marker.position);
    });

    // map.fitBounds(bounds);

    return (
      <div>
        <ShortlinkForm
          slug={shortlink.slug}
          longUrl={shortlink.longUrl}
          onSubmit={onSubmit}/>
        <div className="content">
          <section>
            {clickCount}
          </section>
          <div>
            <GoogleMapWithClicks
              bounds={bounds}
              containerElement={
                <div style={{ height: '20rem' }} />
              }
              mapElement={
                <div style={{ height: '100%' }} />
              }
              markers={markers}/>
          </div>
          <div className="centered-content">
            <div
              onClick={this.handleDelete.bind(this)}
              className="button black">
              Delete link
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default ShortlinkDetail;

