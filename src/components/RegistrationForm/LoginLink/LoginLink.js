import React from 'react';

import { Typography } from '@material-ui/core';

import "./LoginLink.css";

export default function LoginLink(props) {
    return (
        <div className="LoginLink">
            <Typography variant="body1">
                Уже зарегистрированы? <a href="/login" onClick={(e) => { e.preventDefault(); props.changeTab("Login"); }}>Войти</a>
            </Typography>
        </div>
    );
}