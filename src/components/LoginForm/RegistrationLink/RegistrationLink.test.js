import React from 'react';
import { RegistrationLink } from "./RegistrationLink";
import { render, fireEvent } from "@testing-library/react";

describe("RegistrationLink", () => {
    const mockNavigateTo = jest.fn();

    it("has anchor", () => {
        const { getByTestId } = render(<RegistrationLink navigateTo={mockNavigateTo} />);

        const anchor = getByTestId("RegistrationLink-anchor");
        expect(anchor).toBeInTheDocument();
    });

    it("navigates to Registration if clicked", () => {
        const { getByTestId } = render(<RegistrationLink navigateTo={mockNavigateTo} />);

        const anchor = getByTestId("RegistrationLink-anchor");
        fireEvent.click(anchor);

        expect(mockNavigateTo.mock.calls.length).toBe(1);
        expect(mockNavigateTo.mock.calls[0][0]).toBe("Registration");
    });
});
