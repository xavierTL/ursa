import React, { Component } from 'react';
import { ProgressBar } from 'react-bootstrap';

class NewElectionForm extends Component {
  state = {
    now: 80
  };
  render() {
    const { now } = this.state;
    return (
      <div>
        <ProgressBar now={80} active label={`${now}%`} />
      </div>
    );
  }
}

export default NewElectionForm;
