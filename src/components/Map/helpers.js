export const drawRoute = (map, coordinates) => {
    if (!Array.isArray(coordinates) || !coordinates.length) {
        return;
    }
    map.flyTo({
        center: coordinates[0],
        zoom: 15
    });
    map.addSource("circle-start", {
        type: "geojson",
        data: {
            type: "Feature",
            geometry: {
                type: "Point",
                coordinates: coordinates[0]
            }
        }
    });
    map.addSource("circle-end", {
        type: "geojson",
        data: {
            type: "Feature",
            geometry: {
                type: "Point",
                coordinates: coordinates[coordinates.length - 1]
            }
        }
    });
    map.addLayer({
        id: "start1",
        type: "circle",
        source: "circle-start",
        paint: {
            "circle-color": "#fdbf5a",
            "circle-radius": 9,
            "circle-pitch-scale": "viewport"
        }
    });
    map.addLayer({
        id: "start2",
        type: "circle",
        source: "circle-start",
        paint: {
            "circle-color": "#fdbf5a",
            "circle-radius": 18,
            "circle-opacity": 0.4
        }
    });
    map.addLayer({
        id: "start3",
        type: "circle",
        source: "circle-start",
        paint: {
            "circle-color": "#fdbf5a",
            "circle-radius": 27,
            "circle-opacity": 0.2
        }
    });
    map.addLayer({
        id: "end1",
        type: "circle",
        source: "circle-end",
        paint: {
            "circle-color": "#91c523",
            "circle-radius": 9,
            "circle-pitch-scale": "viewport"
        }
    });
    map.addLayer({
        id: "end2",
        type: "circle",
        source: "circle-end",
        paint: {
            "circle-color": "#91c523",
            "circle-radius": 18,
            "circle-opacity": 0.4
        }
    });
    map.addLayer({
        id: "end3",
        type: "circle",
        source: "circle-end",
        paint: {
            "circle-color": "#91c523",
            "circle-radius": 27,
            "circle-opacity": 0.2
        }
    });
    map.addLayer({
        id: "route",
        type: "line",
        source: {
            type: "geojson",
            lineMetrics: true,
            data: {
                type: "Feature",
                properties: {},
                geometry: {
                    type: "LineString",
                    coordinates
                }
            }
        },
        layout: {
            "line-join": "round",
            "line-cap": "round"
        },
        paint: {
            "line-color": "#ffc617",
            "line-width": 4,
            "line-gradient": [
                "interpolate",
                ["linear"],
                ["line-progress"],
                0,
                "#fdbf5a",
                1,
                "#91c523"
            ]
        }
    });
};

export const clearRoute = map => {
    if (!map.getLayer("start1")) {
        return;
    }
    map.removeLayer("start1");
    map.removeLayer("start2");
    map.removeLayer("start3");
    map.removeLayer("end1");
    map.removeLayer("end2");
    map.removeLayer("end3");
    map.removeLayer("route");
    map.removeSource("circle-start");
    map.removeSource("circle-end");
    map.removeSource("route");
};
