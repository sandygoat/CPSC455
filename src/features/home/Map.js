import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import GoogleMapReact from "google-map-react";
import MapStyles from '../../styles/map.js';

const center = {
    lat: 49.260969294737095,
    lng: -123.24598937411244,
};

export default function Map() {
  return (
    <div className="home-map">
      <div style={{ height: '50vh', width: '100%', float: 'right' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_API_KEY }}
                defaultCenter={center}
                center={center}
                defaultZoom={14.2}
                options={{ disableDefaultUI: true, zoomControl: true, styles: MapStyles }}
            />

        </div>
    </div>
  );
};


Map.propTypes = {};
Map.defaultProps = {};
