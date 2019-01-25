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

const ElectionVoters = ({
  getVoterValidationState,
  currentVoter,
  handleVoterChange,
  addVoter,
  voters,
  setVoters
}) => {
  return (
    <>
      <FormGroup
        controlId="formBasicText"
        validationState={getVoterValidationState()}
      >
        <ControlLabel>Add voter address:</ControlLabel>
        <FormControl
          type="text"
          value={currentVoter}
          placeholder="e.g. '0xe7ba88433e60c53c69b19f503e00851b98891551'"
          onChange={handleVoterChange}
        />
        <FormControl.Feedback />
        <HelpBlock>Please ensure this is a public key.</HelpBlock>
        <Button bsSize="small" onClick={() => addVoter()}>
          Add voter
        </Button>
      </FormGroup>
      <div className="cand-inner">
        <ControlLabel>Voters:</ControlLabel>
        <ListGroup>
          {voters.map((voter, i) => (
            <ListGroupItem key={i}>{`${i + 1}: ${voter}`}</ListGroupItem>
          ))}
        </ListGroup>
        <Button bsSize="small" onClick={() => setVoters()}>
          Set voters
        </Button>
      </div>
    </>
  );
};

export default ElectionVoters;
