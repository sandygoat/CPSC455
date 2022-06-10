import GoogleMapReact from "google-map-react";
import {Autocomplete} from "@react-google-maps/api";
import MapStyles from "./MapStyles";

const center = {
    lat: 49.2827,
    lng: -123.1207,
};

const mapContainerStyle = {
    width: "100vw",
    height: "90vh",
    top: "10vh",
};


function GMap() {
    return (
        <div>
            <GoogleMapReact
                bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_API_KEY }}
                defaultCenter={center}
                center={center}
                mapContainerStyle={mapContainerStyle}
                defaultZoom={14}
                options={{ disableDefaultUI: true, zoomControl: true, styles: MapStyles }}
            />
        </div>
    )
}

export default GMap;

