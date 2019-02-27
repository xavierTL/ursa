import React, { Component } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

class Voter extends Component {
  state = {
    voted: false
  };
  render() {
    const { voted } = this.state;
    const { candidates } = this.props;
    return (
      <>
        {!voted ? (
          <>
            <Button onClick={() => this.castVote()}>Submit Vote</Button>
          </>
        ) : (
          <Alert bsStyle="success">
            You voted! Head to Results to see how it's going.
          </Alert>
        )}
      </>
    );
  }

  componentDidMount() {
    this.castVote();
  }

  castVote = async candId => {
    const { methods } = this.props.drizzle.contracts.ElectionManager;
    const { electionId, refresh } = this.props;
  };
}

export default Voter;
