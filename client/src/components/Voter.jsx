import React, { Component } from 'react';
import {
  Button,
  Alert,
  ListGroup,
  ListGroupItem,
  Modal
} from 'react-bootstrap';

class Voter extends Component {
  state = {
    voted: false,
    candidate: { id: 0, name: null },
    showModal: false
  };
  render() {
    const { voted, candidate } = this.state;
    const { candidates } = this.props;
    return (
      <>
        <ListGroup>
          {candidates.map((cand, i) => (
            <ListGroupItem key={i}>
              {cand.name}
              <Button key={i} onClick={() => this.selectCandidate(cand)}>
                Select
              </Button>
            </ListGroupItem>
          ))}
        </ListGroup>
        {!voted ? (
          <>
            <h2>
              {candidate.name
                ? `Your candidate: ${candidate.name}`
                : 'Please select a candidate.'}
            </h2>
            <Button onClick={() => this.toggleModal()}>Vote</Button>

            <Modal show={this.state.showModal} onHide={this.toggleModal}>
              <Modal.Header closeButton>
                <Modal.Title>Submit your vote</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                This will cost a small non-refundable amount.
              </Modal.Body>
              <Modal.Footer>
                <Button variant="primary" onClick={() => this.castVote()}>
                  {`Submit vote for ${candidate.name}`}
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        ) : (
          <Alert bsStyle="success">
            You voted! Head to Results to see how it's going.
          </Alert>
        )}
      </>
    );
  }

  componentDidMount() {}

  selectCandidate = candidate => {
    this.setState({ candidate });
  };

  toggleModal = () => {
    const { showModal } = this.state;
    this.setState({ showModal: !showModal });
  };

  castVote = async () => {
    this.toggleModal();
    const { electionId } = this.props;
    const { id } = this.state.candidate;
    const { methods } = this.props.drizzle.contracts.ElectionManager;
    try {
      console.log(id, electionId);
      await methods
        .voteForCandidate(id, electionId)
        .send()
        .then(tx => {});
    } catch (err) {
      alert(err);
    }
  };
}

export default Voter;
