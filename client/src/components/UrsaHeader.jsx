import { Navbar } from 'react-bootstrap';
import React, { Component } from 'react';
import '../App.css';
import { Link } from '@reach/router';

class UrsaHeader extends Component {
  render() {
    const { user } = this.props;
    return (
      <Navbar className="nav-bar">
        <Navbar.Text>
          <Link to="/home">Home</Link>
        </Navbar.Text>
        <Navbar.Text>
          <Link to="elections">Elections</Link>
        </Navbar.Text>{' '}
        <Navbar.Text>
          <Link to="new-election">New Election</Link>
        </Navbar.Text>
        <Navbar.Collapse>
          <Navbar.Text pullRight>{`user: ${user}`}</Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default UrsaHeader;
