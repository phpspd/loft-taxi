import React from "react";

import Navigation from "../Navigation/Navigation";

import { AppBar, styled } from "@material-ui/core";


const HeaderAppBar = styled(AppBar)({
    color: "#fff",
    backgroundColor: "#1C1A19"
});

export default class Header extends React.Component {
    render() {
        return (
            <HeaderAppBar position="static" color="primary" elevation={4}>
                <Navigation currentTab={this.props.currentTab} changeTab={this.props.changeTab} logout={this.props.logout} />
            </HeaderAppBar>
        );
    }
}
