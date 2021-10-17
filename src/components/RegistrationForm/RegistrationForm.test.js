import React from 'react';
import { RegistrationForm } from './RegistrationForm';
import { render, fireEvent } from "@testing-library/react";

jest.mock("./LoginLink/LoginLink", () => () => "LoginLink");

describe("RegistrationForm", () => {
    const mockNavigateTo = jest.fn();
    const mockLogIn = jest.fn(() => true);
    
    beforeEach(() => {
        //question: why clear not required?
        /*mockNavigateTo.mockClear();
        mockLogIn.mockClear();*/
    });

    it("has form", () => {
        const { getByTestId } = render(<RegistrationForm isLoggedIn={false} navigateTo={mockNavigateTo} logIn={mockLogIn} />);

        const form = getByTestId("RegistrationForm-form");
        expect(form).toBeInTheDocument();
    });

    it("calls logIn on submit if data is set", () => {
        const { getByTestId } = render(<RegistrationForm isLoggedIn={false} navigateTo={mockNavigateTo} logIn={mockLogIn} />);

        const form = getByTestId("RegistrationForm-form");

        fireEvent.submit(form, { target: {
            email: { value: "test@test.com" },
            lastName: { value: "LastName" },
            firstName: { value: "FirstName" },
            password: { value: "123123" }
        } });

        expect(mockLogIn.mock.calls.length).toBe(1);
        expect(mockLogIn.mock.calls[0][0]).toBe("test@test.com");
        expect(mockLogIn.mock.calls[0][1]).toBe("123123");
    });

    it("navigates to Map after successfull registration", () => {
        const { rerender } = render(<RegistrationForm isLoggedIn={false} navigateTo={mockNavigateTo} logIn={mockLogIn} />);

        rerender(<RegistrationForm isLoggedIn={true} navigateTo={mockNavigateTo} logIn={mockLogIn} />);
        expect(mockNavigateTo.mock.calls.length).toBe(1);
        expect(mockNavigateTo.mock.calls[0][0]).toBe("Map");
    });

    it("not navigates anywhere after failed logIn", () => {
        const { rerender } = render(<RegistrationForm isLoggedIn={false} navigateTo={mockNavigateTo} logIn={mockLogIn} />);

        rerender(<RegistrationForm isLoggedIn={false} navigateTo={mockNavigateTo} logIn={mockLogIn} />);
        expect(mockNavigateTo.mock.calls.length).toBe(0);
    });

    it("not calls logIn if email not set", () => {
        const { getByTestId } = render(<RegistrationForm isLoggedIn={false} navigateTo={mockNavigateTo} logIn={mockLogIn} />);

        const form = getByTestId("RegistrationForm-form");

        fireEvent.submit(form, { target: {
            email: { value: "" },
            lastName: { value: "LastName" },
            firstName: { value: "FirstName" },
            password: { value: "123123" }
        } });

        expect(mockLogIn.mock.calls.length).toBe(0);
    });

    it("not calls logIn if lastName not set", () => {
        const { getByTestId } = render(<RegistrationForm isLoggedIn={false} navigateTo={mockNavigateTo} logIn={mockLogIn} />);

        const form = getByTestId("RegistrationForm-form");

        fireEvent.submit(form, { target: {
            email: { value: "test@test.com" },
            lastName: { value: "" },
            firstName: { value: "FirstName" },
            password: { value: "123123" }
        } });

        expect(mockLogIn.mock.calls.length).toBe(0);
    });

    it("not calls logIn if firstName not set", () => {
        const { getByTestId } = render(<RegistrationForm isLoggedIn={false} navigateTo={mockNavigateTo} logIn={mockLogIn} />);

        const form = getByTestId("RegistrationForm-form");

        fireEvent.submit(form, { target: {
            email: { value: "test@test.com" },
            lastName: { value: "LastName" },
            firstName: { value: "" },
            password: { value: "123123" }
        } });

        expect(mockLogIn.mock.calls.length).toBe(0);
    });

    it("not calls logIn if password not set", () => {
        const { getByTestId } = render(<RegistrationForm isLoggedIn={false} navigateTo={mockNavigateTo} logIn={mockLogIn} />);

        const form = getByTestId("RegistrationForm-form");

        fireEvent.submit(form, { target: {
            email: { value: "test@test.com" },
            lastName: { value: "LastName" },
            firstName: { value: "FirstName" },
            password: { value: "" }
        } });

        expect(mockLogIn.mock.calls.length).toBe(0);
    });
});
