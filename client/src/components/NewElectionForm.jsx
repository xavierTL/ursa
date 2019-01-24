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
          Start time:
          <DateTimePicker
            onChange={this.startChange}
            value={this.state.startDate}
          />
          End time:
          <DateTimePicker
            onChange={this.endChange}
            value={this.state.endDate}
          />
          <Button>SET</Button>
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

  getValidationState(data) {
    const length = this.state[data].length;
    return length > 10 ? 'success' : 'warning';
  }

  startChange = date => {
    console.log(date);
    this.setState({ startDate: date });
  };
  endChange = date => {
    console.log(date);
    this.setState({ endDate: date });
  };
}

export default NewElectionForm;
