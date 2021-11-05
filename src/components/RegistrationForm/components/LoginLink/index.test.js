import React from 'react';
import { LoginLink } from ".";
import { render, fireEvent } from "@testing-library/react";
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';

describe("LoginLink", () => {
    let history;

    beforeEach(() => {
        history = createMemoryHistory();
    });

    it("has anchor", () => {
        const { getByTestId } = render(
            <Router history={history}>
                <LoginLink />
            </Router>
        );

        const anchor = getByTestId("LoginLink-anchor");
        expect(anchor).toBeInTheDocument();
    });

    it("navigates to Login if clicked", () => {
        const { getByTestId } = render(
            <Router history={history}>
                <LoginLink />
            </Router>
        );

        const anchor = getByTestId("LoginLink-anchor");
        fireEvent.click(anchor);

        expect(history.location.pathname).toEqual("/login");
    });
});
