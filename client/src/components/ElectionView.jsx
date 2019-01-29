import React, { Component } from 'react';
import JumboHead from './JumboHead';
import ReviewTable from './ReviewTable';
import AddElectionCandidates from './AddElectionCandidates';
import StartEnd from './StartEnd';
import { Tabs, Tab, Alert } from 'react-bootstrap';

const moment = require('moment');

class ElectionView extends Component {
  state = {
    loading: true,
    electionData: {},
    whiteList: [],
    candidates: [],
    registered: false,
    owner: false
  };
  render() {
    const { electionName, startTime, endTime } = this.state.electionData;
    const { loading, whiteList, candidates, registered, owner } = this.state;
    const now = moment(new Date()).unix();
    const open = now > startTime && now < endTime;
    const start = this.humanize(startTime);
    const end = this.humanize(endTime);
    return (
      <>
        {loading ? null : (
          <>
            <JumboHead
              imgId={open ? '1346564' : '1346540'}
              text={electionName}
            />
            <Alert bsStyle={open ? 'success' : 'danger'}>
              {open ? 'Polls open' : 'Polls closed'}
            </Alert>
            <Tabs defaultActiveKey={2} id="uncontrolled-tab-example">
              {registered ? (
                <Tab eventKey={1} title="Vote">
                  VOTE COMPONENT HERE
                </Tab>
              ) : null}
              <Tab eventKey={2} title="Candidates">
                <ReviewTable
                  data="Currently Registered"
                  dataArray={candidates}
                />
                {owner ? (
                  <AddElectionCandidates
                    electionId={this.props.id}
                    drizzle={this.props.drizzle}
                  />
                ) : null}
              </Tab>
              <Tab eventKey={3} title="Registry">
                <ReviewTable data="Addresses" dataArray={whiteList} />
              </Tab>
              <Tab eventKey={4} title="Start/End">
                <StartEnd start={start} end={end} />
              </Tab>
              <Tab eventKey={5} title="Results">
                RESULTS COMPONENT HERE
              </Tab>
            </Tabs>
          </>
        )}
      </>
    );
  }

  componentDidMount = async () => {
    // const { methods } = this.props.drizzle.contracts.ElectionManager;
    // console.log(await methods.smokeTest().call());
    this.fetchElectionData();
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
    this.setState({ electionData, whiteList, loading: false, owner });
  };

  fetchCandidates = async () => {
    const { id } = this.props;
    const { methods } = this.props.drizzle.contracts.ElectionManager;
    const candidatesIds = await methods.getElectionCandidates(id).call();
    let promiseArray = [];
    for (let i = 0; i < candidatesIds.length; i++) {
      promiseArray.push(methods.getCandidate(candidatesIds[i]).call());
    }
    Promise.all(promiseArray).then(candidates =>
      this.setState({ candidates: candidates.map(cand => cand['1']) })
    );
  };

  checkRegistry = whiteList => {
    let user = this.props.drizzle.web3.eth.accounts.givenProvider
      .selectedAddress;
    whiteList = whiteList.map(x => x.toLowerCase());
    user = user.toLowerCase();
    let registered = whiteList.includes(user);
    this.setState({ registered });
  };

  humanize = timeStamp => {
    return moment.unix(timeStamp).format('dddd, MMMM Do YYYY, h:mm:ss a');
  };
}

export default ElectionView;
