import React, { Component } from 'react';
import UrsaHeader from './components/UrsaHeader';
import Top from './components/Top';
import './App.css';

class App extends Component {
  state = {
    loading: true,
    drizzleState: null,
    user: 'loading...'
  };
  render() {
    const { user, loading } = this.state;
    return (
      <div className="App">
        <Top />
        <div className="main-cont">
          {loading ? null : <UrsaHeader user={user} />}
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
