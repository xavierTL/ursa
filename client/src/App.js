import React, { Component } from 'react';
import UrsaHeader from './components/UrsaHeader';
import Top from './components/Top';
import ElectionBuilder from './components/ElectionBuilder';
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
              <UrsaHeader user={user} />
              <Router>
                <ElectionBuilder path="new-election" drizzle={drizzle} />
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
