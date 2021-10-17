import React from 'react';
import ReactDOM from 'react-dom';
import { App } from "./App";
import { shallow } from "enzyme";
import Navigation from './components/Navigation/Navigation';
import Login from './components/Login/Login';

jest.mock("./components/MapPage/MapPage", () => () => "MapPage");

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
});

it("renders shallow", () => {
    const wrapper = shallow(<App currentPage={"Login"} isLoggedIn={false} />);
    expect(wrapper.contains(<Navigation />)).toEqual(false);
    expect(wrapper.contains(<Login />)).toEqual(true);
});
