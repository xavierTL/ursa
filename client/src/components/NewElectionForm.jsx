import React, { Component } from 'react';
import {
  ProgressBar,
  FormGroup,
  FormControl,
  ControlLabel,
  HelpBlock,
  Button
} from 'react-bootstrap';
import NewElectionHeader from './NewElectionHeader';
import DateTimePicker from 'react-datetime-picker';

class NewElectionForm extends Component {
  state = {
    title: '',
    titleDone: false,
    startDate: new Date(),
    endDate: new Date(),
    timesDone: false
  };
  render() {
    const { title, titleDone, timesDone } = this.state;
    let now = [titleDone, timesDone].filter(x => x === true).length * 20;
    return (
      <div>
        <NewElectionHeader />
        <ProgressBar now={now} active label={`${now}%`} />
        <form className="new-election-form">
          <FormGroup
            controlId="formBasicText"
            validationState={this.getValidationState('title')}
          >
            <ControlLabel>Title.</ControlLabel>
            <FormControl
              type="text"
              value={title}
              placeholder="e.g. 'Who should cook dinner tonight?'"
              onChange={this.handleTitleChange}
            />
            <FormControl.Feedback />
            <HelpBlock>Must be at least 10 characters.</HelpBlock>
          </FormGroup>
          <FormGroup validationState={this.getStartTimeValidationState()}>
            <ControlLabel>Start time:</ControlLabel>
            <DateTimePicker
              onChange={this.startChange}
              value={this.state.startDate}
            />
          </FormGroup>
          <FormGroup validationState={this.getEndTimeValidationState()}>
            <ControlLabel>End time:</ControlLabel>
            <DateTimePicker
              onChange={this.endChange}
              value={this.state.endDate}
            />
            <Button onClick={() => this.setTimes()}>Set Dates</Button>
          </FormGroup>
        </form>
      </div>
    );
  }
  componentDidMount = async () => {
    const { methods } = this.props.drizzle.contracts.ElectionManager;
    console.log(await methods.smokeTest().call());
  };

  handleTitleChange = e => {
    this.setState({ title: e.target.value }, () => {
      const { title } = this.state;
      if (title.length > 10) {
        this.setState({ titleDone: true });
      } else {
        this.setState({ titleDone: false });
      }
    });
  };

  getValidationState = data => {
    const length = this.state[data].length;
    return length > 10 ? 'success' : 'warning';
  };

  startChange = date => {
    this.setState({ startDate: date });
  };

  getStartTimeValidationState = () => {
    const { startDate } = this.state;
    return 'warning';
  };

  endChange = date => {
    this.setState({ endDate: date });
  };

  getEndTimeValidationState = () => {
    const { endDate } = this.state;
    return 'warning';
  };

  setTimes = () => {
    const { timesDone } = this.state;
    this.setState({ timesDone: !timesDone });
  };
}

export default NewElectionForm;
