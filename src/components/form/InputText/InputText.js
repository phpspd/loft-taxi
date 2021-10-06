import React from "react";

import "./InputText.css";

export default function InputText(props) {
    return (
        <div className="InputText">
            <label>
                {props.label}
                <span className="asterisk">*</span>
            </label>
            <div className="input-container">
                <input name={props.name} placeholder={props.placeholder} required type={props.type || "text"} />
            </div>
        </div>
    )
}
