import React, { Component } from 'react';
import { ProgressBar } from 'react-bootstrap';
import NewElectionHeader from './NewElectionHeader';

class NewElectionForm extends Component {
  state = {
    now: 3
  };
  render() {
    const { now } = this.state;
    return (
      <div>
        <NewElectionHeader />
        <ProgressBar now={now} active label={`${now}%`} />
      </div>
    );
  }
  componentDidMount = async () => {
    const { methods } = this.props.drizzle.contracts.ElectionManager;
    console.log(await methods.smokeTest().call());
  };
}

export default NewElectionForm;
