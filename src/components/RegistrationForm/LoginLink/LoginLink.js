import React from 'react';

import "./LoginLink.css";

export default function LoginLink(props) {
    return (
        <div className="LoginLink">
            <p>
                Уже зарегистрированы? <a href="/login" onClick={(e) => { e.preventDefault(); props.changeTab("Login"); }}>Войти</a>
            </p>
        </div>
    );
}