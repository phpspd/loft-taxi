import React from 'react';
import Registration from "./Registration";
import { Router } from "react-router";
import { createMemoryHistory } from "history";
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';

jest.mock("../AsideLogo/AsideLogo", () => () => "AsideLogo");
jest.mock("../RegistrationForm/RegistrationForm", () => () => "RegistrationFormComponent");

describe("Registration", () => {
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

    it("renders if logged in", () => {
        const store = getStore({
            user: {
                isLoggedIn: false
            }
        });

        const { getByText } = render(
            <Router history={history}>
                <Provider store={store}>
                    <Registration />
                </Provider>
            </Router>
        );

        expect(getByText("RegistrationFormComponent")).toBeInTheDocument();
    });

    it("redirects to /map if not logged in", () => {
        const store = getStore({
            user: {
                isLoggedIn: true
            }
        });
        
        expect(history.location.pathname).toEqual("/");

        render(
            <Router history={history}>
                <Provider store={store}>
                    <Registration />
                </Provider>
            </Router>
        );

        expect(history.location.pathname).toEqual("/map");
    });
});
