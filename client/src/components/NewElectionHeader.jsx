import { Jumbotron, Image } from 'react-bootstrap';
import React, { Component } from 'react';

class NewElectionHeader extends Component {
  render() {
    const { review, title, tx } = this.props;
    return (
      <Jumbotron className="new-election-jumbo">
        <div className="new-election-header">
          <div className="new-election-title">
            {tx.length ? (
              <>
                <h1>Success!</h1>
                <h2>Go to Elections to view</h2>{' '}
              </>
            ) : (
              <h1>{review ? title : 'Your new election.'}</h1>
            )}
          </div>
          <div className="new-election-logo">
            <Image
              src="https://image.flaticon.com/icons/svg/1346/1346580.svg"
              className="icon"
            />
          </div>
        </div>
      </Jumbotron>
    );
  }
}

export default NewElectionHeader;
