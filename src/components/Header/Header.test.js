import React from "react";
import ReactDOM from "react-dom";
import Header from "./Header";
import { Provider } from "react-redux";
import { Router } from "react-router";
import { createMemoryHistory } from "history";

it("renders without crashing", () => {
    const store = {
        getState: () => {},
        subscribe: () => {},
        dispatch: () => {}
    };
    const history = createMemoryHistory();
    
    const div = document.createElement("div");
    ReactDOM.render(
        <Provider store={store}>
            <Router history={history}>
                <Header />
            </Router>
        </Provider>, div);
    ReactDOM.unmountComponentAtNode(div);
});
