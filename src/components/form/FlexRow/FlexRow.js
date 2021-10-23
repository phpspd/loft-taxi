import React from "react";
import PropTypes from "prop-types";

import "./FlexRow.css"

const FlexRow = ({ children, className }) => {
    return (
        <div className={className ? className + " FlexRow" : "FlexRow"}>
            {children}
        </div>
    );
}

FlexRow.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.arrayOf(PropTypes.element)
    ]).isRequired
};

const FlexRowSpacer = () => (
    <div className="spacer"></div>
);

export default FlexRow;
export { FlexRow, FlexRowSpacer };
