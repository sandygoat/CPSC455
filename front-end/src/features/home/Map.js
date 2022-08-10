import React from 'react';
import { Autocomplete, GoogleMap, InfoWindow, Marker, useJsApiLoader } from '@react-google-maps/api';
import MapStyles from '../../styles/map.js';
import styles from './Map.less';
import { useCallback, useEffect, useState, } from 'react';
import { useSelector } from "react-redux";
import { LikeOutlined, LikeFilled, SearchOutlined, UserOutlined } from '@ant-design/icons';
import { InputBase } from '@mui/material';
import { Button } from 'antd';
import { useSetPlaces, useAddFavorite } from './redux/hooks';

const libraries = ["places"];
const mapContainerStyle = {
    height: '90vh', width: '100%', float: 'right'
};
const center = {
    lat: 49.260969294737095,
    lng: -123.24598937411244,
};

export default function Map(callback, deps) {
    const [placeCollection, setPlaces] = useState([]);
    const [selected, setSelected] = useState(null);
    const [autocomplete, setAutocomplete] = useState(null);
    const { setPlace } = useSetPlaces();
    const { addFavorite } = useAddFavorite();
    const { authorizedUser } = useSelector(
    state => ({
      authorizedUser: state.home.authorizedUser,
    })
  );
    
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
        libraries: libraries
    })
    const [nearbyPlaces, setNearbyPlaces] = useState([]);

    const [map, setMap] = useState(null)

    // To be replaced by useSelector

    const onLoad = useCallback(function callback(map) {
        map.setZoom(14.2);
        setMap(map)
    }, [])

    const onUnmount = useCallback(function callback(map) {
        setMap(null)
    }, [])
    function disLikeHandler() {
        const id = selected.place_id;
        // TODO: To be replaced by dispatch function DELETE_ONE
        setPlaces(placeCollection.filter(place => place.place_id !== id));
    }
    function likeHandler() {
        // TODO: To be replaced by dispatch function ADD_ONE
        addFavorite({placeId:selected.place_id, userId:authorizedUser});
        setPlaces((current) => [...current, selected]);
    }

    useEffect(() => {
        const escapeHandler = event => {
            if (event.key === "Escape") {
                event.preventDefault();
                setNearbyPlaces([]);
            }
        };
        document.addEventListener('keydown', escapeHandler);

        return () => {
            document.removeEventListener('keydown', escapeHandler);
        };
    }, [])

    // load data to show marker
    useEffect(() => {
        // TODO: To be replaced by dispatch function GET_ALL
    }, []);

    const zoomTo = ({ lat, lng }) => {
        map.setCenter({ lat: lat, lng: lng });
        map.setZoom(15);
    };

    const onPlaceChanged = () => {
        const coords = autocomplete.getPlace().geometry.location.toJSON();
        const request = {
            location: coords,
            radius: 1500,
            types: ["park", "school", "campground"]
        }
        const service = new window.google.maps.places.PlacesService(map);
        service.nearbySearch(request, ((result, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                setNearbyPlaces(result);
                setPlace(result);
            }
        }))
        zoomTo(coords);
    };

    const onLoadSearch = (autoC) => setAutocomplete(autoC);

    const foundInCollection = (placeId) => {
        for (const place of placeCollection) {
            if (place.place_id === placeId) {
                return true;
            }
        }
        return false;
    }

    return isLoaded ? (
        <div>
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                onLoad={onLoad}
                onUnmount={onUnmount}
                defaultCenter={center}
                center={center}
                defaultZoom={14.2}
                options={{ disableDefaultUI: true, zoomControl: true, styles: MapStyles }}
            >
                <Autocomplete onLoad={onLoadSearch} onPlaceChanged={onPlaceChanged}>
                    <div className={styles.search}>
                        <div className={styles.searchIcon}>
                            <SearchOutlined onClick={onPlaceChanged}/>
                        </div>
                        <InputBase placeholder="Search…" classes={{ root: styles.inputRoot, input: styles.inputInput }}/>
                    </div>
                </Autocomplete>
                {nearbyPlaces.map((nearby) => (
                    <Marker
                        key={nearby.place_id}
                        position={{lat: nearby.geometry.location.lat(),
                            lng: nearby.geometry.location.lng()}}
                        onClick={() => {
                            setSelected(nearby);
                        }}/>
                ))}
                {placeCollection.map((turf) => (
                    <Marker
                        key={turf.place_id}
                        position={{lat: turf.geometry.location.lat(),
                            lng: turf.geometry.location.lng()}}
                        onClick={() => {
                            setSelected(turf);
                        }}/>
                ))}
                {selected ? (
                    <InfoWindow
                        position={{
                            lat: selected.geometry.location.lat(),
                            lng: selected.geometry.location.lng(),
                        }}
                        onCloseClick={() => {
                            setSelected(null);
                        }}
                    >
                        <div>
                            {selected.photos ? (
                                <img src={selected.photos[0].getUrl({maxHeight: 250, maxWidth: 400})}
                                     key={selected.place_id} alt={selected.place_id}/>
                            ) : null}
                            <h1>{selected.name}</h1>
                            <p>{selected.formatted_address}</p>
                            {foundInCollection(selected.place_id) ? (
                                <LikeFilled
                                    onClick={disLikeHandler}
                                    className={styles.likeBtn}
                                />
                            ) : (
                                <LikeOutlined
                                    className={styles.likeBtn}
                                    onClick={likeHandler}
                                />
                            )}
                        </div>
                    </InfoWindow>
                ) : null}
                <Locate zoomTo={zoomTo}/>
            </GoogleMap>
        </div>
    ) : <></>
}

function Locate({ zoomTo }) {
    return (
        <UserOutlined
            className={styles.locate}
            onClick={() => {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                            const lat = position.coords.latitude;
                            const lng = position.coords.longitude;
                        zoomTo({lat, lng});
                    },
                    () => null,
                    null
                );
            }}
        >
        </UserOutlined>
    );
}
