import React, { Component } from 'react';
import JumboHead from './JumboHead';
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
    console.log(startTime, endTime);
    return (
      <>
        {loading ? null : (
          <JumboHead imgId="1346550" text={electionName} sub={'hi'} />
        )}
      </>
    );
  }

  //  in 1548633600 1548720000
  // out 3097183936 3097270336

  componentDidMount = async () => {
    const { methods } = this.props.drizzle.contracts.ElectionManager;
    console.log(await methods.smokeTest().call());
    this.fetchElectionData();
  };

  fetchElectionData = async () => {
    const { methods } = this.props.drizzle.contracts.ElectionManager;
    const { id } = this.props;
    const electionData = await methods.elections(id).call();
    this.setState({ electionData, loading: false });
  };
}

export default ElectionView;
