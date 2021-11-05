import React from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/styles";
import { Button } from '@material-ui/core';

const useStyles = (styles) => makeStyles({
    root: {
        width: "100%",
        //marginTop: "72px",
        fontSize: "1.3rem",
        fontWeight: 400,
        borderRadius: "40px",
        letterSpacing: "0px",
        ...styles
    }
})();

export const StyledButton = ({ children, type, style, ...rest }) => {
    const classes = useStyles(style);
    return <Button className={classes.root} variant="contained" type={type} color="primary" fullWidth={true} {...rest}>{children}</Button>;
};

StyledButton.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string)
    ]).isRequired
};
