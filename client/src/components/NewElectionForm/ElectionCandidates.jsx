import React from 'react';
import {
  FormGroup,
  FormControl,
  ControlLabel,
  HelpBlock,
  Button,
  ListGroup,
  ListGroupItem
} from 'react-bootstrap';

const ElectionCandidates = ({
  getCandValidationState,
  currentCand,
  handleCandidateChange,
  addCandidate,
  candidates,
  setCandidates
}) => {
  return (
    <>
      <FormGroup
        controlId="formBasicText"
        validationState={getCandValidationState()}
      >
        <ControlLabel>Add Candidate:</ControlLabel>
        <FormControl
          type="text"
          value={currentCand}
          placeholder="e.g. 'Fabian'"
          onChange={handleCandidateChange}
        />
        <FormControl.Feedback />
        <HelpBlock>Must be at least 5 characters.</HelpBlock>
        <Button bsSize="small" onClick={() => addCandidate()}>
          Add candidate
        </Button>
      </FormGroup>
      <div className="cand-inner">
        <ControlLabel>Candidates:</ControlLabel>
        <ListGroup>
          {candidates.map((cand, i) => (
            <ListGroupItem key={i}>{`${i + 1}: ${cand}`}</ListGroupItem>
          ))}
        </ListGroup>
        <Button bsSize="small" onClick={() => setCandidates()}>
          Set candidates
        </Button>
      </div>
    </>
  );
};

export default ElectionCandidates;
