import React from 'react';
import RegistrationForm from './RegistrationForm';
import { render, fireEvent } from "@testing-library/react";
import { Provider } from 'react-redux';
import { registrationRequest } from '../../modules/user';
import { dispatched, createStoreMock } from "../../helpers/createStoreMock";

jest.mock("./components", () => ({
    LoginLink: () => "LoginLinkComponent"
}));

describe("RegistrationForm", () => {
    let store;

    beforeEach(() => {
        store = createStoreMock({ user: { isLoggedIn: true } });
    });

    it("renders correct", () => {
        const { getByTestId, getByText } = render(
            <Provider store={store}>
                <RegistrationForm />
            </Provider>
        );

        const form = getByTestId("RegistrationForm-form");
        expect(form).toBeInTheDocument();
        
        const submitButton = getByTestId("RegistrationForm-SubmitButton");
        expect(submitButton).toBeInTheDocument();
        
        const loginLink = getByText("LoginLinkComponent");
        expect(loginLink).toBeInTheDocument();
    });

    it("dispatches registrationRequest on submit if data is set", () => {
        const { getByTestId } = render(
            <Provider store={store}>
                <RegistrationForm />
            </Provider>
        );

        const form = getByTestId("RegistrationForm-form");
        const emailInput = getByTestId("email");
        const passwordInput = getByTestId("password");
        const lastNameInput = getByTestId("lastName");
        const firstNameInput = getByTestId("firstName");

        fireEvent.change(emailInput, { target: { value: "test@test.com" } });
        fireEvent.change(passwordInput, { target: { value: "123123" } });
        fireEvent.change(lastNameInput, { target: { value: "LastName" } });
        fireEvent.change(firstNameInput, { target: { value: "FirstName" } });

        fireEvent.submit(form);

        expect(dispatched.length).toEqual(1);
        expect(dispatched[0]).toEqual({
            type: registrationRequest.toString(),
            payload: {
                email: "test@test.com",
                password: "123123",
                surname: "LastName",
                name: "FirstName"
            }
        });
    });

    it("not calls logIn if email not set", () => {
        const { getByTestId } = render(
            <Provider store={store}>
                <RegistrationForm />
            </Provider>
        );

        const form = getByTestId("RegistrationForm-form");

        fireEvent.submit(form, { target: {
            email: { value: "" },
            lastName: { value: "LastName" },
            firstName: { value: "FirstName" },
            password: { value: "123123" }
        } });

        expect(dispatched.length).toEqual(0);
    });

    it("not calls logIn if lastName not set", () => {
        const { getByTestId } = render(
            <Provider store={store}>
                <RegistrationForm />
            </Provider>
        );

        const form = getByTestId("RegistrationForm-form");

        fireEvent.submit(form, { target: {
            email: { value: "test@test.com" },
            lastName: { value: "" },
            firstName: { value: "FirstName" },
            password: { value: "123123" }
        } });

        expect(dispatched.length).toEqual(0);
    });

    it("not calls logIn if firstName not set", () => {
        const { getByTestId } = render(
            <Provider store={store}>
                <RegistrationForm />
            </Provider>
        );

        const form = getByTestId("RegistrationForm-form");

        fireEvent.submit(form, { target: {
            email: { value: "test@test.com" },
            lastName: { value: "LastName" },
            firstName: { value: "" },
            password: { value: "123123" }
        } });

        expect(dispatched.length).toEqual(0);
    });

    it("not calls logIn if password not set", () => {
        const { getByTestId } = render(
            <Provider store={store}>
                <RegistrationForm />
            </Provider>
        );

        const form = getByTestId("RegistrationForm-form");

        fireEvent.submit(form, { target: {
            email: { value: "test@test.com" },
            lastName: { value: "LastName" },
            firstName: { value: "FirstName" },
            password: { value: "" }
        } });

        expect(dispatched.length).toEqual(0);
    });
});
