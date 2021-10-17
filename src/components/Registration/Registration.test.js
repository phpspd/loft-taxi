import React from 'react';
import ReactDOM from 'react-dom';
import Registration from "./Registration";
import { shallow } from "enzyme";
import AsideLogo from '../AsideLogo/AsideLogo';
import RegistrationForm from '../RegistrationForm/RegistrationForm';

jest.mock("../AsideLogo/AsideLogo", () => () => "AsideLogo");
jest.mock("../RegistrationForm/RegistrationForm", () => () => "RegistrationForm");

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Registration />, div);
    ReactDOM.unmountComponentAtNode(div);
});

it("renders shallow", () => {
    const wrapper = shallow(<Registration />);
    expect(wrapper.contains(<AsideLogo />)).toEqual(true);
    expect(wrapper.contains(<RegistrationForm />)).toEqual(true);
});
