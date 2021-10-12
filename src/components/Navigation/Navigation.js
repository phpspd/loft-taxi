import React from 'react';

import "./Navigation.css";

import { Button, Toolbar } from '@material-ui/core';
import NavigationLogo from './NavigationLogo/NavigationLogo';

const tabs = {
    Map: {
        href: "/main/order",
        caption: "Карта"
    },
    Profile: {
        href: "/main/profile",
        caption: "Профиль"
    }
}

class Navigation extends React.Component {
    changeTab = newTab => {
        if (newTab && typeof this.props.changeTab === "function") {
            this.props.changeTab(newTab);
        }
    }

    logout = e => {
        e.preventDefault();
        if (typeof this.props.logout === "function") {
            this.props.logout();
        }
    }

    render() {
        const { currentTab } = this.props;
        return (
            <Toolbar className="Navigation" variant="regular">
                <NavigationLogo />
                {Object.keys(tabs).map((tabKey) => (
                    <Button
                        key={tabKey}
                        href={tabs[tabKey].href}
                        className={currentTab === tabKey ? "active": null}
                        onClick={(e) => { e.preventDefault(); this.changeTab(tabKey); }}
                        color="inherit"
                    >{tabs[tabKey].caption}</Button>
                ))}
                <Button href="/main/logout" name="logout" onClick={this.logout} color="inherit">Выйти</Button>
            </Toolbar>
        );
    }
}

export default Navigation;
