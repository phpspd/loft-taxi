import React from "react";
import Map from "./Map";
import { render } from "@testing-library/react";
import mapboxgl from "mapbox-gl";

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
    }
}));

describe("Map", () => {
    it("has map container", () => {
        const { getByTestId } = render(<Map />);

        const mapContainer = getByTestId("Map");
        expect(mapContainer).toBeInTheDocument();
    });

    it("creates mapboxgl.Map instance and pass container", () => {
        let container;
        const { getByTestId } = render(<Map ref={el => container = el} />);
        const mapInstance = container.map;

        const mapContainer = getByTestId("Map");
        expect(mapInstance).toBeInstanceOf(mapboxgl.Map);
        expect(mapInstance.container).toBe(mapContainer);
    });

    it("calls remove mapboxgl.Map method if unmount", () => {
        let container;
        const { unmount } = render(<Map ref={el => container = el} />);
        const mapInstance = container.map;

        unmount();
        expect(mapInstance.container).toBe(undefined);
    });
});
