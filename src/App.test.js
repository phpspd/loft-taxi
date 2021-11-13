import React from "react";
import { Provider } from "react-redux";
import { Router } from "react-router";
import App from "./App";
import { createMemoryHistory } from "history";
import { render } from "@testing-library/react";
import { createStoreMock } from "./helpers/createStoreMock";

jest.mock("./components/Map/Map", () => () => "MapPage");
jest.mock("./components/Header/Header", () => () => "Header Component");

describe("App", () => {
    let history;
    
    beforeEach(() => {
        history = createMemoryHistory();
    });

    it("renders with Header if logged in", () => {
        const store = createStoreMock({
            user: {
                isLoggedIn: true
            }
        });
        const { getByText } = render(
            <Provider store={store}>
                <Router history={history}>
                    <App />
                </Router>
            </Provider>
        );

        expect(getByText("Header Component")).toBeInTheDocument();
    });

    it("renders without Header if not logged in", () => {
        const store = createStoreMock({
            user: {
                isLoggedIn: false
            }
        });
        
        const { queryByText } = render(
            <Provider store={store}>
                <Router history={history}>
                    <App />
                </Router>
            </Provider>
        );

        expect(queryByText("Header Component")).not.toBeInTheDocument();
    });

    it("sets title on mounting", () => {
        const spy = jest.spyOn(document, "title", "set");

        const store = createStoreMock({
            user: {
                isLoggedIn: false
            }
        });

        render(
            <Provider store={store}>
                <Router history={history}>
                    <App />
                </Router>
            </Provider>
        );
        
        expect(spy).toBeCalledWith("🚖 Loft-Taxi");

        spy.mockRestore();
    });
});
