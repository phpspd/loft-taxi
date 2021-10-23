import React from "react";
import { Provider } from "react-redux";
import { Router } from "react-router";
import App from "./App";
import { createMemoryHistory } from "history";
import { render } from "@testing-library/react";

jest.mock("./components/Map/Map", () => () => "MapPage");
jest.mock("./components/Header/Header", () => () => "Header Component");

describe("App", () => {
    let history;
    const getStore = (state) => {
        state = state || {
            user: {},
            profile: {}
        };
        
        return {
            getState: () => ({
                user: state.user || {},
                profile: state.profile || {}
            }),
            subscribe: jest.fn(),
            dispatch: jest.fn()
        }
    };
    
    beforeEach(() => {
        history = createMemoryHistory();
    });

    it("renders with Header if logged in", () => {
        const store = getStore({
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
        const store = getStore({
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

        const store = getStore({
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
