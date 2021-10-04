import React from 'react';

import "./Navigation.css";

const tabs = {
    Map: {
        href: "/main/order",
        caption: "Карта"
    },
    Profile: {
        href: "/main/profile",
        caption: "Профиль"
    },
    Login: {
        href: "/main/login",
        caption: "Логин"
    }
}

class Navigation extends React.Component {
    changeTab = (e) => {
        e.preventDefault();
        if (typeof this.props.changeTab === "function") {
            this.props.changeTab(e.target.parentNode.name);
        }
    }

    render() {
        const { currentTab } = this.props;
        return (
            <div className="Navigation">
                {Object.keys(tabs).map((tabKey) => (
                    <a key={tabKey} href={tabs[tabKey].href} name={tabKey} className={currentTab === tabKey ? "active": null}>
                        <span onClick={this.changeTab}>{tabs[tabKey].caption}</span>
                    </a>
                ))}
            </div>
        );
    }
}

export default Navigation;
