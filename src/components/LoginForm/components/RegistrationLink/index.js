import React from 'react';

import { Typography } from '@material-ui/core';

import "./index.css";
import { Link } from 'react-router-dom';

export const RegistrationLink = () => {
    return (
        <div className="RegistrationLink">
            <Typography variant="body1">
                Новый пользователь? <Link to="/registration" data-testid="RegistrationLink-anchor">Зарегистрируйтесь</Link>
            </Typography>
        </div>
    );
}

export default RegistrationLink;