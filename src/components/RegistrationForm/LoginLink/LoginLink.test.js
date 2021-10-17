import React from 'react';
import { LoginLink } from "./LoginLink";
import { render, fireEvent } from "@testing-library/react";

describe("LoginLink", () => {
    const mockNavigateTo = jest.fn();

    it("has anchor", () => {
        const { getByTestId } = render(<LoginLink navigateTo={mockNavigateTo} />);

        const anchor = getByTestId("LoginLink-anchor");
        expect(anchor).toBeInTheDocument();
    });

    it("navigates to Login if clicked", () => {
        const { getByTestId } = render(<LoginLink navigateTo={mockNavigateTo} />);

        const anchor = getByTestId("LoginLink-anchor");
        fireEvent.click(anchor);

        expect(mockNavigateTo.mock.calls.length).toBe(1);
        expect(mockNavigateTo.mock.calls[0][0]).toBe("Login");
    });
});
