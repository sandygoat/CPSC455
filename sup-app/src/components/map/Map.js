import {Autocomplete, GoogleMap, InfoWindow, Marker, useJsApiLoader} from "@react-google-maps/api";
import MapStyles from "./MapStyles";
import classes from "./Map.module.css";
import {useCallback, useEffect, useState} from "react";
import {LikeOutlined, LikeFilled} from "@ant-design/icons";
import SearchIcon from '@material-ui/icons/Search';
import NearMe from '@material-ui/icons/NearMe';
import { InputBase } from '@material-ui/core';
import "@reach/combobox/styles.css";

const libraries = ["places"];
const mapContainerStyle = {
    height: '90vh', width: '100%', float: 'right'
};
const center = {
    lat: 49.260969294737095,
    lng: -123.24598937411244,
};

function Map(callback, deps) {
    const [placeCollection, setPlaces] = useState([]);
    const [selected, setSelected] = useState(null);
    const [autocomplete, setAutocomplete] = useState(null);
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
        libraries: libraries
    })

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
        setPlaces((current) => [...current, selected]);
    }


    // load data to show marker
    useEffect(() => {
        // TODO: To be replaced by dispatch function GET_ALL
    }, []);

    const zoomTo = ({ lat, lng }) => {
        map.setCenter({ lat: lat, lng: lng });
        map.setZoom(12);
    };

    const onPlaceChanged = () => {
        const place = autocomplete.getPlace();
        const lat = autocomplete.getPlace().geometry.location.lat();
        const lng = autocomplete.getPlace().geometry.location.lng();
        setSelected(place);
        zoomTo({lat, lng});
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
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon onClick={onPlaceChanged}/>
                        </div>
                        <InputBase placeholder="Search…" classes={{ root: classes.inputRoot, input: classes.inputInput }}/>
                    </div>
                </Autocomplete>
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
                                    className={classes.likeBtn}
                                />
                            ) : (
                                <LikeOutlined
                                    className={classes.likeBtn}
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
        <NearMe
            className={classes.locate}
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
        </NearMe>
    );
}

export default Map;

