import React from 'react';
import PropTypes from "prop-types";

import "./Navigation.css";

import { Button, Toolbar } from '@material-ui/core';
import NavigationLogo from './NavigationLogo/NavigationLogo';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { authLogOut } from '../../modules/user';

export const tabs = {
    Map: {
        href: "/map",
        caption: "Карта"
    },
    Profile: {
        href: "/profile",
        caption: "Профиль"
    }
}

export class Navigation extends React.Component {
    static propTypes = {
        logOut: PropTypes.func
    }

    render() {
        return (
            <Toolbar className="Navigation" variant="regular">
                <NavigationLogo />
                {Object.keys(tabs).map((tabKey) => (
                        <NavLink
                            key={tabKey}
                            to={tabs[tabKey].href}
                            activeClassName="active"
                            className="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-colorInherit"
                        >
                            <Button color="inherit">{tabs[tabKey].caption}</Button>
                        </NavLink>
                ))}
                <Link
                    to="/logout"
                    name="logout"
                    onClick={this.props.logOut}
                    className="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-colorInherit"
                >
                    <Button color="inherit">Выйти</Button>
                </Link>
            </Toolbar>
        );
    }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = {
    logOut: authLogOut
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Navigation);
