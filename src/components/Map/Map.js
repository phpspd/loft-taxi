import React from "react";

import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = "pk.eyJ1IjoicXVha2VhcmVuYSIsImEiOiJja3VyYXNtYzQxcTVqMnZwMXJobGYweGQ0In0.D18R6ely07uC5nxFK5d0Vg";

export default class Map extends React.Component {
    componentDidMount() {
        this.map = new mapboxgl.Map({
            container: this.mapContainer,
            style: "mapbox://styles/mapbox/streets-v11",
            center: [30.3056504, 59.9429126],          
            zoom: 10
        });

        this.map.setStyle("mapbox://styles/mapbox/light-v10");
    }

    componentWillUnmount() {
        this.map.remove();
    }

    render() {
        const style = {
            top: "73px",
            left: 0,
            right: 0,
            width: "100%",
            bottom: 0,
            position: "absolute"
        };

        return <div style={style} ref={el => this.mapContainer = el} data-testid="Map" />;
    }
}
