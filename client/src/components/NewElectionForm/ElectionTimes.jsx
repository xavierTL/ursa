import React from 'react';
import { FormGroup, ControlLabel, HelpBlock, Button } from 'react-bootstrap';
import DateTimePicker from 'react-datetime-picker';

const ElectionTimes = ({
  getStartTimeValidationState,
  startChange,
  startDate,
  getEndTimeValidationState,
  endChange,
  endDate,
  setTimes,
  timesDone
}) => {
  return (
    <>
      <FormGroup validationState={getStartTimeValidationState()}>
        <ControlLabel className="time">Start time:</ControlLabel>
        <DateTimePicker onChange={startChange} value={startDate} />
        <HelpBlock>At least one hour from now.</HelpBlock>
      </FormGroup>
      <FormGroup validationState={getEndTimeValidationState()}>
        <ControlLabel className="time">End time:</ControlLabel>
        <DateTimePicker onChange={endChange} value={endDate} />
        <HelpBlock>At least one hour after start time.</HelpBlock>
        <Button bsSize="small" onClick={() => setTimes()}>{`${
          timesDone ? 'Change' : 'Set'
        } times`}</Button>
      </FormGroup>
    </>
  );
};

export default ElectionTimes;
