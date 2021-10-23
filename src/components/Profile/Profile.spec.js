import React from 'react';
import ReactDOM from 'react-dom';
import Profile from "./Profile";
import { Router } from "react-router";
import { createMemoryHistory } from "history";
import { Provider } from 'react-redux';
import { render, fireEvent } from "@testing-library/react";
import * as profileActions from "../../modules/profile/actions";

describe("Profile", () => {
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

    it("renders without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(
            <Router history={history}>
                <Provider store={getStore()}>
                    <Profile />
                </Provider>
            </Router>,
            div
        );
        ReactDOM.unmountComponentAtNode(div);
    });

    it("dispatches clearIsSaved if isSaved", () => {
        const store = getStore({
            profile: {
                isSaved: true
            }
        });
        render(
            <Router history={history}>
                <Provider store={store}>
                    <Profile />
                </Provider>
            </Router>
        );

        expect(store.dispatch).toBeCalled();
    });

    it("changes cardHolder and set upper-cased value", () => {
        const store = getStore();
        const { getByTestId } = render(
            <Router history={history}>
                <Provider store={store}>
                    <Profile />
                </Provider>
            </Router>
        );

        const input = getByTestId("cardHolder");
        fireEvent.change(input, { target: { value: "test" } });

        expect(input.value).toEqual("TEST");
    });

    it("changes cardNumber", () => {
        const store = getStore();
        const { getByTestId } = render(
            <Router history={history}>
                <Provider store={store}>
                    <Profile />
                </Provider>
            </Router>
        );

        const input = getByTestId("cardNumber");
        fireEvent.change(input, { target: { value: "123" } });

        expect(input.value).toEqual("123");
    });

    it("formats cardNumber", () => {
        const store = getStore();
        const { getByTestId } = render(
            <Router history={history}>
                <Provider store={store}>
                    <Profile />
                </Provider>
            </Router>
        );

        const input = getByTestId("cardNumber");
        fireEvent.change(input, { target: { value: "1234567890123456" } });

        expect(input.value).toEqual("1234 5678 9012 3456");
    });

    it("puts cardNumber to placeCardNumber", () => {
        const store = getStore();
        const { getByTestId } = render(
            <Router history={history}>
                <Provider store={store}>
                    <Profile />
                </Provider>
            </Router>
        );

        const input = getByTestId("cardNumber");
        const place = getByTestId("placeCardNumber");
        fireEvent.change(input, { target: { value: "1234567890123456" } });

        expect(place.innerHTML).toEqual("1234 5678 9012 3456");
    });

    it("puts 16 zeros to the placeCardNumber if cardNumber is empty", () => {
        const store = getStore();
        const { getByTestId } = render(
            <Router history={history}>
                <Provider store={store}>
                    <Profile />
                </Provider>
            </Router>
        );

        const input = getByTestId("cardNumber");
        const place = getByTestId("placeCardNumber");
        fireEvent.change(input, { target: { value: "" } });

        expect(place.innerHTML).toEqual("0000 0000 0000 0000");
    });

    it("not modify cardNumber if value has non-digit symbol", () => {
        const store = getStore();
        const { getByTestId } = render(
            <Router history={history}>
                <Provider store={store}>
                    <Profile />
                </Provider>
            </Router>
        );

        const input = getByTestId("cardNumber");
        fireEvent.change(input, { target: { value: "test" } });

        expect(input.value).toEqual("");
        
        fireEvent.change(input, { target: { value: "123456" } });
        fireEvent.change(input, { target: { value: "123456t" } });

        expect(input.value).toEqual("1234 56");
    });

    it("puts only 19 symbols to cardNumber if it over 19 symbols length", () => {
        const store = getStore();
        const { getByTestId } = render(
            <Router history={history}>
                <Provider store={store}>
                    <Profile />
                </Provider>
            </Router>
        );

        const input = getByTestId("cardNumber");
        fireEvent.change(input, { target: { value: "12345678901234567" } });

        expect(input.value).toEqual("1234 5678 9012 3456");
    });

    it("cuts non-digit or \"/\" symbol and extra-length symbols in expiryDate", () => {
        const store = getStore();
        const { getByTestId } = render(
            <Router history={history}>
                <Provider store={store}>
                    <Profile />
                </Provider>
            </Router>
        );

        const input = getByTestId("expiryDate");
        fireEvent.change(input, { target: { value: "test" } });

        expect(input.value).toEqual("");
        
        fireEvent.change(input, { target: { value: "56/3456t" } });

        expect(input.value).toEqual("56/34");
        
        fireEvent.change(input, { target: { value: "1f2d56t" } });

        expect(input.value).toEqual("12/56");
    });

    it("cuts non-digit symbols and extra-length symbols in cvc", () => {
        const store = getStore();
        const { getByTestId } = render(
            <Router history={history}>
                <Provider store={store}>
                    <Profile />
                </Provider>
            </Router>
        );

        const input = getByTestId("cvc");
        fireEvent.change(input, { target: { value: "test" } });

        expect(input.value).toEqual("");
        
        fireEvent.change(input, { target: { value: "56/3456t" } });

        expect(input.value).toEqual("563");
        
        fireEvent.change(input, { target: { value: "1f2d56t" } });

        expect(input.value).toEqual("125");
    });

    it("calls save action on form submit", () => {
        const save = jest.spyOn(profileActions, "saveRequest").mockImplementation(jest.fn());
        const store = getStore({
            user: {
                isLoggedId: true,
                token: "token123"
            }
        });
        const { getByTestId } = render(
            <Router history={history}>
                <Provider store={store}>
                    <Profile />
                </Provider>
            </Router>
        );

        const form = getByTestId("Profile-form");

        fireEvent.change(getByTestId("cardHolder"), { target: { value: "CARD HOLDER" } });
        fireEvent.change(getByTestId("cardNumber"), { target: { value: "1234 5678" } });
        fireEvent.change(getByTestId("expiryDate"), { target: { value: "02/12" } });
        fireEvent.change(getByTestId("cvc"), { target: { value: "123" } });

        fireEvent.submit(form);

        expect(save).toBeCalledWith({
            cardHolder: "CARD HOLDER",
            cardNumber: "1234 5678",
            expiryDate: (new Date(2012, 1)).toISOString(),
            cvc: "123",
            token: "token123"
        });
    });

    it("converts correctly expiryDate from state to view", () => {
        const store = getStore({
            profile: {
                expiryDate: (new Date(2013, 2)).toISOString()
            }
        });
        const { getByTestId } = render(
            <Router history={history}>
                <Provider store={store}>
                    <Profile />
                </Provider>
            </Router>
        );

        expect(getByTestId("expiryDate").value).toEqual("03/13")
    });
})
