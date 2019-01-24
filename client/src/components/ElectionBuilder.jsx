import React, { Component } from 'react';
import { Jumbotron, Button } from 'react-bootstrap';
import InstructionsForm from './InstructionsForm';
import NewElectionForm from './NewElectionForm';

class ElectionBuilder extends Component {
  state = {
    ticks: [false, false, false, false, false, false],
    showForm: false
  };
  render() {
    const { ticks, showForm } = this.state;
    const { drizzle } = this.props;
    return (
      <div>
        {showForm ? (
          <NewElectionForm drizzle={drizzle} />
        ) : (
          <>
            <Jumbotron>
              <h1>Time to do some democracy.</h1>
              <p>
                There's a few things you'll need before you start your election:
              </p>
              <InstructionsForm tick={this.tick} />
            </Jumbotron>
            {ticks.includes(false) ? null : (
              <Button onClick={() => this.showForm()}>let's go!</Button>
            )}
          </>
        )}
      </div>
    );
  }
  showForm = () => {
    this.setState({ showForm: true });
  };
  tick = i => {
    const { ticks } = this.state;
    ticks[i] = !ticks[i];
    this.setState({ ticks });
  };
}

export default ElectionBuilder;
