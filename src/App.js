import React from 'react';

import Navigation from './components/Navigation/Navigation';

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

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <Navigation currentTab={this.state.currentTab} changeTab={this.changeTab} />
                </header>
            </div>
        );
    }
}

export default App;
