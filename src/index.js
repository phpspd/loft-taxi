import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { theme } from "loft-taxi-mui-theme";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { BrowserRouter } from "react-router-dom";

import { Provider } from "react-redux";
import createStore from "./store";

const store = createStore();

const fixTheme = theme => {
    try {
        theme.overrides.MuiFormHelperText.root.bottom = "-1.4em";
        theme.overrides.MuiButton.containedPrimary.backgroundColor = "#fdbf5a";
        theme.overrides.MuiButton.containedPrimary["&:hover"] = {
            backgroundColor: "#ffa842"
        };
        theme.palette.primary.main = "#fdbf5a";
    } catch(err) {}
    return theme;
}

ReactDOM.render(
    //<React.StrictMode>
        <Provider store={store}>
            <MuiThemeProvider theme={fixTheme(theme)}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </MuiThemeProvider>
        </Provider>
    //</React.StrictMode>
    ,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
