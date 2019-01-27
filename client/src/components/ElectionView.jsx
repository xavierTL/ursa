import React, { Component } from 'react';
import JumboHead from './JumboHead';
import { Well } from 'react-bootstrap';

const moment = require('moment');

class ElectionView extends Component {
  state = {
    loading: true,
    electionData: {}
  };
  render() {
    const {
      electionName,
      creator,
      startTime,
      endTime
    } = this.state.electionData;
    const { loading } = this.state;
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
              sub={open ? 'Polls open.' : 'Polls not open.'}
            />
            <Well>
              <div className="alert-bar">
                <div className="alert">
                  <strong>Start time:</strong>
                  {` ${start}`}
                </div>
                <div className="alert">
                  <strong>End time:</strong>
                  {` ${end}`}
                </div>
              </div>
            </Well>
          </>
        )}
      </>
    );
  }

  componentDidMount = async () => {
    const { methods } = this.props.drizzle.contracts.ElectionManager;
    // console.log(await methods.smokeTest().call());
    this.fetchElectionData();
  };

  fetchElectionData = async () => {
    const { methods } = this.props.drizzle.contracts.ElectionManager;
    const { id } = this.props;
    const electionData = await methods.elections(id).call();
    console.log(electionData);
    this.setState({ electionData, loading: false });
  };
  humanize = timeStamp => {
    return moment.unix(timeStamp).format('dddd, MMMM Do YYYY, h:mm:ss a');
  };
}

export default ElectionView;
