import React, { Component } from 'react';
import JumboHead from './JumboHead';
import ReviewTable from './ReviewTable';
import AddElectionCandidates from './AddElectionCandidates';
import StartEnd from './StartEnd';
import Results from './Results';
import Voter from './Voter';
import { Tabs, Tab, Alert } from 'react-bootstrap';

const moment = require('moment');

class ElectionView extends Component {
  state = {
    loading: true,
    electionData: {},
    whiteList: [],
    candidates: [],
    registered: false,
    owner: false,
    status: 'closed'
  };
  render() {
    const { electionName, startTime, endTime } = this.state.electionData;
    const {
      loading,
      whiteList,
      candidates,
      registered,
      owner,
      status
    } = this.state;
    const start = this.humanize(startTime);
    const end = this.humanize(endTime);
    const pieData = this.formatCandidateData(candidates);
    return (
      <>
        {loading ? null : (
          <>
            <JumboHead
              imgId={status === 'open' ? '1346564' : '1346540'}
              text={electionName}
            />
            {status === 'notOpenYet' && (
              <Alert bsStyle="warning">{`Election opens at ${start}`}</Alert>
            )}
            {status === 'open' && (
              <Alert bsStyle="success">{`Election open, closes at ${end}`}</Alert>
            )}
            {status === 'closed' && (
              <Alert bsStyle="danger">{`Election closed at ${end}`}</Alert>
            )}
            <Tabs defaultActiveKey={2} id="uncontrolled-tab-example">
              <Tab eventKey={1} title="Candidates">
                <ReviewTable
                  data="Current Candidates"
                  dataArray={candidates.map(cand => cand[1][1])}
                />
                {owner && status !== 'closed' ? (
                  <AddElectionCandidates
                    electionId={this.props.id}
                    drizzle={this.props.drizzle}
                  />
                ) : null}
              </Tab>
              {registered ? (
                <Tab eventKey={2} title="Vote">
                  <Voter
                    electionId={this.props.id}
                    refresh={this.fetchCandidates}
                    candidates={candidates}
                    drizzle={this.props.drizzle}
                  />
                </Tab>
              ) : null}
              <Tab eventKey={3} title="Registry">
                <ReviewTable data="Addresses" dataArray={whiteList} />
              </Tab>
              <Tab eventKey={4} title="Results">
                <StartEnd start={start} end={end} />
                <Results pieData={pieData} />
              </Tab>
            </Tabs>
          </>
        )}
      </>
    );
  }

  componentDidMount = async () => {
    this.fetchElectionData();
  };

  determineStatus = () => {
    const now = moment(new Date()).unix();
    const { startTime, endTime } = this.state.electionData;
    let status = 'notOpenYet';
    if (now > endTime) status = 'closed';
    if (now > startTime) status = 'open';
    this.setState({ status });
  };

  fetchElectionData = async () => {
    const { id } = this.props;
    const { methods } = this.props.drizzle.contracts.ElectionManager;
    const electionData = await methods.elections(id).call();
    const whiteList = await methods.getRegistry(id).call();
    this.checkRegistry(whiteList);
    this.fetchCandidates();
    const user = this.props.drizzle.web3.eth.accounts.givenProvider
      .selectedAddress;
    const owner = user.toLowerCase() === electionData.creator.toLowerCase();
    this.setState({ electionData, whiteList, loading: false, owner }, () => {
      this.determineStatus();
    });
  };

  fetchCandidates = async () => {
    const { id } = this.props;
    const { methods } = this.props.drizzle.contracts.ElectionManager;
    const candidatesIds = await methods.getElectionCandidates(id).call();
    let promiseArray = [];
    for (let i = 0; i < candidatesIds.length; i++) {
      promiseArray.push(methods.getCandidate(candidatesIds[i]).call());
    }
    Promise.all(promiseArray).then(candidates => {
      this.setState({
        candidates: candidates.map(cand => Object.entries(cand))
      });
    });
  };

  checkRegistry = whiteList => {
    let user = this.props.drizzle.web3.eth.accounts.givenProvider
      .selectedAddress;
    whiteList = whiteList.map(x => x.toLowerCase());
    user = user.toLowerCase();
    let registered = whiteList.includes(user);
    this.setState({ registered });
  };

  formatCandidateData = data => {
    const result = data.reduce((acc, val) => {
      let cand = {
        key: val[1][1],
        value: val[2][1]
      };
      acc.push(cand);
      return acc;
    }, []);
    return result;
  };

  humanize = timeStamp => {
    return moment.unix(timeStamp).format('dddd, MMMM Do YYYY, h:mm:ss a');
  };
}

export default ElectionView;
