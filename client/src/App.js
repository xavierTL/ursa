import React, { Component } from 'react';
import UrsaHeader from './components/UrsaHeader';

class App extends Component {
  state = {
    loading: true,
    drizzleState: null,
    user: 'not connected to metamask'
  };
  render() {
    const { user } = this.state;
    return (
      <div className="App">
        <UrsaHeader user={user} />
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
    //    const user = this.props.drizzle.web3.eth.accounts.givenProvider
  }
}

export default App;
