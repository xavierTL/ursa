import React, { Component } from 'react';
import ReviewTable from './ReviewTable';
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
    const { currentCand, newCandidates } = this.state;
    return (
      <>
        {newCandidates.length ? (
          <>
            <ReviewTable data="New Candidates" dataArray={newCandidates} />
            <Button onClick={() => this.registerCandidates()}>
              Register New Candidates
            </Button>
          </>
        ) : null}
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

  componentDidMount() {
    // const { methods } = this.props.drizzle.contracts.ElectionManager;
    // console.log(await methods.smokeTest().call());
  }

  handleCandidateChange = e => {
    console.log(e.target.value);
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
    }
  };

  registerCandidates = async () => {
    const { methods } = this.props.drizzle.contracts.ElectionManager;
    const { newCandidates } = this.state;
    const { electionId } = this.props;
    const promiseArray = [];
    for (let i = 0; i < newCandidates.length; i++) {
      promiseArray.push(
        methods.addNewCandidate(electionId, newCandidates[i]).send()
      );
    }
    Promise.all(promiseArray);
  };
}

export default AddElectionCandidates;
