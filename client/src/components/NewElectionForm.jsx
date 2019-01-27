import React, { Component } from 'react';
import { ProgressBar, Button, Pager } from 'react-bootstrap';
import NewElectionHeader from './NewElectionHeader';
import ElectionTitle from './NewElectionForm/ElectionTitle';
import ElectionTimes from './NewElectionForm/ElectionTimes';
import ElectionCandidates from './NewElectionForm/ElectionCandidates';
import ElectionVoters from './NewElectionForm/ElectionVoters';
import ElectionFormReview from './ElectionFormReview';
const moment = require('moment');

class NewElectionForm extends Component {
  state = {
    title: '',
    titleDone: false,
    startDate: null,
    endDate: null,
    timesDone: false,
    candidates: [],
    currentCand: '',
    candsDone: false,
    voters: [],
    currentVoter: '',
    votersDone: false,
    review: false,
    completed: false,
    tx: ''
  };
  render() {
    const {
      title,
      titleDone,
      timesDone,
      candidates,
      currentCand,
      candsDone,
      currentVoter,
      voters,
      votersDone,
      startDate,
      endDate,
      review,
      completed,
      tx
    } = this.state;
    let now =
      [titleDone, timesDone, candsDone, votersDone, completed].filter(
        x => x === true
      ).length * 20;
    const stringStart = JSON.stringify(startDate);
    const stringEnd = JSON.stringify(endDate);
    const electionData = { title, candidates, voters, stringStart, stringEnd };
    return (
      <div>
        <NewElectionHeader review={review} title={title} tx={tx} />
        <ProgressBar now={now} active label={`${now}%`} />
        {review ? (
          <div className="new-election-form">
            <Pager>
              <Pager.Item previous onClick={() => this.toggleReview()}>
                &larr; Go back
              </Pager.Item>
            </Pager>
            <ElectionFormReview
              toggleCompleted={this.toggleCompleted}
              electionData={electionData}
              now={now}
            />
          </div>
        ) : (
          <>
            <form className="new-election-form">
              <ElectionTitle
                title={title}
                getValidationState={this.getValidationState}
                handleTitleChange={this.handleTitleChange}
              />
              <ElectionTimes
                getStartTimeValidationState={this.getStartTimeValidationState}
                startChange={this.startChange}
                startDate={startDate}
                getEndTimeValidationState={this.getEndTimeValidationState}
                endChange={this.endChange}
                endDate={endDate}
                setTimes={this.setTimes}
                timesDone={timesDone}
              />
              <ElectionCandidates
                getCandValidationState={this.getCandValidationState}
                currentCand={currentCand}
                handleCandidateChange={this.handleCandidateChange}
                addCandidate={this.addCandidate}
                candidates={candidates}
                setCandidates={this.setCandidates}
              />
              <ElectionVoters
                getVoterValidationState={this.getVoterValidationState}
                currentVoter={currentVoter}
                handleVoterChange={this.handleVoterChange}
                addVoter={this.addVoter}
                voters={voters}
                setVoters={this.setVoters}
              />
            </form>
            {now === 80 ? (
              <Button
                onClick={() => this.toggleReview()}
                bsSize="large"
                bsStyle="primary"
              >
                REVIEW
              </Button>
            ) : null}
          </>
        )}
      </div>
    );
  }
  componentDidMount = async () => {
    const { methods } = this.props.drizzle.contracts.ElectionManager;
    // console.log(await methods.smokeTest().call());
  };

  toggleReview = () => {
    const { review } = this.state;
    this.setState({ review: !review });
  };

  toggleCompleted = () => {
    this.setState({ completed: true }, () => {
      this.launchElection();
    });
  };

  launchElection = async () => {
    const { title, candidates, voters, startDate, endDate } = this.state;
    const { methods } = this.props.drizzle.contracts.ElectionManager;
    const startUnix = moment(startDate).unix();
    const endUnix = moment(endDate).unix();
    console.log(startUnix, endUnix);
    const id = await methods
      .startElection(title, startUnix, endUnix, candidates[0], voters)
      .send();
    this.setState({ tx: id.transactionHash });
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
    let startUnix = isNaN(moment(startDate).unix())
      ? 0
      : moment(startDate).unix();
    let anHourFromNow = moment(new Date()).unix() + 3600;
    if (startUnix < anHourFromNow) return 'warning';
    return 'success';
  };

  endChange = date => {
    this.setState({ endDate: date });
  };

  getEndTimeValidationState = () => {
    const { endDate, startDate } = this.state;
    let startUnix = isNaN(moment(startDate).unix())
      ? 0
      : moment(startDate).unix();
    let endUnix = isNaN(moment(endDate).unix()) ? 0 : moment(endDate).unix();
    if (startUnix + 3600 >= endUnix) return 'warning';
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

  getVoterValidationState = () => {
    const { currentVoter, votersDone } = this.state;
    if (currentVoter.length === 42 || votersDone) return 'success';
    return 'warning';
  };

  handleVoterChange = e => {
    this.setState({ currentVoter: e.target.value });
  };

  addVoter = () => {
    const { voters, currentVoter } = this.state;
    if (currentVoter.length === 42) {
      voters.push(currentVoter);
      this.setState({ voters, currentVoter: '' });
    }
  };
  setVoters = () => {
    const { votersDone, voters } = this.state;
    if (voters.length) {
      this.setState({ votersDone: !votersDone });
    }
  };
}

export default NewElectionForm;
