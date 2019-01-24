import { Navbar } from 'react-bootstrap';
import React, { Component } from 'react';

class UrsaHeader extends Component {
  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#home">Ursa</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Navbar.Text pullRight>
            Signed in as: <Navbar.Link href="#">{this.props.user}</Navbar.Link>
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default UrsaHeader;
