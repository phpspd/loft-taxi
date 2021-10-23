import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { getIsLoggedIn } from "../../modules/user";

let PrivateRoute = ({
    component: RouteComponent,
    isLoggedIn,
    unauthRedirectPath,
    ...rest
}) => {
    return <Route
        {...rest}
        render={routeProps =>
            isLoggedIn ? (
                <RouteComponent {...routeProps} />
            ) : (
                <Redirect to={unauthRedirectPath} />
            )
        }
    />
};

PrivateRoute.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    unauthRedirectPath: PropTypes.string.isRequired,
    component: PropTypes.elementType
}

const mapStateToProps = state => ({
    isLoggedIn: getIsLoggedIn(state),
    unauthRedirectPath: "/registration"
});

PrivateRoute = connect(
    mapStateToProps
)(PrivateRoute);

export default PrivateRoute;
