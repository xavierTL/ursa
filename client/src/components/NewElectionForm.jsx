import React, { Component } from 'react';
import {
  ProgressBar,
  FormGroup,
  FormControl,
  ControlLabel,
  HelpBlock,
  Button,
  ListGroup,
  ListGroupItem
} from 'react-bootstrap';
import NewElectionHeader from './NewElectionHeader';
import DateTimePicker from 'react-datetime-picker';
const moment = require('moment');

class NewElectionForm extends Component {
  state = {
    title: '',
    titleDone: false,
    startDate: new Date(),
    endDate: new Date(),
    timesDone: false,
    candidates: [],
    currentCand: '',
    candsDone: false
  };
  render() {
    const {
      title,
      titleDone,
      timesDone,
      candidates,
      currentCand,
      candsDone
    } = this.state;
    let now =
      [titleDone, timesDone, candsDone].filter(x => x === true).length * 20;
    return (
      <div>
        <NewElectionHeader />
        <ProgressBar now={now} active label={`${now}%`} />
        <form className="new-election-form">
          <FormGroup
            controlId="formBasicText"
            validationState={this.getValidationState()}
          >
            <ControlLabel>Title:</ControlLabel>
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
            <ControlLabel className="time">Start time:</ControlLabel>
            <DateTimePicker
              onChange={this.startChange}
              value={this.state.startDate}
            />
            <HelpBlock>At least one hour from now.</HelpBlock>
          </FormGroup>

          <FormGroup validationState={this.getEndTimeValidationState()}>
            <ControlLabel className="time">End time:</ControlLabel>
            <DateTimePicker
              onChange={this.endChange}
              value={this.state.endDate}
            />
            <HelpBlock>At least one hour after start time.</HelpBlock>
            <Button bsSize="small" onClick={() => this.setTimes()}>{`${
              timesDone ? 'Change' : 'Set'
            } times`}</Button>
          </FormGroup>

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
          <div className="cand-inner">
            <ControlLabel>Candidates:</ControlLabel>
            <ListGroup>
              {candidates.map((cand, i) => (
                <ListGroupItem key={i}>{`${i + 1}: ${cand}`}</ListGroupItem>
              ))}
            </ListGroup>
            <Button bsSize="small" onClick={() => this.setCandidates()}>
              Set candidates
            </Button>
          </div>
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

  getValidationState = () => {
    const length = this.state.title.length;
    return length >= 10 ? 'success' : 'warning';
  };

  startChange = date => {
    this.setState({ startDate: date });
  };

  getStartTimeValidationState = () => {
    let { startDate } = this.state;
    let startUnix = moment(startDate).unix();
    let anHourFromNow = moment(new Date()).unix() + 3600;
    if (startUnix < anHourFromNow) return 'warning';
    return 'success';
  };

  endChange = date => {
    this.setState({ endDate: date });
  };

  getEndTimeValidationState = () => {
    const { endDate, startDate } = this.state;
    let startUnix = moment(startDate).unix();
    let endUnix = moment(endDate).unix();
    if (startUnix + 3600 > endUnix) return 'warning';
    return 'success';
  };

  setTimes = () => {
    const { timesDone, endDate, startDate } = this.state;
    let startUnix = moment(startDate).unix();
    let anHourFromNow = moment(new Date()).unix() + 3600;
    let endUnix = moment(endDate).unix();
    if (startUnix < anHourFromNow) return;
    if (startUnix + 3600 > endUnix) return;
    this.setState({ timesDone: !timesDone });
  };

  handleCandidateChange = e => {
    this.setState({ currentCand: e.target.value });
  };

  getCandValidationState = () => {
    const { currentCand, candsDone } = this.state;
    if (currentCand.length >= 5 || candsDone) return 'success';
    return 'warning';
  };

  addCandidate = () => {
    const { candidates, currentCand } = this.state;
    if (currentCand.length >= 5) {
      candidates.push(currentCand);
      this.setState({ candidates, currentCand: '' });
    }
  };

  setCandidates = () => {
    const { candsDone, candidates } = this.state;
    if (candidates.length) {
      this.setState({ candsDone: !candsDone });
    }
  };
}

export default NewElectionForm;
