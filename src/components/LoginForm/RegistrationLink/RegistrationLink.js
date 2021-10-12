import { Typography } from '@material-ui/core';
import React from 'react';

import "./RegistrationLink.css";

export default function RegistrationLink(props) {
    return (
        <div className="RegistrationLink">
            <Typography variant="body1">
                Новый пользователь? <a href="/registration" onClick={(e) => { e.preventDefault(); props.changeTab("Registration"); }}>Зарегистрируйтесь</a>
            </Typography>
        </div>
    );
}