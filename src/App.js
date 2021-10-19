import React from 'react';

import Header from './components/Header/Header';
import Login from './components/Login/Login';
import MapPage from './components/MapPage/MapPage';
import Profile from './components/Profile/Profile';
import Registration from './components/Registration/Registration';
import { Route, Switch, Redirect } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { getIsLoggedIn } from './modules/user';

export class App extends React.Component {
    static propTypes = {
        isLoggedIn: PropTypes.bool
    }

    componentDidMount() {
        document.title = this.title;
    }

    componentDidUpdate() {
        document.title = this.title;
    }

    get title() {
        return "🚖 Loft-Taxi " + this.props.currentPage;
    }

    render() {
        return (
            <div className="App">
                { this.props.isLoggedIn ? <Header /> : null }
                <Switch>
                    <Route path="/login" component={Login} />
                    <PrivateRoute path="/map" component={MapPage} />
                    <PrivateRoute path="/profile" component={Profile} />
                    <Route path="/registration" component={Registration} />
                    <Redirect to="/login" />
                </Switch>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isLoggedIn: getIsLoggedIn(state)
});

const mapDispatchToProps = {};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
