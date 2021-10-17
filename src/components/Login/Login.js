import React from "react";

import AsideLogo from "../AsideLogo/AsideLogo";
import LoginForm from "../LoginForm/LoginForm";

import "./Login.css";

export default class Login extends React.Component {
    render() {
        return (
            <div className="Login">
                <AsideLogo />
                <div className="login-form-container">
                    <LoginForm />
                </div>
            </div>
        );
    }
}
