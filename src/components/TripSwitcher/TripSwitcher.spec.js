import React from 'react';
import TripSwitcher from './TripSwitcher';
import { render, fireEvent, act } from "@testing-library/react";
import { Router } from "react-router";
import { createMemoryHistory } from "history";
import { Provider } from 'react-redux';
import { createStoreMock, dispatched } from "../../helpers/createStoreMock";
import { clearRoute, getRouteRequest } from '../../modules/route';

jest.mock("@material-ui/core/Select", () => ({ children, id, onChange }) => (
    <select id={id} data-testid={id} onChange={onChange}>
        {children.map(({ props }, index) => (
            <option key={index} {...props}>{props.value}</option>
        ))}
    </select>
));
/*muiMock.Select = ({ children, ...rest }) => (
    <select {...rest}>
        {children.map(({ value, key }) => (
            <option key={key} value={value}>{value}</option>
        ))}
    </select>
);*/

describe("TripSwitcher", () => {
    let history;

    beforeEach(() => {
        history = createMemoryHistory();
    });

    it("renders correct", () => {
        const store = createStoreMock({
            profile: {
                isCardFilled: false
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

        const text = getByText("Платежные данные не заполнены");
        expect(text).toBeInTheDocument();
    });

    it("renders orderDone correct", () => {
        const store = createStoreMock({
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
        const store = createStoreMock({
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

    it("makes rate active if clicked", () => {
        const store = createStoreMock({
            profile: {
                isCardFilled: true
            },
            route: {
                addressList: [],
                routePoints: null
            }
        });
        const { getByTestId } = render(
            <Router history={history}>
                <Provider store={store}>
                    <TripSwitcher />
                </Provider>
            </Router>
        );

        let rate0 = getByTestId("rate-0");
        expect(rate0.classList).toContain("active");

        let rate1 = getByTestId("rate-1");
        expect(rate1.classList).not.toContain("active");

        fireEvent.click(rate1);

        expect(rate0.classList).not.toContain("active");
        expect(rate1.classList).toContain("active");
    });

    it("provides addressList to selects", () => {
        const store = createStoreMock({
            profile: {
                isCardFilled: true
            },
            route: {
                addressList: ["address1", "address2"],
                routePoints: null
            }
        });

        const { getByTestId } = render(
            <Router history={history}>
                <Provider store={store}>
                    <TripSwitcher />
                </Provider>
            </Router>
        );

        const from = getByTestId("select-from");
        const fromOptions = Array.from(from.childNodes).map(child => child.innerHTML);
        expect(fromOptions).toEqual(store.getState().route.addressList);
        
        const to = getByTestId("select-to");
        const toOptions = Array.from(to.childNodes).map(child => child.innerHTML);
        expect(toOptions).toEqual(store.getState().route.addressList);
    });

    it("filters \"to\" addressList if \"from\" is selected", async () => {
        const store = createStoreMock({
            profile: {
                isCardFilled: true
            },
            route: {
                addressList: ["address1", "address2"],
                routePoints: null
            }
        });

        const { getByTestId } = render(
            <Router history={history}>
                <Provider store={store}>
                    <TripSwitcher />
                </Provider>
            </Router>
        );

        const from = getByTestId("select-from");

        await act(async () => {
            fireEvent.change(from, { target: { value: "address1" } })
        });

        const to = getByTestId("select-to");
        const toOptions = Array.from(to.childNodes).map(child => child.innerHTML);
        expect(toOptions).toEqual(["address2"]);
    });

    it("filters \"from\" addressList if \"to\" is selected", async () => {
        const store = createStoreMock({
            profile: {
                isCardFilled: true
            },
            route: {
                addressList: ["address1", "address2"],
                routePoints: null
            }
        });

        const { getByTestId } = render(
            <Router history={history}>
                <Provider store={store}>
                    <TripSwitcher />
                </Provider>
            </Router>
        );

        const to = getByTestId("select-to");

        await act(async () => {
            fireEvent.change(to, { target: { value: "address2" } })
        });

        const from = getByTestId("select-from");
        const fromOptions = Array.from(from.childNodes).map(child => child.innerHTML);
        expect(fromOptions).toEqual(["address1"]);
    });

    it("dispatches getRouteRequest", async () => {
        const store = createStoreMock({
            profile: {
                isCardFilled: true
            },
            route: {
                addressList: ["address1", "address2"],
                routePoints: null
            }
        });

        const { getByTestId } = render(
            <Router history={history}>
                <Provider store={store}>
                    <TripSwitcher />
                </Provider>
            </Router>
        );

        const to = getByTestId("select-to");
        const from = getByTestId("select-from");

        await act(async () => {
            fireEvent.change(from, { target: { value: "address1" } })
            fireEvent.change(to, { target: { value: "address2" } })
        });

        const submit = getByTestId("TripSwitcher-submit");
        
        await act(async () => {
            fireEvent.click(submit);
        });

        expect(dispatched.length).toEqual(1);
        expect(dispatched[0]).toEqual(getRouteRequest({
            from: "address1",
            to: "address2"
        }));
    });

    it("clears state's addresses if clearRoute btn clicked", async () => {
        const store = createStoreMock({
            profile: {
                isCardFilled: true
            },
            route: {
                addressList: ["address1", "address2"],
                routePoints: [[1, 2], [2, 3]]
            }
        });

        const { getByTestId } = render(
            <Router history={history}>
                <Provider store={store}>
                    <TripSwitcher from="address1" to="address2" />
                </Provider>
            </Router>
        );

        const button = getByTestId("TripSwitcher-clear-btn");

        await act(async () => {
            fireEvent.click(button);
        });

        expect(dispatched.length).toEqual(1);
        expect(dispatched[0]).toEqual(clearRoute());
    });
});
