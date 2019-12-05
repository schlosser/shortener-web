'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import {GoogleMap, Marker, withGoogleMap} from 'react-google-maps';
import MarkerClusterer from 'react-google-maps/lib/components/addons/MarkerClusterer';
import * as _ from 'lodash';

class ClickMap extends React.Component {

  static get propTypes() {
    return {
      clicks: PropTypes.object,
    };
  }

  getMarkers() {
    const clicks = this.props.clicks || {};
    return Object.values(clicks).map((click) => ({
      position: {
        lat: click.loc.latitude,
        lng: click.loc.longitude,
      },
      key: click.t,
      defaultAnimation: 2,
    }));
  }

  render() {
    const GoogleMapWithClicks = withGoogleMap(props => (
      <GoogleMap
          defaultZoom={2}
          defaultOptions={{
            scrollwheel: false,
          }}
          defaultCenter={props.bounds.getCenter() }
          onClick={props.onMapClick}>
        <MarkerClusterer
          onClusteringBegin={_.noop}
          onMouseOut={_.noop}>
          {props.markers.map(marker => (
            <Marker {...marker} />
          ))}
        </MarkerClusterer>
      </GoogleMap>
    ));

    const bounds = new window.google.maps.LatLngBounds();
    const markers = this.getMarkers();
    markers.forEach(marker => {
      bounds.extend(marker.position);
    });

    // map.fitBounds(bounds);

    return (
      <GoogleMapWithClicks
        bounds={bounds}
        containerElement={
          <div style={{ height: '25rem' }} />
        }
        mapElement={
          <div style={{ height: '100%' }} />
        }
        markers={markers}/>
    );
  }
}

export default ClickMap;
