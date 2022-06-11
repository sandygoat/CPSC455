import GoogleMapReact from "google-map-react";
import {Autocomplete} from "@react-google-maps/api";
import MapStyles from "./MapStyles";

const center = {
    lat: 49.260969294737095,
    lng: -123.24598937411244,
};


function GMap() {
    return (
        <div style={{ height: '100vh', width: '50%', float: 'right' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_API_KEY }}
                defaultCenter={center}
                center={center}
                defaultZoom={14.2}
                options={{ disableDefaultUI: true, zoomControl: true, styles: MapStyles }}
            />

        </div>
    )
}

export default GMap;

