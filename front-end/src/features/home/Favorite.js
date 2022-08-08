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
          })})
  }

  function getRoute(mode) {
    setIsRouteLoaded(false);
    getCurrentLocation().then((current) => {
      const origin = `origin=${current.lat},${current.lng}`;
      const destination = `destination=${favorite.result.geometry.location.lat},${favorite.result.geometry.location.lng}`;
      setLink(directionHeader + origin + "&" + destination);
      const directionService = new window.google.maps.DirectionsService();
      return directionService.route({
        origin: current,
        destination: favorite.result.geometry.location,
        travelMode: mode
      })
    }).then((result) => {
      console.log(result);
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

  // useEffect(()=>{
  //   if(favorite != null){
  //     fetch(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?place_id=${favorite.placeId}&key=AIzaSyA1h-RJmy66EAvQmxOOExargkvrdDRLlH4`, {
  //     method: 'GET',

  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Access-Control-Allow-Headers': 'X-Requested-With',
  //       },
  //     }
  //   )
  //   .then(res => {
  //       if (res.ok) {
  //         return res.json();
  //       }
  //       throw new Error(res.status);
  //   })
  //   .then(res=>{
  //     setPlace(res);
  //   })
  //   .catch(err=>{
  //     console.log(err);
  //   })
  // }},[favorite])
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
    libraries: libraries
  })

  const removeFromFavorites = () =>{
    removeFromFavoriteList({
      userId: authorizedUser,
      placeId: favorite.result.place_id,
    })
  }

  const openDetail = () =>{
    
  }

  return !authorizedUser ? (
    <Redirect to="/login" />
  ) : (
    <div className="home-favorite">
      <Card
        
        actions={[
          <Button.Group>
            <Tooltip title={'Remove from favorites'} placement="topLeft">
              <Button data-testid="favButton" type={'default'} onClick={removeFromFavorites}>
                <DeleteOutlined />
              </Button>
            </Tooltip>
            <Button data-testid="detailsButton" type="default" onClick={showModal}>
              <Icon type="profile" /> More details
            </Button>
          </Button.Group>
        ]}
      >
        <Meta title={favorite.result.name} />
      </Card>
      <>
      {isClosed?null:<Modal
        visible={visible}
        title={favorite.result.name}
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
              defaultCenter={favorite.result.geometry.location}
              center={favorite.result.geometry.location}
              defaultZoom={14.2}
              options={{disableDefaultUI: true, zoomControl: true}}
          >
            {(isRouteLoaded) ? <></> : <Marker position={favorite.result.geometry.location}/>}
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
