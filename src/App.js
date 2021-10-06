import React from 'react';

import Header from './components/Header/Header';
import Login from './components/Login/Login';
import Map from './components/Map/Map';
import Profile from './components/Profile/Profile';
import Registration from './components/Registration/Registration';

export class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTab: "Login"
        };
    }

    componentDidMount() {
        document.title = this.title;
    }

    get title() {
        return "🚖 Loft-Taxi " + this.state.currentTab;
    }

    changeTab = (newTab) => {
        this.setState({
            currentTab: newTab
        });
        document.title = this.title;
    }

    onLoggedIn = ({ email } = {}) => {
        this.setState({
            email,
            currentTab: "Map"
        });
    }

    render() {
        return (
            <div className="App">
                <Header currentTab={this.state.currentTab} changeTab={this.changeTab} />
                {
                    {
                        Login: <Login onLoggedIn={this.onLoggedIn} changeTab={this.changeTab} />,
                        Map: <Map />,
                        Profile: <Profile />,
                        Registration: <Registration onSignedUp={this.onLoggedIn} changeTab={this.changeTab} />
                    }[this.state.currentTab]
                }
            </div>
        );
    }
}

export default App;
