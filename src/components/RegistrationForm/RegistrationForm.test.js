import React from 'react';
import RegistrationForm from './RegistrationForm';
import { render, fireEvent } from "@testing-library/react";
import { Provider } from 'react-redux';
import { registrationRequest } from '../../modules/user';

jest.mock("./LoginLink/LoginLink", () => () => "LoginLink");

describe("RegistrationForm", () => {
    let store;

    beforeEach(() => {
        store = {
            getState: () => ({ user: { isLoggedIn: true } }),
            subscribe: () => {},
            dispatch: jest.fn()
        }
    });

    it("renders correct", () => {
        const { getByTestId } = render(
            <Provider store={store}>
                <RegistrationForm />
            </Provider>
        );

        const form = getByTestId("RegistrationForm-form");
        expect(form).toBeInTheDocument();
        
        const submitButton = getByTestId("RegistrationForm-SubmitButton");
        expect(submitButton).toBeInTheDocument();
    });

    it("dispatches registrationRequest on submit if data is set", () => {
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
            password: { value: "123123" }
        } });

        expect(store.dispatch).toBeCalledWith({
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

        expect(store.dispatch).not.toBeCalled();
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

        expect(store.dispatch).not.toBeCalled();
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

        expect(store.dispatch).not.toBeCalled();
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

        expect(store.dispatch).not.toBeCalled();
    });
});
