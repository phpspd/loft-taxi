import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { theme } from "loft-taxi-mui-theme";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { AuthProvider } from './contexts/AuthContext/AuthContext';
import { NavigationProvider } from './contexts/NavigationContext/NavigationContext';

ReactDOM.render(
    <React.StrictMode>
        <MuiThemeProvider theme={theme}>
            <AuthProvider>
                <NavigationProvider>
                    <App />
                </NavigationProvider>
            </AuthProvider>
        </MuiThemeProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
