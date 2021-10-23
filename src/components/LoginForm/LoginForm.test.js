import React from "react";
import LoginForm from "./LoginForm";
import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { authRequest } from "../../modules/user";

jest.mock("./RegistrationLink/RegistrationLink", () => () => "RegistrationLink");

describe("LoginForm", () => {
    let store;

    beforeEach(() => {
        store = {
            getState: () => ({ user: { isLoggedIn: true } }),
            subscribe: () => { },
            dispatch: jest.fn()
        }
    });

    it("renders correct", () => {
        const { getByTestId } = render(
            <Provider store={store}>
                <LoginForm isLoggedIn={false} />
            </Provider>
        );

        const form = getByTestId("LoginForm-form");
        expect(form).toBeInTheDocument();

        const submitButton = getByTestId("LoginForm-SubmitButton");
        expect(submitButton).toBeInTheDocument();
    });

    it("calls logIn on submit if email and password set", () => {
        const { getByTestId } = render(
            <Provider store={store}>
                <LoginForm isLoggedIn={false} />
            </Provider>
        );

        const form = getByTestId("LoginForm-form");

        fireEvent.submit(form, { target: { email: { value: "test@test.com" }, password: { value: "123123" } } });

        expect(store.dispatch).toBeCalledWith({ type: authRequest.toString(), payload: { email: "test@test.com", password: "123123" } });
    });

    it("not calls logIn if email not set", () => {
        const { getByTestId } = render(
            <Provider store={store}>
                <LoginForm isLoggedIn={false} />
            </Provider>
        );

        const form = getByTestId("LoginForm-form");

        fireEvent.submit(form, { target: { email: { value: "" }, password: { value: "123123" } } });
        expect(store.dispatch).not.toBeCalled();
    });

    it("not calls logIn if password not set", () => {
        const { getByTestId } = render(
            <Provider store={store}>
                <LoginForm isLoggedIn={false} />
            </Provider>
        );

        const form = getByTestId("LoginForm-form");

        fireEvent.submit(form, { target: { email: { value: "test@test.com" }, password: { value: "" } } });
        expect(store.dispatch).not.toBeCalled();
    });
});
