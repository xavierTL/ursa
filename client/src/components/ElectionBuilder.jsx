import React, { Component } from 'react';
import { Jumbotron, Button } from 'react-bootstrap';

class ElectionBuilder extends Component {
  state = {
    isFormVisible: false
  };
  render() {
    return (
      <div>
        <Jumbotron>
          <h1>Time to do some democracy.</h1>
          <p>
            There's a few things you'll need before you start your election:
          </p>
          <ol>
            <li>Metamask chrome extension.</li>
            <li>Ethereum in your wallet.</li>
            <li>
              At least one candidate or simple proposition in mind (e.g. "We
              should eat lasagne").
            </li>
            <li>At least one user who can vote in your election.</li>
            <li>Public keys for each user.</li>
            <li>A start and end time for the election.</li>
          </ol>
        </Jumbotron>
        <Button onClick={() => this.showForm()}>let's go!</Button>
      </div>
    );
  }
  showForm = () => {
    console.log('hi');
  };
}

export default ElectionBuilder;
