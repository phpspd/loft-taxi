import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { getIsLoggedIn } from "../../modules/user";

import AsideLogo from "../AsideLogo/AsideLogo";
import LoginForm from "../LoginForm/LoginForm";

import "./Login.css";

export class Login extends React.Component {
    static propTypes = {
        isLoggedIn: PropTypes.bool.isRequired
    }

    render() {
        if (this.props.isLoggedIn) {
            return <Redirect to="/map" />;
        }
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

const mapStateToProps = state => ({
    isLoggedIn: getIsLoggedIn(state)
});

export default connect(
    mapStateToProps
)(Login);
