import React from "react";

import AsideLogo from "../AsideLogo/AsideLogo";
import RegistrationForm from "../RegistrationForm/RegistrationForm";

import "./Registration.css";

export default class Registration extends React.Component {
    render() {
        return (
            <div className="Registration">
                <AsideLogo />
                <div className="registration-form-container">
                    <RegistrationForm onSignedUp={this.props.onSignedUp} changeTab={this.props.changeTab} />
                </div>
            </div>
        );
    }
}