import React from 'react';
import { LoginForm } from './LoginForm';
import { render, fireEvent } from "@testing-library/react";

jest.mock("./RegistrationLink/RegistrationLink", () => () => "RegistrationLink");

describe("LoginForm", () => {
    const mockNavigateTo = jest.fn();
    const mockLogIn = jest.fn(() => true);
    
    beforeEach(() => {
        //question: why clear not required?
        /*mockNavigateTo.mockClear();
        mockLogIn.mockClear();*/
    });

    it("has form", () => {
        const { getByTestId } = render(<LoginForm isLoggedIn={false} navigateTo={mockNavigateTo} logIn={mockLogIn} />);

        const form = getByTestId("LoginForm-form");
        expect(form).toBeInTheDocument();
    });

    it("calls logIn on submit if email and password set", () => {
        const { getByTestId } = render(<LoginForm isLoggedIn={false} navigateTo={mockNavigateTo} logIn={mockLogIn} />);

        const form = getByTestId("LoginForm-form");

        fireEvent.submit(form, { target: { email: { value: "test@test.com" }, password: { value: "123123" } } });

        expect(mockLogIn.mock.calls.length).toBe(1);
        expect(mockLogIn.mock.calls[0][0]).toBe("test@test.com");
        expect(mockLogIn.mock.calls[0][1]).toBe("123123");
    });

    it("navigates to Map after successfull logIn", () => {
        const { rerender } = render(<LoginForm isLoggedIn={false} navigateTo={mockNavigateTo} logIn={mockLogIn} />);

        rerender(<LoginForm isLoggedIn={true} navigateTo={mockNavigateTo} logIn={mockLogIn} />);
        expect(mockNavigateTo.mock.calls.length).toBe(1);
        expect(mockNavigateTo.mock.calls[0][0]).toBe("Map");
    });

    it("not navigates anywhere after failed logIn", () => {
        const { rerender } = render(<LoginForm isLoggedIn={false} navigateTo={mockNavigateTo} logIn={mockLogIn} />);

        rerender(<LoginForm isLoggedIn={false} navigateTo={mockNavigateTo} logIn={mockLogIn} />);
        expect(mockNavigateTo.mock.calls.length).toBe(0);
    });

    it("not calls logIn if email not set", () => {
        const { getByTestId } = render(<LoginForm isLoggedIn={false} navigateTo={mockNavigateTo} logIn={mockLogIn} />);

        const form = getByTestId("LoginForm-form");

        fireEvent.submit(form, { target: { email: { value: "" }, password: { value: "123123" } } });
        expect(mockLogIn.mock.calls.length).toBe(0);
    });

    it("not calls logIn if password not set", () => {
        const { getByTestId } = render(<LoginForm isLoggedIn={false} navigateTo={mockNavigateTo} logIn={mockLogIn} />);

        const form = getByTestId("LoginForm-form");

        fireEvent.submit(form, { target: { email: { value: "test@test.com" }, password: { value: "" } } });
        expect(mockLogIn.mock.calls.length).toBe(0);
    });
});
