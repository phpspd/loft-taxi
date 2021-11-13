import React from 'react';
import PrivateRoute from "./PrivateRoute";
import { Router } from "react-router";
import { createMemoryHistory } from "history";
import { Provider } from 'react-redux';
import { render } from "@testing-library/react";
import { createStoreMock } from "../../helpers/createStoreMock";

describe("Profile", () => {
    let history;

    beforeEach(() => {
        history = createMemoryHistory();
    });

    it("redirects to /registration if not logged in", () => {
        const store = createStoreMock({
            user: {
                isLoggedIn: false
            }
        });

        expect(history.location.pathname).toEqual("/");

        const { queryByText } = render(
            <Router history={history}>
                <Provider store={store}>
                    <PrivateRoute render={() => (<p>Some component</p>)} />
                </Provider>
            </Router>
        );

        expect(history.location.pathname).toEqual("/registration");
        expect(queryByText("Some component")).not.toBeInTheDocument();
    });

    it("not redirects if logged in", () => {
        const store = createStoreMock({
            user: {
                isLoggedIn: true
            }
        });

        expect(history.location.pathname).toEqual("/");

        render(
            <Router history={history}>
                <Provider store={store}>
                    <PrivateRoute component={() => (<p>Some component</p>)} />
                </Provider>
            </Router>
        );

        expect(history.location.pathname).toEqual("/");
    });

    it("renders component if logged in", () => {
        const store = createStoreMock({
            user: {
                isLoggedIn: true
            }
        });

        expect(history.location.pathname).toEqual("/");

        const { queryByText } = render(
            <Router history={history}>
                <Provider store={store}>
                    <PrivateRoute component={() => (<p>Some component</p>)} />
                </Provider>
            </Router>
        );

        expect(history.location.pathname).toEqual("/");
        expect(queryByText("Some component")).toBeInTheDocument();
    });
});
