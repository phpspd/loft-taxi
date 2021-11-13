import React from "react";
import Map from "./Map";
import { render } from "@testing-library/react";
import mapboxgl from "mapbox-gl";
import { Provider } from "react-redux";
import { Router } from "react-router";
import { createMemoryHistory } from "history";
import { createStoreMock } from "../../helpers/createStoreMock";

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

    beforeEach(() => {
        history = createMemoryHistory();
    });

    it("has map container", () => {
        const { getByTestId } = render(
            <Router history={history}>
                <Provider store={createStoreMock()}>
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
                <Provider store={createStoreMock()}>
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
                <Provider store={createStoreMock()}>
                    <Map ref={el => container = el} />
                </Provider>
            </Router>
        );
        const mapInstance = container.map;

        unmount();
        expect(mapInstance.container).toBe(undefined);
    });
});
