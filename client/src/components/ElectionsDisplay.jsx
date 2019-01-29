import React, { Component } from 'react';
import JumboHead from './JumboHead';
import ElectionsTable from './ElectionsTable';

class ElectionsDisplay extends Component {
  state = { electionsArray: [], loading: true };
  render() {
    const { electionsArray, loading } = this.state;
    const { user } = this.props;
    const electionsFormatted = electionsArray.map(election => {
      return [election.creator, election.electionName];
    });
    return (
      <>
        <JumboHead
          imgId="1346551"
          text="Elections"
          sub="Manage, vote and view."
        />
        <div className="pad">
          {loading ? null : (
            <ElectionsTable
              data={'Elections'}
              elections={electionsFormatted}
              user={user}
            />
          )}
        </div>
      </>
    );
  }
  componentDidMount = async () => {
    // const { methods } = this.props.drizzle.contracts.ElectionManager;
    // console.log(await methods.smokeTest().call());
    this.populateElections();
  };
  populateElections = async () => {
    const { methods } = this.props.drizzle.contracts.ElectionManager;
    const electionCount = await methods.electionCount().call();
    let promiseArray = [];
    for (let i = 0; i < electionCount; i++) {
      promiseArray.push(methods.elections(i + 1).call());
    }
    Promise.all(promiseArray).then(electionsArray => {
      this.setState({ electionsArray, loading: false });
    });
  };
}

export default ElectionsDisplay;
