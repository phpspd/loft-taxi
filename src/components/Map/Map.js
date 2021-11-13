import React from "react";
import { Route } from 'react-router-dom';
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import TripSwitcher from "../TripSwitcher/TripSwitcher";
import { connect } from "react-redux";
import { getRoutePoints } from "../../modules/route";
import { drawRoute, clearRoute } from "./helpers";

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

        if (this.props.routePoints && this.props.routePoints.length && this.map) {
            this.map.on("load", () => this.drawRoute(this.props.routePoints));
        }
    }

    componentWillUnmount() {
        if (this.map) {
            this.map.remove();
        }
    }

    componentDidUpdate(prevProps) {
        const { routePoints } = this.props;
        const { routePoints: prevRoutePoints } = prevProps;
        if (prevRoutePoints !== routePoints) {
            this.clearMap();
            this.drawRoute(routePoints);
        }
    }

    clearMap() {
        if (this.map) {
            clearRoute(this.map);
        }
    }

    drawRoute = (routePoints) => {
        if (this.map) {
            drawRoute(this.map, routePoints);
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