import React from 'react';
import PropTypes from "prop-types";

import { Typography } from '@material-ui/core';

import "./RegistrationLink.css";
import { withNavigation } from '../../../contexts/NavigationContext/NavigationContext';

export const RegistrationLink = props => {
    return (
        <div className="RegistrationLink">
            <Typography variant="body1">
                Новый пользователь? <a href="/registration" onClick={(e) => { e.preventDefault(); props.navigateTo("Registration"); }} data-testid="RegistrationLink-anchor">Зарегистрируйтесь</a>
            </Typography>
        </div>
    );
}

RegistrationLink.propTypes = {
    navigateTo: PropTypes.func.isRequired
};

export default withNavigation(RegistrationLink);