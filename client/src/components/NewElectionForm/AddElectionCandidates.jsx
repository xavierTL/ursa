import React, { Component } from 'react';
import {
  FormGroup,
  FormControl,
  ControlLabel,
  HelpBlock,
  Button
} from 'react-bootstrap';

class AddElectionCandidates extends Component {
  state = {
    newCandidates: [],
    currentCand: ''
  };
  render() {
    const { electionId } = this.props;
    const { currentCand } = this.state;
    return (
      <>
        <FormGroup
          controlId="formBasicText"
          validationState={this.getCandValidationState()}
        >
          <ControlLabel>Add Candidate:</ControlLabel>
          <FormControl
            type="text"
            value={currentCand}
            placeholder="e.g. 'Fabian'"
            onChange={this.handleCandidateChange}
          />
          <FormControl.Feedback />
          <HelpBlock>Must be at least 5 characters.</HelpBlock>
          <Button bsSize="small" onClick={() => this.addCandidate()}>
            Add candidate
          </Button>
        </FormGroup>
      </>
    );
  }

  handleCandidateChange = e => {
    this.setState({ currentCand: e.target.value });
  };

  getCandValidationState = () => {
    const { currentCand, candsDone } = this.state;
    if (currentCand.length >= 5 || candsDone) return 'success';
    return 'warning';
  };

  addCandidate = () => {
    const { newCandidates, currentCand } = this.state;
    if (currentCand.length >= 5) {
      newCandidates.push(currentCand);
      this.setState({ newCandidates, currentCand: '' });
      console.log(newCandidates);
    }
  };
}

export default AddElectionCandidates;
