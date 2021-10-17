import React from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
    root: {
        marginTop: "72px",
        fontSize: "1.3rem",
        fontWeight: 400,
        borderRadius: "40px",
        letterSpacing: "0px"
    }
});

const SubmitButton = ({ children, ...rest }) => {
    const classes = useStyles();
    return <Button className={classes.root} variant="contained" type="submit" color="primary" fullWidth={true} {...rest}>{children}</Button>;
};

SubmitButton.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string)
    ]).isRequired
}

export default SubmitButton;
