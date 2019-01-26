import React, { Component } from 'react';
import { Jumbotron, Button } from 'react-bootstrap';
import InstructionsForm from './InstructionsForm';
import NewElectionForm from './NewElectionForm';
import JumboHead from './JumboHead';

class ElectionBuilder extends Component {
  state = {
    understand: false,
    showForm: false
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
            <JumboHead
              imgId="1346543"
              text="New Election"
              sub="Things you'll need before you start:"
            />

            <InstructionsForm understand={this.understand} />
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
