import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';
import Navigation from "../Navigation/Navigation";
import { shallow } from "enzyme";

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Header />, div);
    ReactDOM.unmountComponentAtNode(div);
});

it("renders shallow", () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.contains(<Navigation />)).toEqual(true);
});
