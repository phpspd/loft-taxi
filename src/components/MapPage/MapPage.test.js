import React from "react";
import MapPage from "./MapPage";
import Map from "../Map/Map";
import { shallow } from "enzyme";

jest.mock("../Map/Map", () => () => "Map");

describe("MapPage", () => {
    it("renders shallow", () => {
        const wrapper = shallow(<MapPage />);
        expect(wrapper.contains(<Map />)).toEqual(true);
    });
});
