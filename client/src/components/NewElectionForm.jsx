import React, { Component } from 'react';
import { ProgressBar, Jumbotron, Image } from 'react-bootstrap';

class NewElectionForm extends Component {
  state = {
    now: 3
  };
  render() {
    const { now } = this.state;
    return (
      <div>
        <Jumbotron className="new-election-jumbo">
          <div className="new-election-header">
            <div>
              <h1 className="new-election-title">Your new election.</h1>
            </div>
            <div>
              <Image
                src="https://image.flaticon.com/icons/svg/1346/1346580.svg"
                className="icon"
              />
            </div>
          </div>
        </Jumbotron>
        <ProgressBar now={now} active label={`${now}%`} />
      </div>
    );
  }
}

export default NewElectionForm;
