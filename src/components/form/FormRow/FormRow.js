import { React } from "react";

import "./FormRow.css"

export default function FormRow(props) {
    const children = !props.children || Array.isArray(props.children)
            ? props.children
            : [ props.children ];

    return (
        <div className="FormRow">
            {children}
        </div>
    )
}
