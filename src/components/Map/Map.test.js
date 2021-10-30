import React from "react";
import Map from "./Map";
import { render } from "@testing-library/react";
import mapboxgl from "mapbox-gl";
import { Provider } from "react-redux";
import { Router } from "react-router";
import { createMemoryHistory } from "history";

jest.mock("mapbox-gl", () => ({
    Map: class {
        constructor({ container }) {
            this._container = container;
        }

        setStyle() {

        }

        remove() {
            this._container = undefined;
        }

        get container() {
            return this._container;
        }

        render() {
            return "mapboxgl.Map";
        }

        on() {
            
        }
    }
}));

describe("Map", () => {
    let history;
    const getStore = (state) => {
        state = state || {
            user: {},
            profile: {},
            route: {}
        };
        
        return {
            getState: () => ({
                user: state.user || {},
                profile: state.profile || {},
                route: state.route || {},
            }),
            subscribe: jest.fn(),
            dispatch: jest.fn()
        }
    };

    beforeEach(() => {
        history = createMemoryHistory();
    });

    it("has map container", () => {
        const { getByTestId } = render(
            <Router history={history}>
                <Provider store={getStore()}>
                    <Map />
                </Provider>
            </Router>
        );;

        const mapContainer = getByTestId("Map");
        expect(mapContainer).toBeInTheDocument();
    });

    it("creates mapboxgl.Map instance and pass container", () => {
        let container;
        const { getByTestId } = render(
            <Router history={history}>
                <Provider store={getStore()}>
                    <Map ref={el => container = el} />
                </Provider>
            </Router>
        );
        const mapInstance = container.map;

        const mapContainer = getByTestId("Map");
        expect(mapInstance).toBeInstanceOf(mapboxgl.Map);
        expect(mapInstance.container).toBe(mapContainer);
    });

    it("calls remove mapboxgl.Map method if unmount", () => {
        let container;
        const { unmount } = render(
            <Router history={history}>
                <Provider store={getStore()}>
                    <Map ref={el => container = el} />
                </Provider>
            </Router>
        );
        const mapInstance = container.map;

        unmount();
        expect(mapInstance.container).toBe(undefined);
    });
});
