import React, { Component } from 'react';
import { Button, Alert, ListGroup, ListGroupItem } from 'react-bootstrap';

class Voter extends Component {
  state = {
    voted: false,
    selection: ''
  };
  render() {
    const { voted } = this.state;
    const { candidates } = this.props;
    return (
      <>
        <ListGroup>
          {candidates.map((cand, i) => (
            <ListGroupItem key={i}>
              {cand[1][1]}
              <Button key={i} onClick={() => console.log(cand)}>
                Select
              </Button>
            </ListGroupItem>
          ))}
        </ListGroup>
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
    // this.castVote();
  }

  castVote = async candId => {
    const { methods } = this.props.drizzle.contracts.ElectionManager;
    const { electionId, refresh } = this.props;
  };
}

export default Voter;
