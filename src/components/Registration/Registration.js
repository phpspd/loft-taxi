import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { getIsLoggedIn } from "../../modules/user";

import AsideLogo from "../AsideLogo/AsideLogo";
import RegistrationForm from "../RegistrationForm/RegistrationForm";

import "./Registration.css";

export class Registration extends React.Component {
    static propTypes = {
        isLoggedIn: PropTypes.bool.isRequired
    }

    render() {
        if (this.props.isLoggedIn) {
            return <Redirect to="/map" />;
        }
        return (
            <div className="Registration">
                <AsideLogo />
                <div className="registration-form-container">
                    <RegistrationForm />
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
)(Registration);