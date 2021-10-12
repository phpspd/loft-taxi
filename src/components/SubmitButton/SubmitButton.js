import React from "react";

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

export default function SubmitButton(props) {
    const classes = useStyles();
    return <Button className={classes.root} variant="contained" type="submit" color="primary" fullWidth={true}>{props.children}</Button>;
}
