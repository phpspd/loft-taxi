import React from "react";
import LoginForm from "./LoginForm";
import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { authRequest } from "../../modules/user";
import { dispatched, createStoreMock } from "../../helpers/createStoreMock";

jest.mock("./components", () => ({
    RegistrationLink: () => "RegistrationLinkComponent"
}));

describe("LoginForm", () => {
    let store;

    beforeEach(() => {
        store = createStoreMock({ user: { isLoggedIn: true } });
    });

    it("renders correct", () => {
        const { getByTestId, getByText } = render(
            <Provider store={store}>
                <LoginForm isLoggedIn={false} />
            </Provider>
        );

        const form = getByTestId("LoginForm-form");
        expect(form).toBeInTheDocument();

        const submitButton = getByTestId("LoginForm-SubmitButton");
        expect(submitButton).toBeInTheDocument();

        const regLink = getByText("RegistrationLinkComponent");
        expect(regLink).toBeInTheDocument();
    });

    it("calls logIn on submit if email and password set", () => {
        const { getByTestId } = render(
            <Provider store={store}>
                <LoginForm isLoggedIn={false} />
            </Provider>
        );

        const form = getByTestId("LoginForm-form");
        const emailInput = getByTestId("email");
        const passwordInput = getByTestId("password");

        fireEvent.change(emailInput, { target: { value: "test@test.com" } });
        fireEvent.change(passwordInput, { target: { value: "123123" } });

        fireEvent.submit(form);

        expect(dispatched.length).toEqual(1);
        expect(dispatched[0]).toEqual({
            type: authRequest.toString(),
            payload: {
                email: "test@test.com",
                password: "123123"
            }
        });
    });

    it("not calls logIn if email not set", () => {
        const { getByTestId } = render(
            <Provider store={store}>
                <LoginForm isLoggedIn={false} />
            </Provider>
        );

        const form = getByTestId("LoginForm-form");
        const emailInput = getByTestId("email");
        const passwordInput = getByTestId("password");

        fireEvent.change(emailInput, { target: { value: "" } });
        fireEvent.change(passwordInput, { target: { value: "123123" } });

        fireEvent.submit(form);
        expect(dispatched.length).toEqual(0);
    });

    it("not calls logIn if password not set", () => {
        const { getByTestId } = render(
            <Provider store={store}>
                <LoginForm isLoggedIn={false} />
            </Provider>
        );

        const form = getByTestId("LoginForm-form");
        const emailInput = getByTestId("email");
        const passwordInput = getByTestId("password");

        fireEvent.change(emailInput, { target: { value: "test@test.com" } });
        fireEvent.change(passwordInput, { target: { value: "" } });

        fireEvent.submit(form);
        expect(dispatched.length).toEqual(0);
    });
});
