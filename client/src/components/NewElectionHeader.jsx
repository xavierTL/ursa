import { Jumbotron, Image } from 'react-bootstrap';
import React, { Component } from 'react';

class NewElectionHeader extends Component {
  render() {
    const { review, title } = this.props;
    return (
      <div>
        <Jumbotron className="new-election-jumbo">
          <div className="new-election-header">
            <div>
              <h1 className="new-election-title">
                {review ? title : 'Your new election.'}
              </h1>
            </div>
            <div>
              <Image
                src="https://image.flaticon.com/icons/svg/1346/1346580.svg"
                className="icon"
              />
            </div>
          </div>
        </Jumbotron>
      </div>
    );
  }
}

export default NewElectionHeader;
