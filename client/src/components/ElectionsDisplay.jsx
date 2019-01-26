import React, { Component } from 'react';
import JumboHead from './JumboHead';

class ElectionsDisplay extends Component {
  state = { electionsArray: [] };
  render() {
    return (
      <>
        <JumboHead imgId="1346551" text="Elections" />
      </>
    );
  }
  componentDidMount = async () => {
    const { methods } = this.props.drizzle.contracts.ElectionManager;
    console.log(await methods.smokeTest().call());
    this.populateElections();
  };
  populateElections = async () => {
    const { methods } = this.props.drizzle.contracts.ElectionManager;
    const electionCount = await methods.electionCount().call();
    let promiseArray = [];
    for (let i = 0; i < electionCount; i++) {
      promiseArray.push(methods.elections(i + 1).call());
    }
    Promise.all(promiseArray).then(electionsArray =>
      this.setState({ electionsArray })
    );
  };
}

export default ElectionsDisplay;
