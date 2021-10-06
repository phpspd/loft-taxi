import React from 'react';

import "./RegistrationLink.css";

export default function RegistrationLink(props) {
    return (
        <div className="RegistrationLink">
            <p>
                Новый пользователь? <a href="/registration" onClick={(e) => { e.preventDefault(); props.changeTab("Registration"); }}>Зарегистрируйтесь</a>
            </p>
        </div>
    );
}