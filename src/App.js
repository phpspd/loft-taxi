import React from 'react';

import Header from './components/Header/Header';
import Login from './components/Login/Login';
import MapPage from './components/MapPage/MapPage';
import Profile from './components/Profile/Profile';
import Registration from './components/Registration/Registration';
import { withAuth } from './contexts/AuthContext/AuthContext';
import { withNavigation } from './contexts/NavigationContext/NavigationContext';

export class App extends React.Component {
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
                {
                    {
                        Login: <Login />,
                        Map: <MapPage />,
                        Profile: <Profile />,
                        Registration: <Registration />
                    }[this.props.currentPage]
                }
            </div>
        );
    }
}

export default withNavigation(withAuth(App));
