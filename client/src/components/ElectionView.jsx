import React, { Component } from 'react';
import JumboHead from './JumboHead';
import ReviewTable from './ReviewTable';
import StartEnd from './StartEnd';
import { Tabs, Tab, Alert } from 'react-bootstrap';

const moment = require('moment');

class ElectionView extends Component {
  state = {
    loading: true,
    electionData: {},
    whiteList: [],
    candidates: [],
    registered: false
  };
  render() {
    const {
      electionName,
      creator,
      startTime,
      endTime
    } = this.state.electionData;
    const { loading, whiteList, candidates, registered } = this.state;
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
            <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
              <Tab eventKey={1} title="Vote">
                VOTE
              </Tab>
              <Tab eventKey={2} title="Candidates">
                <ReviewTable data="Names" dataArray={candidates} />
              </Tab>
              <Tab eventKey={3} title="Registry">
                <ReviewTable data="Addresses" dataArray={whiteList} />
              </Tab>
              <Tab eventKey={4} title="Start/End">
                <StartEnd start={start} end={end} />
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
    this.setState({ electionData, whiteList, loading: false });
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

  humanize = timeStamp => {
    return moment.unix(timeStamp).format('dddd, MMMM Do YYYY, h:mm:ss a');
  };

  checkRegistry = whiteList => {
    let user = this.props.drizzle.web3.eth.accounts.givenProvider
      .selectedAddress;
    whiteList = whiteList.map(x => x.toLowerCase());
    user = user.toLowerCase();
    let registered = whiteList.includes(user);
    this.setState({ registered });
  };
}

export default ElectionView;
