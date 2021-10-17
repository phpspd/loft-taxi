import React from 'react';
import { Navigation, tabs } from "./Navigation";
import { render, fireEvent } from "@testing-library/react";

describe("Navigation", () => {
    const mockNavigateTo = jest.fn();
    const mockLogOut = jest.fn();

    it("has buttons for all tabs", () => {
        const { getByText } = render(<Navigation navigateTo={mockNavigateTo} logOut={mockLogOut} currentPage="Map" />);
        for (const tabKey of Object.keys(tabs)) {
            expect(getByText(tabs[tabKey].caption)).toBeInTheDocument();
        }
    });

    it("has logout button", () => {
        const { getByText } = render(<Navigation navigateTo={mockNavigateTo} logOut={mockLogOut} currentPage="Map" />);
        expect(getByText("Выйти")).toBeInTheDocument();
    });

    it("calls logOut if clicked logOut button", () => {
        const { getByText } = render(<Navigation navigateTo={mockNavigateTo} logOut={mockLogOut} currentPage="Map" />);
        const logOutButton = getByText("Выйти");
        fireEvent.click(logOutButton);
        expect(mockLogOut.mock.calls.length).toBe(1);
    });

    it("calls navigateTo('Login') if clicked logOut button", () => {
        const { getByText } = render(<Navigation navigateTo={mockNavigateTo} logOut={mockLogOut} currentPage="Map" />);
        const logOutButton = getByText("Выйти");
        fireEvent.click(logOutButton);
        expect(mockNavigateTo.mock.calls.length).toBe(1);
        expect(mockNavigateTo.mock.calls[0][0]).toBe("Login");
    });

    it("calls navigateTo(tabKey) for every tab button", () => {
        const { getByText } = render(<Navigation navigateTo={mockNavigateTo} logOut={mockLogOut} currentPage="Map" />);
        Object.keys(tabs).forEach((tabKey, index) => {
            const tab = tabs[tabKey];
            const button = getByText(tab.caption);
            fireEvent.click(button);
            expect(mockNavigateTo.mock.calls.length).toBe(index + 1);
            expect(mockNavigateTo.mock.calls[index][0]).toBe(tabKey);
        });
    });
});
