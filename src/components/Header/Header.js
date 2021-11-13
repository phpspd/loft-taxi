import React from "react";

import Navigation from "../Navigation/Navigation";

import { AppBar, withStyles } from "@material-ui/core";


const HeaderAppBar = withStyles({
    root: {
        color: "#fff",
        backgroundColor: "#1C1A19"
    }
})(AppBar);

export default class Header extends React.Component {
    render() {
        return (
            <HeaderAppBar position="static" color="primary" elevation={4}>
                <Navigation />
            </HeaderAppBar>
        );
    }
}
