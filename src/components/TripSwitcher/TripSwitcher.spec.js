import React from 'react';
import TripSwitcher from './TripSwitcher';
import { render } from "@testing-library/react";
import { Router } from "react-router";
import { createMemoryHistory } from "history";
import { Provider } from 'react-redux';

describe("TripSwitcher", () => {
    let history;
    const getStore = (state) => {
        state = state || {};
        
        return {
            getState: () => ({
                user: state.user || {},
                profile: state.profile || {
                    isCardFilled: false
                },
                route: state.route || {
                    addressList: []
                },
            }),
            subscribe: jest.fn(),
            dispatch: jest.fn()
        }
    };

    beforeEach(() => {
        history = createMemoryHistory();
    });

    it("renders correct", () => {
        const { getByText } = render(
            <Router history={history}>
                <Provider store={getStore()}>
                    <TripSwitcher />
                </Provider>
            </Router>
        );

        const text = getByText("Платежные данные не заполнены");
        expect(text).toBeInTheDocument();
    });

    it("renders orderDone correct", () => {
        const store = getStore({
            profile: {
                isCardFilled: true
            },
            route: {
                addressList: [],
                routePoints: [[1, 1], [2, 2]]
            }
        });
        const { getByText } = render(
            <Router history={history}>
                <Provider store={store}>
                    <TripSwitcher />
                </Provider>
            </Router>
        );

        const text = getByText("Заказ размещен");
        expect(text).toBeInTheDocument();
    });

    it("renders trip form correct", () => {
        const store = getStore({
            profile: {
                isCardFilled: true
            },
            route: {
                addressList: [],
                routePoints: null
            }
        });
        const { getByText } = render(
            <Router history={history}>
                <Provider store={store}>
                    <TripSwitcher />
                </Provider>
            </Router>
        );

        const textFrom = getByText("Откуда");
        expect(textFrom).toBeInTheDocument();

        const textTo = getByText("Куда");
        expect(textTo).toBeInTheDocument();
    });
});
