import React from "react";

import Navigation from "../Navigation/Navigation";

export default class Header extends React.Component {
    render() {
        return (
            <header className="Header">
                <Navigation currentTab={this.props.currentTab} changeTab={this.props.changeTab} />
            </header>
        );
    }
}
