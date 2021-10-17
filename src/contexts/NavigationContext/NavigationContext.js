import React from "react";
import { withAuth } from "../AuthContext/AuthContext";

export const NavigationContext = React.createContext();

export const NavigationProvider = withAuth(({ children, isLoggedIn }) => {
    const [ currentPage, setCurrentPage ] = React.useState("Login");

    const navigateTo = newPage => {
        if (isLoggedIn || ["Login", "Registration"].includes(newPage)) {
            setCurrentPage(newPage);
        } else {
            setCurrentPage("Login");
        }
    }

    return (
        <NavigationContext.Provider value={{ navigateTo, currentPage }}>
            {children}
        </NavigationContext.Provider>
    )
});

export const withNavigation = WrappedComponent => {
    return class extends React.Component {
        render() {
            return (
                <NavigationContext.Consumer>
                    {
                        value => <WrappedComponent { ...value } { ...this.props } />
                    }
                </NavigationContext.Consumer>
            )
        }
    }
};
