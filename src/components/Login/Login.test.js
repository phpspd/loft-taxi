import React from 'react';
import Login from "./Login";
import { Provider } from 'react-redux';
import { createMemoryHistory } from "history";
import { Router } from 'react-router';
import { render } from '@testing-library/react';
import { createStoreMock } from "../../helpers/createStoreMock";

jest.mock("../AsideLogo/AsideLogo", () => () => "AsideLogo");
jest.mock("../LoginForm/LoginForm", () => () => "Login Form");

describe("Login", () => {
    let history;

    beforeEach(() => {
        history = createMemoryHistory();
    });

    it("redirects to /map if logged in", () => {
        expect(history.location.pathname).toEqual("/");

        render(
            <Router history={history}>
                <Provider store={createStoreMock({
                    user: {
                        isLoggedIn: true
                    }
                })}>
                    <Login />
                </Provider>
            </Router>
        );

        expect(history.location.pathname).toEqual("/map");
    });

    it("renders LoginForm if not logged in", () => {
        const store = createStoreMock({
            user: {
                isLoggedIn: false
            }
        });

        const { getByText } = render(
            <Router history={history}>
                <Provider store={store}>
                    <Login />
                </Provider>
            </Router>
        );

        expect(getByText("Login Form")).toBeInTheDocument();
    });
})
