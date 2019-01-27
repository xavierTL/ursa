import React, { Component } from 'react';
import Nav from './components/Nav';
import Top from './components/Top';
import ElectionBuilder from './components/ElectionBuilder';
import ElectionsDisplay from './components/ElectionsDisplay';
import ElectionView from './components/ElectionView';
import Woops from './components/Woops';
import Home from './components/Home';
import './App.css';
import { Router } from '@reach/router';

class App extends Component {
  state = {
    loading: true,
    drizzleState: null,
    user: 'loading...'
  };
  render() {
    const { user, loading } = this.state;
    const { drizzle } = this.props;
    return (
      <div className="App">
        <Top />
        <div className="main-cont">
          {loading ? null : (
            <>
              <Nav user={user} />
              <Router>
                <Home path="home" />
                <ElectionBuilder path="new-election" drizzle={drizzle} />
                <ElectionsDisplay
                  path="elections"
                  drizzle={drizzle}
                  user={user}
                />
                <ElectionView path="election/:id" drizzle={drizzle} />
                <Woops path="*" />
              </Router>
            </>
          )}
        </div>
      </div>
    );
  }
  componentDidMount() {
    const { drizzle } = this.props;
    this.unsubscribe = drizzle.store.subscribe(() => {
      const drizzleState = drizzle.store.getState();
      if (drizzleState.drizzleStatus.initialized) {
        let user = this.props.drizzle.web3.eth.accounts.givenProvider
          .selectedAddress;
        this.setState({ loading: false, drizzleState, user });
      }
    });
  }
}

export default App;
