import { React } from "react";

import "./FlexRow.css"

export function FlexRow(props) {
    const children = !props.children || Array.isArray(props.children)
            ? props.children
            : [ props.children ];

    return (
        <div className="FlexRow">
            {children}
        </div>
    );
}

export function FlexRowSpacer() {
    return (
        <div className="spacer"></div>
    );
}
