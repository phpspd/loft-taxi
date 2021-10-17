import React from 'react';
import PropTypes from "prop-types";

import "./Navigation.css";

import { Button, Toolbar } from '@material-ui/core';
import NavigationLogo from './NavigationLogo/NavigationLogo';
import { withAuth } from '../../contexts/AuthContext/AuthContext';
import { withNavigation } from '../../contexts/NavigationContext/NavigationContext';

export const tabs = {
    Map: {
        href: "/main/order",
        caption: "Карта"
    },
    Profile: {
        href: "/main/profile",
        caption: "Профиль"
    }
}

export class Navigation extends React.Component {
    static propTypes = {
        currentPage: PropTypes.oneOf(Object.keys(tabs)),
        navigateTo: PropTypes.func,
        logOut: PropTypes.func
    }

    logOut = e => {
        e.preventDefault();
        if (typeof this.props.logOut === "function") {
            this.props.logOut();
            this.props.navigateTo("Login");
        }
    }

    render() {
        const { currentPage } = this.props;
        return (
            <Toolbar className="Navigation" variant="regular">
                <NavigationLogo />
                {Object.keys(tabs).map((tabKey) => (
                    <Button
                        key={tabKey}
                        data-page={tabKey}
                        href={tabs[tabKey].href}
                        className={currentPage === tabKey ? "active": null}
                        onClick={(e) => { e.preventDefault(); this.props.navigateTo(tabKey); }}
                        color="inherit"
                    >{tabs[tabKey].caption}</Button>
                ))}
                <Button href="/main/logout" name="logout" onClick={this.logOut} color="inherit">Выйти</Button>
            </Toolbar>
        );
    }
}

export default withNavigation(withAuth(Navigation));
