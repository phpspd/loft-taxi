import React from "react";

import "./InputPassword.css";

export default function InputPassword(props) {
    return (
        <div className="InputPassword">
            <label>{props.label || "Пароль"}</label>
            <span className="asterisk">*</span>
            <div className="input-container">
                <input name={props.name} placeholder="*********" required type="password" />
            </div>
        </div>
    )
}