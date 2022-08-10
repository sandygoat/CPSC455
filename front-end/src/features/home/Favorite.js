import React, {useCallback, useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Card, Button, Tooltip, Modal, Spin, Col, Row, Statistic } from 'antd';
import Icon, {DeleteOutlined} from '@ant-design/icons';
import {useRemoveFromFavoriteList} from './redux/hooks';
import {useJsApiLoader, GoogleMap, Marker, DirectionsRenderer} from "@react-google-maps/api";
import MapStyles from "../../styles/map";
const libraries = ["places"];
const mapContainerStyle = {
  height: '600px', width: '100%'
};
const { Meta } = Card;
// import PropTypes from 'prop-types';

export default function Favorite({favorite}) {
  const [photoUrl, setPhotoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isClosed, setIsClosed] = useState(true);
  const [isRouteLoaded, setIsRouteLoaded] = useState(false);
  const {removeFromFavoriteList} = useRemoveFromFavoriteList();
  const [location, setLocation] = useState(null);
  const [directionResponse, setDirectionResponse] = useState(null);
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);
  const [map, setMap] = useState(null);
  const [mapLink, setLink] = useState("");
  const { authorizedUser} = useSelector(state => ({
    authorizedUser: state.home.authorizedUser,
  }));
  const directionHeader = "https://www.google.com/maps/dir/?api=1&";

  // useEffect(() => {
  //   const service = new window.google.maps.places.PlacesService(map);
  //   service.getDetails(
  //       {
  //         placeId: favorite.result.geometry.location,
  //         fields: ["photos"]
  //       },
  //       (result, status) => {
  //         if (status === window.google.maps.places.PlacesServiceStatus.OK) {
  //           setPhotoUrl(result.photos[0].getUrl({maxHeight: 250, maxWidth: 400}));
  //         }
  //       }
  //   )
  // }, [favorite, map])

  const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
          (position, error) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            setLocation({lat: lat, lng: lng});
            resolve({lat: lat, lng: lng});
    }, (error) => {
            reject(error);
          })});
  }

  function getRoute(mode) {
    setIsRouteLoaded(false);
    getCurrentLocation().then((current) => {
      const origin = `origin=${current.lat},${current.lng}`;
      const destination = `destination=${favorite.geometry.location.lat},${favorite.geometry.location.lng}`;
      setLink(directionHeader + origin + "&" + destination);
      const directionService = new window.google.maps.DirectionsService();
      return directionService.route({
        origin: current,
        destination: favorite.geometry.location,
        travelMode: mode
      })
    }).then((result) => {
      setDirectionResponse(result);
      setDistance(result.routes[0].legs[0].distance.text);
      setDuration(result.routes[0].legs[0].duration.text);
      setIsRouteLoaded(true);
    }).catch((error) => {
      console.log(error);
    });
  }

  const showModal = () => {
    setVisible(true);
    setIsClosed(false);
    getRoute(window.google.maps.TravelMode.DRIVING);
  };

  const handleOk = () => {
    setLoading(true);
    setLoading(false);
    setVisible(false);
    setIsRouteLoaded(false);
  };

  const handleCancel = () => {
    setVisible(false);
    setIsClosed(true);
  };

  const onLoad = useCallback(function callback(map) {
    map.setZoom(14.2);
    setMap(map)
  }, [])

  const onUnmount = useCallback(function callback(map) {
    setMap(null)
  }, [])

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
    libraries: libraries
  });

  const removeFromFavorites = () =>{
    removeFromFavoriteList({
      userId: authorizedUser,
      placeId: favorite.placeId,
    })
  }

  return !authorizedUser ? (
    <Redirect to="/login" />
  ) : (
    <div className="home-favorite">
      <Card
        cover={<img alt={favorite.placeId} src={favorite.photoUrls.length ? favorite.photoUrls[0] : ""}/>}
        actions={[
          <Button.Group>
            <Tooltip title={'Remove from favorites'} placement="topLeft">
              <Button data-testid="favButton" type={'default'} onClick={removeFromFavorites}>
                <DeleteOutlined />
              </Button>
            </Tooltip>
            <Button data-testid="detailsButton" type="default" onClick={showModal}>
              <Icon type="profile" /> Trip Planner
            </Button>
          </Button.Group>
        ]}
      >
        <Meta title={favorite.name} />
      </Card>
      <>
      {isClosed?null:<Modal
        visible={visible}
        title={favorite.name}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[]}
        width={1000}
      >
        <Button.Group>
          <Button type="primary" size="small" onClick={() => {getRoute(window.google.maps.TravelMode.DRIVING)}}>Car</Button>
          <Button type="primary" size="small" onClick={() => {getRoute(window.google.maps.TravelMode.WALKING)}}>Walk</Button>
          <Button type="primary" size="small" onClick={() => {getRoute(window.google.maps.TravelMode.BICYCLING)}}>Bike</Button>
          <Button type="primary" size="small" onClick={() => {getRoute(window.google.maps.TravelMode.TRANSIT)}}>Transit</Button>
        </Button.Group>
        <Button type="primary" size="small" href={mapLink}>View in Google Map</Button>
        <br/>
        {(isRouteLoaded) ?
            <Row gutter={16}>
              <Col span={3}>
                <Statistic title="Distance" value={distance}/>
              </Col>
              <Col span={12}>
                <Statistic title="Duration" value={duration}/>
              </Col>
            </Row>
            :
            <Spin tip="Calculating Route..."/>}
        {isLoaded ? (<div>
          <GoogleMap
              mapContainerStyle={mapContainerStyle}
              onLoad={onLoad}
              onUnmount={onUnmount}
              defaultCenter={favorite.geometry.location}
              center={favorite.geometry.location}
              defaultZoom={14.2}
              options={{disableDefaultUI: true, zoomControl: true}}
          >
            {(isRouteLoaded) ? <></> : <Marker position={favorite.geometry.location}/>}
            {(isRouteLoaded) ? <DirectionsRenderer directions={directionResponse}/> : <></>}
          </GoogleMap>
        </div>) : <></>}
      </Modal>}
      </>
    </div>
  );
}

Favorite.propTypes = {};
Favorite.defaultProps = {};
