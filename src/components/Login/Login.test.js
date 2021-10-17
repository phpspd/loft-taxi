import React from 'react';
import ReactDOM from 'react-dom';
import Login from "./Login";
import { shallow } from "enzyme";
import AsideLogo from '../AsideLogo/AsideLogo';
import LoginForm from '../LoginForm/LoginForm';

jest.mock("../AsideLogo/AsideLogo", () => () => "AsideLogo");
jest.mock("../LoginForm/LoginForm", () => () => "LoginForm");

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Login />, div);
    ReactDOM.unmountComponentAtNode(div);
});

it("renders shallow", () => {
    const wrapper = shallow(<Login />);
    expect(wrapper.contains(<AsideLogo />)).toEqual(true);
    expect(wrapper.contains(<LoginForm />)).toEqual(true);
});
