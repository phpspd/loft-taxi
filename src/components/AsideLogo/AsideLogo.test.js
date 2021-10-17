import React from 'react';
import ReactDOM from 'react-dom';
import AsideLogo from './AsideLogo';
import { ReactComponent as Logo } from "../Logo/logo.svg";
import { shallow } from "enzyme";

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<AsideLogo />, div);
    ReactDOM.unmountComponentAtNode(div);
});

it("renders shallow", () => {
    const wrapper = shallow(<AsideLogo />);
    expect(wrapper.contains(<Logo />)).toEqual(true);
});
