import React from "react";
import { Navigation, tabs } from "./Navigation";
import { render } from "@testing-library/react";
import { Router } from "react-router";
import { createMemoryHistory } from "history";

describe("Navigation", () => {
    let history;

    beforeAll(() => {
        history = createMemoryHistory();
    });

    it("has buttons for all tabs", () => {
        const { getByText } = render(
            <Router history={history}>
                <Navigation  />
            </Router>
        );
        for (const tabKey of Object.keys(tabs)) {
            expect(getByText(tabs[tabKey].caption)).toBeInTheDocument();
        }
    });

    it("has logout button", () => {
        const { getByText } = render(
            <Router history={history}>
                <Navigation />
            </Router>
        );
        expect(getByText("Выйти")).toBeInTheDocument();
    });
});
