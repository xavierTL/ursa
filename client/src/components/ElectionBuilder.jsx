import React, { Component } from 'react';
import { Jumbotron, Button } from 'react-bootstrap';
import InstructionsForm from './InstructionsForm';
import NewElectionForm from './NewElectionForm';

class ElectionBuilder extends Component {
  state = {
    understand: false,
    showForm: true
  };
  render() {
    const { understand, showForm } = this.state;
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
              <InstructionsForm understand={this.understand} />
            </Jumbotron>
            {understand ? (
              <Button onClick={() => this.showForm()}>let's go!</Button>
            ) : null}
          </>
        )}
      </div>
    );
  }
  showForm = () => {
    this.setState({ showForm: true });
  };
  understand = i => {
    const { understand } = this.state;
    this.setState({ understand: !understand });
  };
}

export default ElectionBuilder;
