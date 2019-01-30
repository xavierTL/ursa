import React, { Component } from 'react';
import { Alert } from 'react-bootstrap';

class Voter extends Component {
  state = {
    voted: false
  };
  render() {
    const { voted } = this.state;
    return (
      <>
        {voted ? (
          <></>
        ) : (
          <Alert bsStyle="success">
            You voted! Head to Results to see how it's going.
          </Alert>
        )}
      </>
    );
  }
}

export default Voter;
