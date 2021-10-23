import React from "react";

import { Typography } from "@material-ui/core";

import "./LoginLink.css";
import { Link } from "react-router-dom";

export const LoginLink = props => {
    return (
        <div className="LoginLink">
            <Typography variant="body1">
                Уже зарегистрированы? <Link to="/login" data-testid="LoginLink-anchor">Войти</Link>
            </Typography>
        </div>
    );
}

export default LoginLink;
