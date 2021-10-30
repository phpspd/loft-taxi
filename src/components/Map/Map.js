import React from "react";
import { Route } from 'react-router-dom';
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import TripSwitcher from "../TripSwitcher/TripSwitcher";
import { connect } from "react-redux";
import { getRoutePoints } from "../../modules/route";

mapboxgl.accessToken = "pk.eyJ1IjoicXVha2VhcmVuYSIsImEiOiJja3VyYXNtYzQxcTVqMnZwMXJobGYweGQ0In0.D18R6ely07uC5nxFK5d0Vg";

class Map extends React.Component {
    componentDidMount() {
        this.map = new mapboxgl.Map({
            container: this.mapContainer,
            style: "mapbox://styles/mapbox/streets-v11",
            center: [30.3056504, 59.9429126],          
            zoom: 10
        });

        this.map.setStyle("mapbox://styles/mapbox/light-v10");

        this.map.on("load", this.drawRoute);

        //this.drawRoute();
    }

    componentWillUnmount() {
        this.map.remove();
    }

    componentDidUpdate() {
        this.drawRoute();
    }

    drawRoute = () => {
        const points = this.props.routePoints;
        if (!Array.isArray(points) || !points.length) {
            if (this.map.getSource("route")) {
                this.map.removeLayer("route");
                this.map.removeSource("route");
            }
            return;
        }
        this.map.flyTo({
            center: points[0],
            zoom: 15
        });

        if (!this.map.getLayer("route")) {
            this.map.addLayer({
                id: "route",
                type: "line",
                source: {
                    type: "geojson",
                    data: {
                        type: "Feature",
                        properties: {},
                        geometry: {
                            type: "LineString",
                            coordinates: points
                        }
                    }
                },
                layout: {
                    "line-join": "round",
                    "line-cap": "round"
                },
                paint: {
                    "line-color": "#ffc617",
                    "line-width": 8
                }
            });
        } else {
            this.map.getSource("route").setData({
                type: "Feature",
                properties: {},
                geometry: {
                    type: "LineString",
                    coordinates: points
                }
            });
        }

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

        return <>
            <div style={style} ref={el => this.mapContainer = el} data-testid="Map" />
            <Route path="/map" component={TripSwitcher} />
        </>;
    }
}

const mapStateToProps = state => ({
    routePoints: getRoutePoints(state)
});

export default connect(
    mapStateToProps,
    null,
    null,
    {
        forwardRef: true
    }
)(Map);