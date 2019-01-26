import React from 'react';
import {
  FormGroup,
  FormControl,
  ControlLabel,
  HelpBlock
} from 'react-bootstrap';

const ElectionTitle = ({ title, getValidationState, handleTitleChange }) => {
  return (
    <FormGroup controlId="formBasicText" validationState={getValidationState()}>
      <ControlLabel>Title:</ControlLabel>
      <FormControl
        type="text"
        value={title}
        placeholder="e.g. 'Who should cook dinner tonight?'"
        onChange={handleTitleChange}
      />
      <FormControl.Feedback />
      <HelpBlock>Must be at least 10 characters.</HelpBlock>
    </FormGroup>
  );
};

export default ElectionTitle;
