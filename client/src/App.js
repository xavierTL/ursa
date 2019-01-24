import React, { Component } from 'react';
import UrsaHeader from './components/UrsaHeader';

class App extends Component {
  state = {
    user: 'not connected to metamask'
  };
  render() {
    const { user } = this.state;
    console.log(this.props);
    return (
      <div className="App">
        <UrsaHeader user={user} />
      </div>
    );
  }
}

export default App;
