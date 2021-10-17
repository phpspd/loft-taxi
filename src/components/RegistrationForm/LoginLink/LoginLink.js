import React from "react";
import PropTypes from "prop-types";

import { Typography } from "@material-ui/core";

import "./LoginLink.css";
import { withNavigation } from "../../../contexts/NavigationContext/NavigationContext";

export const LoginLink = props => {
    return (
        <div className="LoginLink">
            <Typography variant="body1">
                Уже зарегистрированы? <a href="/login" onClick={(e) => { e.preventDefault(); props.navigateTo("Login"); }} data-testid="LoginLink-anchor">Войти</a>
            </Typography>
        </div>
    );
}

LoginLink.propTypes = {
    navigateTo: PropTypes.func.isRequired
};

export default withNavigation(LoginLink);
